import { createClient } from '@supabase/supabase-js';

// We provide dummy strings so the library doesn't crash the whole site.
// Your real keys should be in your .env file, but this prevents a blank screen.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);