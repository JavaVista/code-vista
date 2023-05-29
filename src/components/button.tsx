import { $, component$, useStore, useTask$ } from '@builder.io/qwik';

interface ItemsProps {
    handleNameFunction: any;
}

export const Button = component$((props: ItemsProps) => {
    
    const state = useStore({ message: 'none - store' });
    
    const handleClick = $(() => {
        state.message = 'Button Qwik Me';
        props.handleNameFunction();
    }
)
    useTask$(({track}) => {
        track(state)
       console.log(state.message );
    })

    return (
        <button onClick$={handleClick} class="bg-blue-500 py-2 px-4 rounded-sm text-white hover:bg-sky-400">
            Hello Qwik!
        </button>
    );
});
