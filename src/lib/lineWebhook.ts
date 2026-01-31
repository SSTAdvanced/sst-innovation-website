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
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1).trim()
      : trimmed;
  return unquoted || null;
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
  const timeout = setTimeout(() => controller.abort(), 8500);

  try {
    const body = JSON.stringify({
      type: "lead",
      text: formatText(payload),
      payload,
    });
    const headers: Record<string, string> = {
      "content-type": "application/json",
    };
    if (secret) headers["x-webhook-secret"] = secret;

    const attempt = async () => {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body,
        signal: controller.signal,
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Cloudflare webhook failed: ${res.status} ${text}`.trim());
      }
    };

    try {
      await attempt();
    } catch {
      // one retry for transient network/worker cold start
      await new Promise((r) => setTimeout(r, 400));
      await attempt();
    }

    return "sent";
  } finally {
    clearTimeout(timeout);
  }
}
