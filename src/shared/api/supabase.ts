import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "../model/config";

if (!CONFIG.SUPABASE_URL) {
  throw new Error("SUPABASE_URL is not defined");
}

if (!CONFIG.SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_ANON_KEY is not defined");
}

export const supabase = createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
  {}
);
