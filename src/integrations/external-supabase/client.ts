// Second Supabase client pointing at the user's external project.
// Used by public-site user features (contact form, reviews, newsletter,
// blog reads, popups). Admin/backoffice features continue to use the
// Lovable Cloud client at "@/integrations/supabase/client".
//
// The URL and anon key are publishable (safe to ship in client code).
import { createClient } from "@supabase/supabase-js";

const APP_SUPABASE_URL = "https://utqkhttzsyezrwumoplk.supabase.co";
const APP_SUPABASE_ANON_KEY = "sb_publishable_u1f8QAZRqz_rdtV7mAYLyw_QO_hZlJ7";

export const supabaseApp = createClient(APP_SUPABASE_URL, APP_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "sb-app-external-auth",
  },
});
