import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, Link, useNavigate } from '@builder.io/qwik-city';
import { supabase } from '~/utils/supabase';

export default component$(() => {
    const isProtectedOk = useSignal(false);
    const nav = useNavigate();

    useVisibleTask$(async () => {
        const timeout = setTimeout(async () => {
            const { data, error } = await supabase.auth.getUser();
            console.log('🤜 👉 file: index.tsx:12 👉 data:', data);

            if (data?.user?.id && !error) {
                isProtectedOk.value = true;
                await nav('/members/dashboard');
            } else {
                console.log(error);
                await nav('/login');
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
