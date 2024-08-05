import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL as string;
// const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(
  "https://cbrgfqvmkgowzerbzued.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicmdmcXZta2dvd3plcmJ6dWVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjIxMjE3NCwiZXhwIjoyMDM3Nzg4MTc0fQ.BwDIw8-rDWUPHBFqFsIghB8Ye27WLf6QljAK59aqWgI"
);
