import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Nav } from '~/components/nav/nav';
import { links } from '~/constants/links';

export default component$(() => {
    return (
        <>
            <Nav />
            <main>
                <section class="min-h-screen">
                    <Slot />
                </section>
            </main>
            <footer class="bg-gray-900 sticky bottom-0">
                <div class="mx-auto max-w-7x text-white py-12 px-4 sm:px-6 lg:px-8">
                    <nav
                        class="-mx-5 -my-2 flex flex-wrap justify-center"
                        aria-label="Footer"
                    >
                        {links.map(link => {
                            return (
                                <div key={link.label} class="px-5 py-2">
                                    <Link
                                        href={link.url}
                                        class="text-base  px-2 py-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            );
                        })}
                    </nav>
                    <p class="pt-4 text-left text-xs text-gray-400">
                        &copy; 2023 Javier Carrion
                    </p>
                </div>
            </footer>
        </>
    );
});
