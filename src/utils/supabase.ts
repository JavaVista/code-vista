import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonPublic = process.env.SUPABASE_ANON_PUBLIC;

if (!supabaseUrl || !supabaseAnonPublic) {
    throw new Error('Missing environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonPublic);