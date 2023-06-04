import {
    component$,
    useSignal,
    useStylesScoped$,
    $,
    useTask$,
    useContext,
} from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import styles from './nav.css?inline';
import { ActionButton } from '../buttons/action-button';
import { UserSessionContext } from '~/context/user-session';
import { supabase } from '~/utils/supabase';

export const Nav = component$(() => {
    const userSession = useContext(UserSessionContext);
    useStylesScoped$(styles);
    const isOpenSignal = useSignal(false);
    const inSession = useSignal(false);
    const homeUrl = '/';
    const nav = useNavigate();

    const handleLogout = $(async () => {
        // server side

        // client side
        await supabase.auth.signOut();
        nav(homeUrl);
    });

    useTask$(({ track }) => {
        track(userSession);
        if (userSession?.isLoggedIn) {
            inSession.value = true;
        } else {
            inSession.value = false;
        }
    });

    return (
        <nav class="w-full bg-gray-800 text-gray-100 body-font mb-4 shadow-xl">
            {/* :DESKTOP MENU */}
            <div class="container mx-auto flex justify-between items-center py-7 px-5">
                <Link
                    href="/"
                    class="flex flex-shrink-0 title-font font-medium items-center text-gray-900 md:mb-0"
                >
                    <img
                        src="/images/computers_attacking_400x400.jpg"
                        class="w-20 h-20 text-white p-2 bg-gradient-to-br rounded-full"
                    />
                    <div class="ml-3 text-xl text-gray-100 font-semibold antialiased handwrite-font">
                        Code-Vista
                    </div>
                </Link>
                <div>
                    <ul class="hidden md:ml-auto md:flex flex-wrap items-center justify-center text-base tracking-wide">
                        <li class="mr-8 px-2 py-2 rounded-md hover:text-white hover:bg-gray-700">
                            <Link href="/">Home</Link>
                        </li>
                        <li class="mr-8 px-2 py-2 rounded-md hover:text-white hover:bg-gray-700">
                            <Link href="/store">Store</Link>
                        </li>
                        {inSession.value && (
                            <>
                                <li class="mr-8 px-2 py-2 rounded-md hover:text-white hover:bg-gray-700">
                                    <button
                                        onClick$={() => {
                                            handleLogout();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                                <li class="mr-8 px-2 py-2 rounded-md hover:text-white hover:bg-gray-700">
                                    <Link href="/members/dashboard">
                                        <ActionButton label="Dashboard" />
                                    </Link>
                                </li>
                            </>
                        )}
                        {!inSession.value && (
                            <>
                                <li class="mr-8 px-2 py-2 rounded-md hover:text-white hover:bg-gray-700">
                                    <Link href="/login">Login</Link>
                                </li>
                                <li class="mr-8 px-2 py-2 rounded-md hover:text-white hover:bg-gray-700">
                                    <Link href="/signup">Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                {/* Burger icon standard */}
                <button
                    class="md:hidden rounded-md active:outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick$={() => (isOpenSignal.value = !isOpenSignal.value)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8 rounded-md text-gray-100 font-semibold  bg-gradient-to-br from-transparent to-transparent hover:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            {/* :MOBILE MENU */}
            {isOpenSignal.value && (
                <div>
                    <ul class="w-full flex flex-col py-4 px-3 md:hidden shadow-xl  text-base uppercase text-center font-semibold">
                        <li class="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                            <Link href="/">Home</Link>
                        </li>
                        <li class="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                            <Link href="/test">Test</Link>
                        </li>
                        {inSession.value && (
                            <>
                                <li class="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                                    <button
                                        onClick$={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                                <li class="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                                    <Link href="/members/dashboard">
                                        <ActionButton label="Dashboard" />
                                    </Link>
                                </li>
                            </>
                        )}
                        {!inSession.value && (
                            <>
                                <li class="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                                    <Link href="/login">Login</Link>
                                </li>
                                <li class="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                                    <Link href="/signup">Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
});
