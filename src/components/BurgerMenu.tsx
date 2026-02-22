import { FiMenu } from 'solid-icons/fi';
import { Show, createSignal } from "solid-js";
import clickOutside from "@lib/click-outside";

// This import is necessary for the directive to work
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _clickOutside = clickOutside;

export default function BurgerMenuSolid() {
  const optionClass = "block px-4 py-2 hover:bg-gray-100"
  const [show, setShow] = createSignal(false);

  const onClick = () => setShow(!show());

  return (
    <Show when={show()} fallback={<button aria-label="Open menu" onClick={onClick} class="w-fit ml-auto cursor-pointer"><FiMenu size={24} /></button>}>
      <div class="relative grid grid-col z-40" use:clickOutside={onClick}>
        <button
          aria-label="Close menu"
          onClick={onClick}
          class="w-fit ml-auto cursor-pointer"
        >
          <FiMenu size={24} />
        </button>
        <ul class="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 transform -translate-x-0">
          <li><a href="/" class={optionClass}>Home</a></li>
          <li><a href="/posts" class={optionClass}>Posts</a></li>
          <li><a href="/works" class={optionClass}>Works</a></li>
          <li><a href="https://github.com/bsraya" target="_blank" rel="noopener noreferrer" class={optionClass}>GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/bijonsetyawan/" target="_blank" rel="noopener noreferrer" class={optionClass}>LinkedIn</a></li>
        </ul>
      </div>
    </Show>
  )
}