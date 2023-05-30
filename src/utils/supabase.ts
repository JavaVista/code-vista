import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonPublicKey = import.meta.env.VITE_SUPABASE_KEY;


if (!supabaseUrl || !supabaseAnonPublicKey) {
    throw new Error('Missing environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonPublicKey);
