import { createSignal, For, onMount, onCleanup } from "solid-js";
import type { Heading } from "../types/heading";

export default function TableOfContent({ url, headings }: { url: string, headings: Heading[] }) {
  const [tocOpen, setTocOpen] = createSignal(false);
  const [visible, setVisible] = createSignal(false);
  const toggleToc = () => setTocOpen(!tocOpen());
  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY;

      // Close dropdown on any scroll
      setTocOpen(false);

      // Show when scrolled past threshold and scrolling up; hide otherwise
      if (currentY <= 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    onCleanup(() => window.removeEventListener("scroll", onScroll));

    const onClickOutside = (e: MouseEvent) => {
      if (containerRef && !e.composedPath().includes(containerRef)) {
        setTocOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    onCleanup(() => document.removeEventListener("click", onClickOutside));
  });

  const depthStyles: Record<number, string> = {
    2: "pl-0 font-semibold text-slate-800",
    3: "pl-4 text-slate-600",
    4: "pl-8 text-slate-500 text-[0.8rem]",
  };

  return (
    <div
      ref={containerRef}
      class={`fixed top-0 left-1/2 -translate-x-1/2 z-20 w-[250px] rounded-xl border border-slate-200 backdrop-blur-xs overflow-hidden transition-transform duration-250 ease-in-out ${visible() ? "translate-y-4" : "-translate-y-full"}`}
    >
      <button
        class="flex w-full items-center gap-2 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
        onClick={toggleToc}
        aria-expanded={tocOpen()}
        aria-controls="toc-list"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500 shrink-0 block"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
        <span class="text-sm">Table of Contents</span>
        <span class="ml-auto flex items-center text-slate-400">
          {tocOpen()
            ? <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block"><path d="m18 15-6-6-6 6" /></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block"><path d="m6 9 6 6 6-6" /></svg>
          }
        </span>
      </button>
      <div
        id="toc-list"
        class={`grid transition-all duration-250 ease-in-out ${tocOpen() ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div class="min-h-0 overflow-hidden">
          <ul class="toc border-t border-slate-100 flex flex-col py-4 px-4">
            <For each={headings}>
              {(heading) => (
                <li class={`${depthStyles[heading.depth] ?? "pl-0"} py-1`}>
                  <a
                    href={`${url}#${heading.slug}`}
                    onClick={() => setTocOpen(false)}
                    class="block leading-snug hover:text-blue-600 transition-colors"
                  >
                    {heading.text}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  );
}