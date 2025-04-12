import { onCleanup } from "solid-js";

export default function scrollToTop(el: HTMLElement, accessor: () => number) {
  const threshold = typeof accessor() === "number" ? accessor() : 50;

  const checkVisibility = () => {
    el.style.display = window.scrollY > threshold ? "block" : "none";
  };

  checkVisibility();
  window.addEventListener("scroll", checkVisibility);
  onCleanup(() => window.removeEventListener("scroll", checkVisibility));
}
