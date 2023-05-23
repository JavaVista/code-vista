import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './nav.css?inline';

export const Nav = component$(() => {
    useStylesScoped$(styles);
    return (
        <div class="flex items-center justify-between bg-white shadow-xl py-5">
            <div  class="ml-5 handwrite-font">Logo</div>
            <div class="mr-5">
                <ul class="flex space-x-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/test">Test</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
});
