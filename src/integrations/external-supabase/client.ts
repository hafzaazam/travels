// Second Supabase client pointing at the user's external project.
// Used by public-site user features (contact form, reviews, newsletter,
// blog reads, popups). Admin/backoffice features continue to use the
// Lovable Cloud client at "@/integrations/supabase/client".
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_APP_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Surface a clear error early — set these in Project Settings → Secrets.
  console.warn(
    "[external-supabase] VITE_APP_SUPABASE_URL or VITE_APP_SUPABASE_ANON_KEY is not set.",
  );
}

export const supabaseApp = createClient(url ?? "", anonKey ?? "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "sb-app-external-auth",
  },
});
