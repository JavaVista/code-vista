import { component$, useStore, $, useSignal } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import {
    InGoogleCircle,
    InGithubCircle,
    InLogIn,
} from '@qwikest/icons/iconoir';
import { type IMessage, Message } from '~/components/message/message';
import { validateEmail } from '~/utils/helpers';
import { supabase } from '~/utils/supabase';

export default component$(() => {
    const message: IMessage = useStore({ message: undefined, status: 'error' });
    const isLoading = useSignal(false);


    const handleEmailLogin = $(async (event: any) => {
        // initialize message
        message.message = undefined;
        message.status = 'error';
        isLoading.value = true;

        // extract values
        const email = event.target.email.value;
        const isEmailValid = validateEmail(email);

        // handle validations
        if (!isEmailValid) {
            message.message = 'Please enter a valid email address';
            message.status = 'error';
            isLoading.value = false;
            return;
        }
      

        const stagingUrl = 'http://127.0.0.1:5173/login/staging/';
        
        // sign in supabase user
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: stagingUrl,
            }
        });

        if (data && !error) {
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
                            Log in
                        </h2>
                        <p class="mt-2 text-gray-600">
                            Or{' '}
                            <Link
                                href="/signup"
                                class="font-medium text-indigo-700 hover:text-indigo-400"
                            >
                                Create your account
                            </Link>
                        </p>
                        <div class="w-full flex-1 mt-8">
                            <div class="flex flex-col items-center">
                                <button class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5 hover:bg-indigo-700 ">
                                    <div class="bg-white rounded-full hover:text-gray-800">
                                        <InGoogleCircle class="w-6 h-6" />
                                    </div>
                                    <span class="ml-4 hover:text-gray-100">
                                        Log in with Google
                                    </span>
                                </button>

                                <button class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5 hover:bg-indigo-700">
                                    <div class="bg-white rounded-full hover:text-gray-800 ">
                                        <InGithubCircle class=" w-6 h-6" />
                                    </div>
                                    <span class="ml-4 hover:text-gray-100">
                                        Log in with GitHub
                                    </span>
                                </button>
                            </div>

                            <div class="my-12 border-b text-center">
                                <div class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or log in with e-mail
                                </div>
                            </div>

                            <form
                                onSubmit$={handleEmailLogin}
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
                                    class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-gray-500"
                                    disabled={isLoading.value}
                                    type="submit"
                                >
                                    <InLogIn class="w-6 h-6 -ml-2" />
                                    <span class="ml-3">Log In</span>
                                </button>
                                <p class="text-center text-xs text-gray-600 mt-1">
                                    No password required. Authorize via email.
                                </p>

                                <div class="mt-6 mb-6 text-xs text-gray-600 text-center  ">
                                    <span>
                            
                                        <Link
                                            href="/terms"
                                            
                                        >
                                            <button class="border-b border-gray-500 border-dotted hover:text-indigo-700 hover:font-bold">Problems signing in?</button>
                                        </Link>
                                     
                                    </span>
                                </div>
                                <Message message={message} />
                            </form>
                        </div>
                    </div>
                </div>
                <div class="flex-1 bg-gray-50 text-center hidden lg:flex">
                    <div
                        class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style="background-image: url('/images/officeWork.svg');"
                    ></div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: 'Login',
    meta: [
        {
            name: 'description',
            content: 'Login Page',
        },
    ],
};
