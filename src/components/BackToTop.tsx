import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import { BsTriangleFill } from 'solid-icons/bs';


export default function BackToTop() {
  const [isVisible, setIsVisible] = createSignal(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return (
    <Show when={isVisible()}>
      <button
        onClick={scrollToTop}
        class="fixed bottom-5 right-5 z-10 p-2 border-2 rounded cursor-pointer"
      >
        <BsTriangleFill />
      </button>
    </Show>
  )
}