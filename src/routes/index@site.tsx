import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <>
            <section class="flex flex-col justify-center min-h-screen mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
                <div class="text-center space-y-4">
                    <h1 class="text-gray-800 font-bold text-4xl md:text-5xl">
                        It’s not a bug; it’s an undocumented
                        <span class="text-indigo-600"> feature</span>
                    </h1>
                    <p class="text-gray-500 max-w-xl mx-auto leading-relaxed">
                        Get the resources you need
                    </p>
                </div>
                <div class="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                    <Link class="px-10 py-3.5 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto">
                        Become a Member
                    </Link>
                </div>
            </section>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Home Page',
    meta: [
        {
            name: 'description',
            content: 'Home',
        },
    ],
};
