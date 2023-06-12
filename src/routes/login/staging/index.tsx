import {
    component$,
    useContext,
    useSignal,
    useVisibleTask$,
} from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import { Link, useNavigate } from '@builder.io/qwik-city';
import axios from 'axios';
import { UserSessionContext } from '~/context/user-session';
import { supabase } from '~/utils/supabase';

export default component$(() => {
    const userSession = useContext(UserSessionContext);
    const isProtectedOk = useSignal(false);
    const nav = useNavigate();

    useVisibleTask$(async () => {
        const timeout = setTimeout(async () => {
            const { data, error } = await supabase.auth.getUser();

            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
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
                        console.log(res.data);

                        // set Auth state Context
                        userSession.userId = session?.user?.id;
                        userSession.isLoggedIn = true;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

            if (data?.user?.id && !error) {
                isProtectedOk.value = true;
                userSession.userId = data?.user?.id;
                userSession.isLoggedIn = true;
                nav('/members/dashboard');
            } else {
                console.log(error);
                userSession.userId = '';
                userSession.isLoggedIn = false;
                nav('/login');
            }
        }, 500);
        return () => clearTimeout(timeout);
    });

    return (
        <>
            <div>
                {isProtectedOk.value && (
                    <>
                        <div class="bg-gray-100 h-screen flex justify-center">
                            <div class="mt-24 m-auto">
                                Redirecting to{' '}
                                <Link href="/members/dashboard">
                                    <button class="font-medium text-indigo-700 hover:text-indigo-400">
                                        Dashboard
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
                {!isProtectedOk.value && (
                    <div class="bg-gray-100 h-screen flex justify-center">
                        <div class="mt-24 m-auto">
                            <div class="text-center">
                                <h1 class="text-2xl font-bold">
                                    Please,{' '}
                                    <Link href="/login">
                                        <button class="font-medium text-indigo-700 hover:text-indigo-400">
                                            Login
                                        </button>
                                    </Link>{' '}
                                    to continue.
                                </h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Staging',
    meta: [
        {
            name: 'description',
            content: 'Authorization check for Code-Vista',
        },
    ],
};
