import { FiMenu } from 'solid-icons/fi';
import { Show, createSignal } from "solid-js";
import clickOutside from "../utils/click-outside.ts";

export default function BurgerMenuSolid() {
  const [show, setShow] = createSignal(false);
  
  const onClick = () => setShow(!show());

  return (
    <Show when={show()} fallback={<button onClick={onClick} class="w-fit ml-auto cursor-pointer"><FiMenu size={24} /></button>}>
      <div class="relative grid grid-col z-40" use:clickOutside={onClick}>
        <button onClick={onClick} class="w-fit ml-auto cursor-pointer">
          <FiMenu size={24} />
        </button>
        <ul  class="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 transform -translate-x-0">
          <li><a href="/" class="block px-4 py-2 hover:bg-gray-100">Home</a></li>
          <li><a href="/posts" class="block px-4 py-2 hover:bg-gray-100">Posts</a></li>
          <li><a href="/works" class="block px-4 py-2 hover:bg-gray-100">Works</a></li>
        </ul>
      </div>
    </Show>
  )
}