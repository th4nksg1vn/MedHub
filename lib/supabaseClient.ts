import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client using the service role key.
// WARNING: Keep the SERVICE_ROLE key secret and never expose it to clients.
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Supabase URL or service role key is not set in environment variables.');
}

export const serverSupabase = createClient(
  SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: { persistSession: false },
    global: { headers: { 'x-mfh-client': 'medihub-server' } },
  }
);

export default serverSupabase;
