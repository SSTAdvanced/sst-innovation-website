import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = asText(payload.name);
  const phone = asText(payload.phone);
  const email = asText(payload.email);
  const message = asText(payload.message);

  if (!name || !phone || !email) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("leads").insert([
      {
        name,
        phone,
        email,
        message
      }
    ]);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server configuration error" },
      { status: 500 }
    );
  }
}
