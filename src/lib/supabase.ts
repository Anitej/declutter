
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Get environment variables with fallback to the project values if not in production
const isProduction = import.meta.env.MODE === 'production';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
  (!isProduction ? "https://dapimmudwfhgojtfqhgi.supabase.co" : '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
  (!isProduction ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhcGltbXVkd2ZoZ29qdGZxaGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5ODkzNzQsImV4cCI6MjA1ODU2NTM3NH0.SBbSc2kiD6NztWd7L4Adqy-oDEMn4v3I4o1t2ih-muI" : '');

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
