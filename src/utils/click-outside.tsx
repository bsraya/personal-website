import { onCleanup } from "solid-js";

export default function clickOutside(el: HTMLElement, accessor: () => (() => void)) {
  const handler = (e: MouseEvent) => {
    if (!el.contains(e.target as Node)) {
      const cb = accessor();
      if (typeof cb === 'function') cb();
    }
  };

  document.addEventListener("click", handler);
  onCleanup(() => document.removeEventListener("click", handler));
}
