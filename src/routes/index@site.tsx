import { component$, useContext } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { ActionButton } from '~/components/buttons/action-button';
import { Hero } from '~/components/hero/hero';
import { UserSessionContext } from '~/context/user-session';

export default component$(() => {
    const userSession = useContext(UserSessionContext);

    return (
        <>
            <Hero />
            {userSession?.isLoggedIn && (
                <>
                    <div class="py-12 px-4 bg-gray-50 justify-center mx-auto text-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                        <Link href="/members/dashboard">
                            <ActionButton label="Dashboard" />
                        </Link>
                    </div>
                </>
            )}
            {!userSession?.isLoggedIn && (
                <>
                    <div class="py-12 px-4 bg-gray-50 justify-center mx-auto text-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                        <div class="text-center space-y-4 w-full">
                            <h1 class="text-indigo-600 font-bold text-4xl md:text-5xl">
                                Welcome!
                            </h1>
                        </div>
                    </div>
                </>
            )}
        </>
    );
});

export const head: DocumentHead = {
    title: 'Home Page',
    meta: [
        {
            name: 'description',
            content: 'Code-Vista Home',
        },
    ],
};
