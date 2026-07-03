import { useEffect, useState } from "react";
import { supabaseApp as supabase } from "@/integrations/external-supabase/client";

export type BookingSettings = {
  id?: string;
  active: boolean;
  consultation_fee: number;
  currency: string;
  bank_name: string | null;
  account_name: string | null;
  account_number: string | null;
  sort_code: string | null;
  iban: string | null;
  swift: string | null;
  reference_prefix: string | null;
  payment_notes: string | null;
};

export const DEFAULT_BOOKING_SETTINGS: BookingSettings = {
  active: false,
  consultation_fee: 50,
  currency: "GBP",
  bank_name: null,
  account_name: null,
  account_number: null,
  sort_code: null,
  iban: null,
  swift: null,
  reference_prefix: "TL",
  payment_notes: null,
};

let cache: BookingSettings | null = null;
const listeners = new Set<(v: BookingSettings) => void>();

function setCache(next: BookingSettings) {
  cache = next;
  listeners.forEach((fn) => fn(next));
}

export function invalidateBookingSettingsCache() {
  cache = null;
}

async function fetchSettings() {
  const { data: publicRow } = await supabase
    .from("booking_settings_public" as never)
    .select("*")
    .limit(1)
    .maybeSingle();

  let bank: Partial<BookingSettings> = {};
  if ((publicRow as { active?: boolean } | null)?.active) {
    const { data: bankRow } = await supabase.rpc("get_active_bank_details" as never);
    const row = Array.isArray(bankRow) ? bankRow[0] : bankRow;
    if (row) bank = row as Partial<BookingSettings>;
  }

  const merged = {
    ...DEFAULT_BOOKING_SETTINGS,
    ...((publicRow as object | null) ?? {}),
    ...bank,
  } as BookingSettings;
  setCache(merged);
  return merged;
}

let realtimeStarted = false;
function ensureRealtime() {
  if (realtimeStarted) return;
  realtimeStarted = true;
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") fetchSettings();
    });
  }
}

export function useBookingSettings() {
  const [data, setData] = useState<BookingSettings | null>(cache);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let alive = true;
    const listener = (next: BookingSettings) => {
      if (alive) setData(next);
    };
    listeners.add(listener);
    ensureRealtime();

    (async () => {
      await fetchSettings();
      if (alive) setLoading(false);
    })();

    return () => {
      alive = false;
      listeners.delete(listener);
    };
  }, []);

  return { data, loading };
}
