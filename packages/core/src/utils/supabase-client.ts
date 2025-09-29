import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

let client: SupabaseClient | undefined;

export const getSupabaseClient = (config?: SupabaseConfig) => {
  if (client) {
    return client;
  }

  if (!config?.url || !config?.anonKey) {
    throw new Error("Supabase client has not been initialized. Provide url and anonKey.");
  }

  client = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  return client;
};
