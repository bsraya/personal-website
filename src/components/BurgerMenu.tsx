import { createSignal, onMount, onCleanup } from "solid-js";
import { FiMenu } from 'solid-icons/fi';

export default function BurgerMenuSolid() {
  const [show, setShow] = createSignal(false);
  let dropdownRef: HTMLDivElement;

  const handleDocumentClick = (e: MouseEvent) => {
    if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
      setShow(false);
    }
  }

  const toggleMenu = (e: MouseEvent) => {
    setShow(!show());
  };

  onMount(() => {
    document.addEventListener("click", handleDocumentClick);

    onCleanup(() => {
      document.removeEventListener("click", handleDocumentClick);
    });
  });

  return (
    <div class="relative grid grid-col z-40" ref={dropdownRef}>
      <button
        class="w-fit ml-auto cursor-pointer"
        onClick={toggleMenu}
      >
        <FiMenu size={24} />
      </button>
      {
        show() &&
          <ul class="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 transform -translate-x-0">
            <li><a href="/" class="block px-4 py-2 hover:bg-gray-100">Home</a></li>
            <li><a href="/posts" class="block px-4 py-2 hover:bg-gray-100">Posts</a></li>
            <li><a href="/works" class="block px-4 py-2 hover:bg-gray-100">Works</a></li>
          </ul>
      }
    </div>
  )
}