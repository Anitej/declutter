
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Get environment variables with fallback to the project values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize the Supabase client with explicit configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Export a utility function to check if Supabase is properly configured
export const isSupabaseAvailable = () => !!supabaseUrl && !!supabaseAnonKey;
