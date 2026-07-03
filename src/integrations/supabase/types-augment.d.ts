// Augment auto-generated Supabase types with permissive table shapes
// for tables that exist in the database but haven't been migrated through
// the type-generation pipeline yet. This lets `.from("<table>")` calls
// typecheck without editing the managed types.ts file.

import "./types";

type AnyRow = Record<string, any>;
type PermissiveTable = {
  Row: AnyRow;
  Insert: AnyRow;
  Update: AnyRow;
  Relationships: [];
};

declare module "./types" {
  interface Database {
    public: {
      Tables: {
        blog_posts: PermissiveTable;
        contact_submissions: PermissiveTable;
        reviews: PermissiveTable;
        newsletter_subscribers: PermissiveTable;
        contact_info: PermissiveTable;
        site_popups: PermissiveTable;
        user_roles: PermissiveTable;
        booking_settings: PermissiveTable;
        bookings: PermissiveTable;
      };
      Views: Record<string, never>;
      Functions: Record<string, never>;
      Enums: Record<string, never>;
      CompositeTypes: Record<string, never>;
    };
  }
}
