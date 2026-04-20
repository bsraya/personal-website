import { onMount, onCleanup } from "solid-js";

/**
 * Registers scroll-close and outside-click-close behavior for a floating element.
 * Call this in the component body (not inside onMount) — it schedules its own onMount internally.
 */
export function useDismiss(getRef: () => HTMLElement | undefined, close: () => void) {
  onMount(() => {
    const onScroll = () => close();
    const onClickOutside = (e: MouseEvent) => {
      const ref = getRef();
      if (ref && !e.composedPath().includes(ref)) close();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClickOutside);

    onCleanup(() => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClickOutside);
    });
  });
}
