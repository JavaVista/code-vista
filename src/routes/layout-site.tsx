import { component$, Slot } from '@builder.io/qwik';
import { Nav } from '~/components/nav/nav';

export default component$(() => {
  return (
    <>
      <main>
        <Nav />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <div class="bg-gray-900 text-white py-14 text-center">Footer</div>
      </footer>
    
    </>
    );
});
