import { component$ } from '@builder.io/qwik';
import { type ButtonProps } from '~/interfaces/button-props';
import { Circles } from '../loader/circles';

export const ActionButton = component$((props: ButtonProps) => {
    return (
        <div
            onClick$={props.handleFunction}
            class={
                props.style +
                ' px-10 py-3.5 w-full flex justify-center text-white rounded-md shadow-md sm:w-auto ' +
                (props.isDisabled
                    ? 'bg-gray-500 '
                    : 'bg-indigo-700 hover:bg-indigo-500 ')
            }
        >
            {props.isLoading && (
                <>
                    <Circles />
                    <span class="">{props.isLoadingLabel}</span>
                </>
            )}

            {!props.isLoading && <span class="">{props.label}</span>}
        </div>
    );
});
