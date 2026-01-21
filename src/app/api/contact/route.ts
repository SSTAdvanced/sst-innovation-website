import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendLeadNotification } from "@/lib/email";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  locale?: string;
  company?: string;
  startedAt?: string | number;
};

const MAX_NAME_LENGTH = 120;
const MAX_PHONE_LENGTH = 50;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const SPAM_ERROR = "Spam detected";

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const rateLimitByIp = new Map<string, RateLimitEntry>();

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string, now: number): boolean {
  const entry = rateLimitByIp.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitByIp.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function isTooFast(startedAt: string | number | undefined, now: number): boolean {
  if (startedAt === undefined || startedAt === null || startedAt === "") {
    return true;
  }
  const startedMs =
    typeof startedAt === "number" ? startedAt : Number.parseInt(String(startedAt), 10);
  if (!Number.isFinite(startedMs)) {
    return true;
  }
  return now - startedMs < 2000;
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const now = Date.now();
  const ip = getClientIp(req);

  try {
    const body = (await req.json().catch(() => null)) as LeadPayload | null;

    if (isRateLimited(ip, now)) {
      return NextResponse.json(
        { ok: false, requestId, error: SPAM_ERROR },
        { status: 429 }
      );
    }

    const name = String(body?.name ?? "")
      .trim()
      .slice(0, MAX_NAME_LENGTH);
    const phone = String(body?.phone ?? "")
      .trim()
      .slice(0, MAX_PHONE_LENGTH);
    const email = String(body?.email ?? "")
      .trim()
      .slice(0, MAX_EMAIL_LENGTH);
    const message = String(body?.message ?? "")
      .trim()
      .slice(0, MAX_MESSAGE_LENGTH);
    const locale = String(body?.locale ?? "th").trim();
    const company = String(body?.company ?? "").trim();
    const startedAt = body?.startedAt;

    if (company || isTooFast(startedAt, now)) {
      return NextResponse.json(
        { ok: false, requestId, error: SPAM_ERROR },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { ok: false, requestId, error: "Name is required" },
        { status: 400 }
      );
    }

    if (message.length < 5) {
      return NextResponse.json(
        { ok: false, requestId, error: "Message is too short" },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, requestId, error: "Invalid email" },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from("leads").insert([
      { name, phone, email, message, locale, source: "website" },
    ]);

    if (error) {
      console.error({ requestId, error });
      return NextResponse.json(
        {
          ok: false,
          requestId,
          error: "Database insert failed",
          details: error.message,
        },
        { status: 500 }
      );
    }

    try {
      await sendLeadNotification({
        name,
        phone: phone || null,
        email: email || null,
        message,
        locale,
        source: "website",
      });
    } catch (emailError) {
      console.error("Lead email notification failed:", emailError);
    }

    return NextResponse.json({ ok: true, requestId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error({ requestId, error: err });
    return NextResponse.json(
      { ok: false, requestId, error: message },
      { status: 500 }
    );
  }
}
