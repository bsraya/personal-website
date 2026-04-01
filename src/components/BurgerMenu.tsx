import { Menu, X } from "lucide-solid";
import { Show, createSignal, onMount, onCleanup } from "solid-js";
import clickOutside from "@lib/click-outside";

// This import is necessary for the directive to work
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _clickOutside = clickOutside;

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

  onMount(() => {
    const onScroll = () => setSticky(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    onCleanup(() => window.removeEventListener("scroll", onScroll));
  });

  return (
    <div
      class="z-40 fixed top-4 right-4 rounded-xl border border-transparent bg-white burger-sticky-border md:relative md:top-auto md:right-auto md:rounded-none md:border-0 md:bg-transparent md:[animation:none]"
      use:clickOutside={close}
    >
      <button
        aria-label={show() ? "Close menu" : "Open menu"}
        aria-expanded={show()}
        onClick={toggle}
        class="flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <Show when={show()} fallback={<Menu size={20} />}>
          <X size={20} />
        </Show>
      </button>
      <Show when={show()}>
        <ul class="absolute top-[calc(100%+0.5rem)] right-0 w-52 bg-white rounded-xl border border-slate-200 py-1 overflow-hidden">
          {navLinks.map(({ href, label, external }) => (
            <li>
              <a
                href={href}
                onClick={close}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                class="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
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