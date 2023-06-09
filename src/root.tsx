import {
    component$,
    useContextProvider,
    useStore,
    useVisibleTask$,
} from '@builder.io/qwik';
import {
    QwikCityProvider,
    RouterOutlet,
    ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';
import { supabase } from './utils/supabase';
import type { User } from './types/user.type';
import { UserSessionContext } from './context/user-session';
import type { Session } from 'supabase-auth-helpers-qwik';
import type { AuthChangeEvent } from '@supabase/supabase-js';
import axios from 'axios';

export default component$(() => {
    /**
     * The root of a QwikCity site always start with the <QwikCityProvider> component,
     * immediately followed by the document's <head> and <body>.
     *
     * Don't remove the `<head>` and `<body>` elements.
     */
    const userSession: User = useStore({
        userId: '',
        isLoggedIn: false,
    });

    useVisibleTask$(async () => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event: AuthChangeEvent, session: Session | null) => {
                console.log('event: ', event);
                console.log('session: ', session);

                if (
                    event === 'SIGNED_IN' &&
                    session?.access_token &&
                    session?.refresh_token
                ) {
                    // send cookie to server
                    const body = {
                        accessToken: session.access_token,
                        refreshToken: session.refresh_token,
                    };

                    // send request to server
                    await axios
                        .post('/api_v1/store-auth', body, {
                            withCredentials: true,
                        })
                        .then(res => {
                            console.log(res);

                            // set Auth state Context
                            userSession.userId = session?.user?.id;
                            userSession.isLoggedIn = true;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }

                if (event === 'SIGNED_OUT') {
                    // sign out user

                    // set Auth state Context
                    userSession.userId = '';
                    userSession.isLoggedIn = false;
                }
            }
        );

        return () => authListener?.subscription?.unsubscribe();
    });

    // pass state to child components
    useContextProvider(UserSessionContext, userSession);

    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <link rel="manifest" href="/manifest.json" />
                <RouterHead />
            </head>
            <body lang="en">
                <RouterOutlet />
                <ServiceWorkerRegister />
            </body>
        </QwikCityProvider>
    );
});
