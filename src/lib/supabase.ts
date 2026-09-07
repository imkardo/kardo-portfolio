import type { SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

// The SDK (~100 KB) is loaded lazily so visitors on the public site
// never pay for a backend that may not even be configured.
let clientPromise: Promise<SupabaseClient | null> | null = null;

export function loadSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js")
      .then(({ createClient }) => createClient(url!, anonKey!))
      .catch((err) => {
        console.error("[supabase] SDK load failed:", err);
        clientPromise = null; // allow retry on next call
        return null;
      });
  }
  return clientPromise;
}
