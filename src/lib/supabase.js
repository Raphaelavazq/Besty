import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not configured. Using mock authentication.');
  console.warn('To enable real authentication:');
  console.warn('1. Create .env file in project root');
  console.warn('2. Add: VITE_SUPABASE_URL=your_supabase_url');
  console.warn('3. Add: VITE_SUPABASE_ANON_KEY=your_anon_key');
  console.warn('4. Restart dev server');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => !!(supabaseUrl && supabaseAnonKey);
