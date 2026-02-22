import { createSignal, Show, For } from "solid-js";
import type { Heading } from "../types/heading";
import { ChevronUp, ChevronDown, List } from "lucide-solid";
import clickOutside from "@lib/click-outside";

export default function TableOfContent({ url, headings }: { url: string, headings: Heading[] }) {
  const [tocOpen, setTocOpen] = createSignal(false);
  const toggleToc = () => setTocOpen(!tocOpen());

  const depthStyles: Record<number, string> = {
    2: "pl-0 font-semibold text-slate-800",
    3: "pl-4 text-slate-600",
    4: "pl-8 text-slate-500 text-[0.8rem]",
  };

  return (
    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[280px] rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 overflow-hidden"
      use:clickOutside={() => setTocOpen(false)}
    >
      <button
        class="flex w-full items-center gap-2 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
        onClick={toggleToc}
        aria-expanded={tocOpen()}
        aria-controls="toc-list"
      >
        <List size={14} class="text-slate-500 shrink-0 block" />
        <span class="text-sm">Table of Contents</span>
        <span class="ml-auto flex items-center text-slate-400">
          <Show when={tocOpen()} fallback={<ChevronUp size={14} class="block" />}>
            <ChevronDown size={14} class="block" />
          </Show>
        </span>
      </button>
      <Show when={tocOpen()}>
        <ul
          id="toc-list"
          class="toc border-t border-slate-100 flex flex-col py-2 px-4 max-h-64 overflow-y-auto"
        >
          <For each={headings}>
            {(heading) => (
              <li class={`${depthStyles[heading.depth] ?? "pl-0"} py-1`}>
                <a
                  href={`${url}#${heading.slug}`}
                  class="block leading-snug hover:text-blue-600 transition-colors"
                >
                  {heading.text}
                </a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}