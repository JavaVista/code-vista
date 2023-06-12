import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { CookieValue, DocumentHead, Loader } from '@builder.io/qwik-city';
import { useNavigate } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import type { SessionData } from '~/interfaces/session-data';
import { getUserProfile } from '~/utils/helpers';

export const useSessionData: Loader<SessionData> = routeLoader$(
    async requestEvent => {
        // Read a cookie
        const cookieValue = requestEvent.cookie.get(
            'server-access-token'
        ) as CookieValue;

        const profile = await getUserProfile(cookieValue);
        if (profile?.role !== 'free') {
            throw requestEvent.redirect(302, '/login');
        }
        return profile;
    }
);

export default component$(() => {
    const isShow = useSignal(true);
    const sessionProfile = useSessionData();
    const nav = useNavigate();

    useVisibleTask$(async () => {
        if (!sessionProfile.value.isSession) {
            nav('/login');
        } else {
            isShow.value = true;
        }
    });

    return (
        <>
            {isShow.value && (
                <div class="bg-gray-100 h-screen flex justify-center">
                    <div class="mt-24 m-auto">
                        Welcome to your Dashboard Page{' '}
                        <Link href="/">
                            <button class="font-medium text-indigo-700 hover:text-indigo-400">
                                Home Page
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
});

export const head: DocumentHead = {
    title: 'Dashboard',
    meta: [
        {
            name: 'description',
            content: 'Dashboard Page',
        },
    ],
};
