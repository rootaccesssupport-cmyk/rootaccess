import { createClient } from '@supabase/supabase-js';

// Production Supabase project defaults for RootAccess
const DEFAULT_SUPABASE_URL = 'https://hjnmfxaaccxvfstdmflb.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqbm1meGFhY2N4dmZzdGRtZmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMjk3MDcsImV4cCI6MjEwODYwNTcwN30.jsLDQUIZIS6IlJQm2bXKps4z_5aIzMo5IcmALYVeq1w';

const envUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const rawUrl = envUrl && envUrl !== 'undefined' && envUrl !== '' ? envUrl : DEFAULT_SUPABASE_URL;
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const supabaseAnonKey =
  envKey && envKey !== 'undefined' && envKey !== '' ? envKey : DEFAULT_SUPABASE_ANON_KEY;

// Verify whether real Supabase credentials have been configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder-project') &&
  !supabaseAnonKey.includes('placeholder-anon-key') &&
  supabaseUrl.startsWith('https://')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
