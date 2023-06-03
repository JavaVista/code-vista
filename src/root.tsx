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
            async (event: string, session: any) => {
                console.log('event: ', event);
                console.log('session: ', session);

                if (event === 'SIGNED_IN') {
                    // send cookie to server

                    // set Auth state Context
                    userSession.userId = session?.user?.id;
                    userSession.isLoggedIn = true;
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
