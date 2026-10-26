import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read .env directly
const envPath = path.resolve(process.cwd(), '.env');
let supabaseUrl = '';
let supabaseAnonKey = '';

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
      supabaseUrl = trimmed.replace('VITE_SUPABASE_URL=', '').trim();
    }
    if (trimmed.startsWith('VITE_SUPABASE_ANON_KEY=')) {
      supabaseAnonKey = trimmed.replace('VITE_SUPABASE_ANON_KEY=', '').trim();
    }
  }
}

console.log('----------------------------------------------------');
console.log('RootAccess Database Connection Diagnostic');
console.log('----------------------------------------------------');
console.log(`Supabase URL: ${supabaseUrl || '(Not found in .env)'}`);
console.log(`Anon Key:     ${supabaseAnonKey ? `${supabaseAnonKey.slice(0, 16)}...` : '(Not found in .env)'}`);
console.log('----------------------------------------------------');

if (
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('placeholder-project') ||
  supabaseAnonKey.includes('placeholder-anon-key')
) {
  console.log('⚠️  Status: Supabase is currently NOT configured.');
  console.log('👉 Please replace the placeholder values in your `.env` file with your real Supabase credentials.');
  console.log('   Follow the setup guide provided by the assistant.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkConnection() {
  console.log('Connecting to Supabase...');
  try {
    // 1. Check Auth service connectivity
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('❌ Auth error:', authError.message);
      process.exit(1);
    }
    console.log('✅ Supabase Auth service is connected!');

    // 2. Check Database Tables from master_schema.sql
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });

    if (profileError) {
      console.log('⚠️  Connected to Supabase, but `profiles` table was not found or returned an error:');
      console.log(`   Message: ${profileError.message}`);
      console.log('👉 Action needed: Run `supabase/master_schema.sql` in your Supabase SQL Editor!');
      process.exit(1);
    }

    console.log('✅ `profiles` table is accessible and ready!');
    console.log('🎉 Everything is ready! You can now create real accounts on http://localhost:5173/signup');
  } catch (err: any) {
    console.error('❌ Unexpected connection failure:', err.message);
    process.exit(1);
  }
}

checkConnection();
