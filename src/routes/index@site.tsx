import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <>
            <div>
                <h1>Home Page</h1>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Home Page',
    meta: [
        {
            name: 'description',
            content: 'Home Test',
        },
    ],
};
