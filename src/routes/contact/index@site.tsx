import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Contact us</div>
});

export const head: DocumentHead = {
  title: "Contact us",
  meta: [
    {
      name: "description",
      content:
        "Contact the webmaster at Code-Vista. We would love to hear from you.",
    },
  ],
};