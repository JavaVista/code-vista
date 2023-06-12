import type { CookieValue } from '@builder.io/qwik-city';
import { createClient } from '@supabase/supabase-js';

// check email is valid
export const validateEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};


// check user auth and role via server side call
export const getUserProfile = async (cookie: CookieValue) => {

    // initialize output
    const userOutput = {
        isSession: false,
        user: {},
        role: ''
    };

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseSecretKey = import.meta.env.VITE_SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseSecretKey) {
        throw new Error('Missing environment variables');
    }

    if (supabaseUrl && supabaseSecretKey) {
        const supabaseServer = createClient(supabaseUrl, supabaseSecretKey);

        const jwtCookie = cookie?.value;

        const { data } = await supabaseServer.auth.getUser(jwtCookie);

        if (data?.user?.id) {
            userOutput.isSession = true;
            userOutput.user = data.user;

            const { data: profile } = await supabaseServer
                .from('profiles')
                .select('id, role')
                .eq('id', data.user.id)
                .limit(1);

            if (profile && profile?.[0].role) {
                userOutput.role = profile?.[0].role;
            }


        }
    }
    return userOutput;
};