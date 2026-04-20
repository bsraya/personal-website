import { Show, createSignal, onMount, onCleanup } from "solid-js";
import { useDismiss } from "../lib/use-dismiss";

const navLinks = [
  { href: "/", label: "Home", external: false },
  { href: "/posts", label: "Posts", external: false },
  { href: "/works", label: "Works", external: false },
  { href: "/resume", label: "Resume", external: false },
  { href: "https://github.com/bsraya", label: "GitHub", external: true },
  { href: "https://www.linkedin.com/in/bijonsetyawan/", label: "LinkedIn", external: true },
];

export default function BurgerMenuSolid() {
  const [show, setShow] = createSignal(false);
  const [sticky, setSticky] = createSignal(false);
  const toggle = () => setShow((s) => !s);
  const close = () => setShow(false);
  let containerRef: HTMLDivElement | undefined;

  useDismiss(() => containerRef, close);

  onMount(() => {
    const onScroll = () => setSticky(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    onCleanup(() => window.removeEventListener("scroll", onScroll));
  });

  return (
    <div
      ref={containerRef}
      class="z-40 fixed top-4 right-4 md:relative md:top-auto md:right-auto md:[animation:none]"
    >
      <div class="rounded-xl border burger-sticky-border overflow-hidden md:rounded-none md:border-0 md:bg-transparent">
        <button
          aria-label={show() ? "Close menu" : "Open menu"}
          aria-expanded={show()}
          onClick={toggle}
          class="flex items-center justify-center w-9 h-9 backdrop-blur-xs rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Show when={show()} fallback={<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </Show>
        </button>
      </div>
      <Show when={show()}>
        <ul class="absolute top-[calc(100%+0.5rem)] right-0 w-52 backdrop-blur-sm rounded-xl border border-slate-200 py-1 overflow-hidden">
          {navLinks.map(({ href, label, external }) => (
            <li>
              <a
                href={href}
                onClick={close}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                class="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:text-blue-600 transition-colors"
              >
                {label}
                <Show when={external}>
                  <span class="text-slate-300 text-xs">↗</span>
                </Show>
              </a>
            </li>
          ))}
        </ul>
      </Show>
    </div>
  );
}