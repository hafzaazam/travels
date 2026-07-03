import { createClient } from "@supabase/supabase-js";

// Public (publishable) credentials — safe to expose in the browser.
const SUPABASE_URL = "https://utqkhttzsyezrwumoplk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_u1f8QAZRqz_rdtV7mAYLyw_QO_hZlJ7";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
