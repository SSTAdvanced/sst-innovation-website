import "server-only";

export type LeadNotifyStatus = "sent" | "skipped" | "failed";

export type LeadNotificationPayload = {
  leadId: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  message: string;
  locale: string;
  source: string;
  requestId: string;
  createdAt?: string;
};

function readEnv(name: string): string | null {
  const raw = process.env[name];
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed;
}

function formatText(payload: LeadNotificationPayload) {
  const lines = [
    "New lead (SST INNOVATION)",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone || "-"}`,
    `Email: ${payload.email || "-"}`,
    `Locale: ${payload.locale}`,
    `Source: ${payload.source}`,
    `Lead ID: ${payload.leadId}`,
    `Request ID: ${payload.requestId}`,
    "",
    payload.message,
  ];
  return lines.join("\n");
}

export async function notifyLineViaCloudflare(
  payload: LeadNotificationPayload
): Promise<LeadNotifyStatus> {
  const webhookUrl = readEnv("CLOUDFLARE_LINE_WEBHOOK_URL");
  if (!webhookUrl) return "skipped";

  if (webhookUrl.includes("/line-callback")) {
    throw new Error(
      "CLOUDFLARE_LINE_WEBHOOK_URL is pointing to /line-callback. It must point to your Worker endpoint that receives web notifications (e.g. /webhook)."
    );
  }

  const secret = readEnv("CLOUDFLARE_LINE_WEBHOOK_SECRET");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { "x-webhook-secret": secret } : {}),
      },
      body: JSON.stringify({
        type: "lead",
        text: formatText(payload),
        payload,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Cloudflare webhook failed: ${res.status} ${body}`.trim());
    }

    return "sent";
  } finally {
    clearTimeout(timeout);
  }
}

