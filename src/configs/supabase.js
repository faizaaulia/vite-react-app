import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://zcqetekfeaupmzwrwtmg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjcWV0ZWtmZWF1cG16d3J3dG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2MzE1NjEsImV4cCI6MTk4NTIwNzU2MX0.YmwgQJBHDYg34sT16vQ6jGOeScNggZ0l7EkCFSqbF-Y', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export default supabase;