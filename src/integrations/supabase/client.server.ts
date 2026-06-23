import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ysrzfksvrzmqhmmtfrdu.supabase.co";

export const supabaseAdmin = createClient(
  SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
