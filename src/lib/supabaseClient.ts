import { createClient } from '@supabase/supabase-js';

// Initialize with environment variables or fallback to empty strings for now.
// The user can fill these in later in their .env.local file.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
