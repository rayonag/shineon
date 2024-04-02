import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_SHINEON_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_SHINEON_API;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
