import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getEnv(name: string): string {
  return process.env[name] ?? "";
}

export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase env vars are not set");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
