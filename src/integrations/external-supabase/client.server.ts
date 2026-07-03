// Server-only admin client for the external Supabase project.
// Uses the service role key — BYPASSES RLS. Never import from client code.
// Load inside server-function handlers:
//   const { supabaseAppAdmin } = await import("@/integrations/external-supabase/client.server");
import { createClient } from "@supabase/supabase-js";

const APP_SUPABASE_URL = "https://utqkhttzsyezrwumoplk.supabase.co";

function createAppAdminClient() {
  const key = process.env.APP_SUPABASE_SERVICE_ROLE_KEY;

  if (!key) {
    throw new Error(
      "Missing APP_SUPABASE_SERVICE_ROLE_KEY environment variable.",
    );
  }

  return createClient(APP_SUPABASE_URL, key, {
    global: { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let _client: ReturnType<typeof createAppAdminClient> | undefined;

export const supabaseAppAdmin = new Proxy(
  {} as ReturnType<typeof createAppAdminClient>,
  {
    get(_, prop, receiver) {
      if (!_client) _client = createAppAdminClient();
      return Reflect.get(_client, prop, receiver);
    },
  },
);
