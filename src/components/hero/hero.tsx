import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { StandardButton } from '../buttons/standard-button';

export const Hero = component$(() => {
    return (
        <div class="flex flex-col justify-center py-24 mx-auto max-w-screen-xl px-4 sm:px-8">
            <div class="flex flex-col h-full items-center justify-center w-full">
                <div class="text-text-gray-800 text-4xl sm:text-6xl md:text-6xl lg:text-7xl tracking-tighter font-extrabold">
                    It’s not a bug;
                </div>

                <div class="text-center space-y-4 w-full">
                    <h1 class="text-gray-800 font-bold text-4xl md:text-5xl">
                        it’s an undocumented
                        <span class="text-indigo-600"> feature</span>
                    </h1>
                    <div class="text-gray-800 max-w-xl mx-auto italic text-xl font-light">
                        ~ Unknown ~
                    </div>
                    <div>
                        <p class="mt-24 text-gray-500 italic">
                            Get the resources you need
                        </p>
                    </div>
                    <Link
                        href="/signup"
                        class=" flex-col text-center items-center  sm:space-x-6 sm:space-y-0 sm:flex"
                    >
                        <StandardButton
                            label="Become a Member"
                            style="bg-indigo-600 hover:bg-indigo-500 text-white"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
});
