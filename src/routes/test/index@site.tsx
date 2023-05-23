import { $, component$, useStore } from '@builder.io/qwik';
import { Button } from '~/components/button';

export default component$(() => {
    const state = useStore({ name: 'unassigned' });
    const handleName = $(() => {
        state.name = 'Qwik Me';
    })
    return (
        <div>
            <h1>Test Page</h1>
            <Button handleNameFunction={handleName} />
            <div>Name: {state.name}</div>
        </div>
    )
})