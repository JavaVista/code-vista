import { component$, useStore, $, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import {
    InGoogleCircle,
    InGithubCircle,
    InKeyAltPlus,
} from '@qwikest/icons/iconoir';
import { type IMessage, Message } from '~/components/message/message';
import { validateEmail } from '~/utils/helpers';
import { supabase } from '~/utils/supabase';

export default component$(() => {
    const message: IMessage = useStore({ message: undefined, status: 'error' });
    const isLoading = useSignal(false);
    const stagingUrl = 'http://127.0.0.1:5173/login/staging/';
    // TODO: add google signup

    const handleGithubSignUp = $(async () => {
        /* TODO: In the login page, check if the email exists for that provider. If it does not exist, direct the user to the sign-up page.
        On the sign-up page, check if the terms are valid.
        For now, implemented a tooltip that states that by logging in or signing up, the user is automatically accepting the terms. */

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: stagingUrl,
            },
        });
        console.log('🤜 👉 file: index.tsx:21 👉 data:', data);
        console.log('🤜 👉  👉 error:', error);
    });

    const handleEmailSignUp = $(async (event: any) => {
        // initialize message
        message.message = undefined;
        message.status = 'error';
        isLoading.value = true;

        // extract values
        const email = event.target.email.value;
        const isTerms = event.target.terms.checked;
        const isEmailValid = validateEmail(email);

        // handle validations
        if (!isEmailValid) {
            message.message = 'Please enter a valid email address';
            message.status = 'error';
            isLoading.value = false;
            return;
        }
        if (!isTerms) {
            message.message = 'Please accept the terms, privacy and disclaimer';
            message.status = 'error';
            isLoading.value = false;
            return;
        }

        // set supabase user
        const timestamp = Date.now();
        const pwd =
            Math.floor(Math.random() * 1000000).toString() + email + timestamp;

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: pwd,
        });

        if (data?.user?.id) {
            message.message =
                'Success! Please, check your email inbox or spam folder';
            message.status = 'success';
            isLoading.value = false;
            return;
        } else {
            message.message =
                'Something went wrong creating a user! ' + error?.message;
            isLoading.value = false;
            return;
        }
    });

    return (
        <div class="min-h-screen bg-gray-800 flex justify-center">
            <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <Link href="/">
                        <img
                            src="/images/computers_attacking_400x400.jpg"
                            class="block mx-auto sm:mx-0, sm:shrink-0 object-cover rounded-full w-32"
                        />
                    </Link>
                    <div class="mt-12 flex flex-col items-center">
                        <h2 class="text-2xl xl:text-3xl font-extrabold">
                            Sign up
                        </h2>
                        <p class="mt-2 text-gray-600">
                            Or{' '}
                            <Link
                                href="/login"
                                class="font-medium text-indigo-700 hover:text-indigo-400"
                            >
                                Login to your account
                            </Link>
                        </p>
                        <div class="w-full flex-1 mt-8">
                            <div class="flex flex-col items-center group relative">
                                <button class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5 hover:bg-indigo-700 ">
                                    <div class="bg-white rounded-full hover:text-gray-800">
                                        <InGoogleCircle class="w-6 h-6" />
                                    </div>
                                    <span class="ml-4 hover:text-gray-100">
                                        Sign Up with Google
                                    </span>
                                </button>

                                <button
                                    onClick$={handleGithubSignUp}
                                    class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5 hover:bg-indigo-700"
                                >
                                    <div class="bg-white rounded-full hover:text-gray-800 ">
                                        <InGithubCircle class=" w-6 h-6" />
                                    </div>
                                    <span class="ml-4 hover:text-gray-100">
                                        Sign Up with GitHub
                                    </span>
                                </button>
                                <span class="pointer-events-none absolute top:50% left:50% transform:translate(-50%,-50%) -top-5 w-max rounded  bg-yellow-50 border-2  text-yellow-600 border-yellow-600 px-2 py-1 text-sm font-medium  opacity-0 shadow transition-opacity group-hover:opacity-100">
                                    {' '}
                                    By signing up, you agree to our Terms of
                                    Service, Privacy Policy and Disclaimer{' '}
                                </span>
                            </div>

                            <div class="my-12 border-b text-center">
                                <div class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign up with e-mail
                                </div>
                            </div>

                            <form
                                onSubmit$={handleEmailSignUp}
                                preventdefault:submit
                                class="mx-auto max-w-xs"
                            >
                                <label class="block text-sm font-medium text-gray-700 ">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading.value}
                                    class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-gray-500"
                                >
                                    <InKeyAltPlus class="w-6 h-6 -ml-2" />
                                    <span class="ml-3">Sign Up</span>
                                </button>
                                <p class="text-center text-xs text-gray-600 mt-1">
                                    No password required. Authorize via email.
                                </p>

                                <div class="mt-6 mb-6 text-xs text-gray-600 text-center  ">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        class="inline-block mr-2"
                                        name="terms"
                                    />
                                    <span>
                                        I agree to the{' '}
                                        <Link
                                            href="/terms"
                                            class="border-b border-gray-500 border-dotted hover:text-indigo-700 hover:font-bold"
                                        >
                                            Terms of Service,
                                        </Link>{' '}
                                        <Link
                                            href="/privacy"
                                            class="border-b border-gray-500 border-dotted hover:text-indigo-700 hover:font-bold"
                                        >
                                            Privacy Policy
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/disclaimer">
                                            <span class="border-b border-gray-500 border-dotted  hover:text-indigo-700 hover:font-bold">
                                                Disclaimer
                                            </span>
                                        </Link>
                                    </span>
                                </div>
                                <Message message={message} />
                            </form>
                        </div>
                    </div>
                </div>
                <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style="background-image: url('/images/officeCat.svg');"
                    ></div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: 'Sign Up',
    meta: [
        {
            name: 'description',
            content: 'Sign up for your account',
        },
    ],
};
