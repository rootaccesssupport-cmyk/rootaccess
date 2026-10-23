import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

// Verify whether real Supabase credentials have been configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder-project') &&
  !supabaseAnonKey.includes('placeholder-anon-key') &&
  supabaseUrl.startsWith('https://')
);

// Fallback to avoid runtime crashes before the user fills in .env
const resolvedUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder-domain.supabase.co';
const resolvedKey = isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key-abc123xyz';

export const supabase = createClient(resolvedUrl, resolvedKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
