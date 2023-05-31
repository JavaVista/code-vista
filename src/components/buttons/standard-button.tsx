import { component$ } from '@builder.io/qwik';
import { type ButtonProps } from '~/interfaces/button-props';

export const StandardButton = component$((props: ButtonProps) => {
    return (
        <div
            onClick$={props.handleFunction}
            class={
                props.style +
                ' px-10 py-3.5 w-full flex justify-center rounded-md shadow-md sm:w-auto '
            }
        >
            <span class="">{props.label}</span>
        </div>
    );
});
