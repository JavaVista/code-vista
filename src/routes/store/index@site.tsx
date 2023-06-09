import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <h1 class="h-screen">
      Store Page
    </h1>
  );
});

export const head: DocumentHead = {
  title: 'Store',
  meta: [
    {
      name: 'description',
      content: 'Purchase one off code downloads to make your life easier',
    },
  ],
};