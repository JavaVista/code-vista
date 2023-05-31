import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <>
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
        </>
    );
});

export const head: DocumentHead = {
    title: 'Dashboard',
    meta: [
        {
            name: 'description',
            content: 'Dashboard Page'
        },
    ],
};
