import "server-only";

import { formatLeadRef } from "@/lib/leadRef";

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

function formatText(payload: LeadNotificationPayload, leadRef: string | null) {
  const lines = [
    "NEW LEAD | SST INNOVATION",
    "--------------------",
    leadRef ? `Ref: ${leadRef}` : null,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone || "-"}`,
    `Email: ${payload.email || "-"}`,
    `Source: ${payload.source}`,
    "",
    "Message",
    payload.message,
  ];
  return lines.filter(Boolean).join("\n");
}

function buildWebhookCandidates(rawUrl: string): string[] {
  const trimmed = rawUrl.trim().replace(/\/+$/, "");
  const candidates = new Set<string>([trimmed]);

  // Some setups use a single Worker for both LINE platform webhooks and server-to-worker notifications.
  // Prefer /webhook when we can infer it, but keep compatibility with /line-callback.
  if (trimmed.endsWith("/line-callback")) {
    candidates.add(trimmed.replace(/\/line-callback$/, "/webhook"));
  } else if (trimmed.endsWith("/webhook")) {
    candidates.add(trimmed.replace(/\/webhook$/, "/line-callback"));
  }

  return Array.from(candidates);
}

export async function notifyLineViaCloudflare(
  payload: LeadNotificationPayload
): Promise<LeadNotifyStatus> {
  const webhookUrl = readEnv("CLOUDFLARE_LINE_WEBHOOK_URL");
  if (!webhookUrl) return "skipped";

  try {
    // eslint-disable-next-line no-new
    new URL(webhookUrl);
  } catch {
    return "failed";
  }

  const secret = readEnv("CLOUDFLARE_LINE_WEBHOOK_SECRET");
  const leadRef = formatLeadRef(payload.leadId);

  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (secret) headers["x-webhook-secret"] = secret;

  const body = JSON.stringify({
    type: "lead",
    text: formatText(payload, leadRef),
  });

  const attempt = async (targetUrl: string, timeoutMs: number) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(targetUrl, {
        method: "POST",
        headers,
        body,
        signal: controller.signal,
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Cloudflare webhook failed: ${res.status} ${text}`.trim());
      }
    } finally {
      clearTimeout(timeout);
    }
  };

  const targets = buildWebhookCandidates(webhookUrl);
  const errors: unknown[] = [];

  for (const target of targets) {
    try {
      await attempt(target, 6000);
      return "sent";
    } catch (error) {
      errors.push(error);
    }

    // One retry (worker cold start / transient network)
    await new Promise((r) => setTimeout(r, 300));
    try {
      await attempt(target, 6000);
      return "sent";
    } catch (error) {
      errors.push(error);
    }
  }

  if (errors.length) {
    return "failed";
  }

  return "failed";
}
