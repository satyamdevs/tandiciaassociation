import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bjdyrqyopcqzssrqknuq.supabase.co";
const supabaseKey = "sb_publishable_8PVhJxX2kdPLm6-_2nhrIQ_ncCEINuj";

export const supabase = createClient(supabaseUrl, supabaseKey);
