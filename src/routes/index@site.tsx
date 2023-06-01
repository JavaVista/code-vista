import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { ActionButton } from '~/components/buttons/action-button';
import { Hero } from '~/components/hero/hero';

export default component$(() => {
    return (
        <>
            <Hero />
            <div class="py-12 px-4 bg-gray-50 justify-center mx-auto text-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                <Link href="/members/dashboard">
                    <ActionButton label="Dashboard" />
                </Link>
            </div>
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
