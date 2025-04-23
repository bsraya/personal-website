import { createSignal, Show, For } from "solid-js";
import type { Heading } from "../types/heading";
import { VsTriangleUp, VsTriangleDown } from "solid-icons/vs";
import clickOutside from "../utils/click-outside.ts";

export default function TableOfContent({ url, headings }: { url: string, headings: Heading[] }) {
  const [tocOpen, setTocOpen] = createSignal(false);
  const toggleToc = () => setTocOpen(!tocOpen());

  return (
    <div class={`p-3 fixed bottom-5 left-1/2 -translate-x-1/2 z-20 w-[250px] border-2 rounded cursor-pointer bg-white`} onClick={toggleToc}>
      <button class="flex w-full font-semibold cursor-pointer">
        <span>Table of Content</span>
        <span class="my-auto ml-auto">
          <Show when={tocOpen()} fallback={<VsTriangleUp />}>
            <VsTriangleDown />
          </Show>
        </span>
      </button>
      <Show when={tocOpen()}>
        <ul class="list-disc flex flex-col gap-1 mt-2" use:clickOutside={toggleToc}>
          <For each={headings}>
            {
              (heading) => (
                <li
                  class={`${heading.depth === 2 ? 'ml-[1rem] font-semibold' : heading.depth === 3 ? 'ml-[1.75rem]': heading.depth === 4 ? 'ml-[2.25rem]': ''}`}
                >
                  <a href={`${url}#${heading.slug}`} class="hover:underline custor-pointer">
                    {heading.text}
                  </a>
                </li>
              )
            }
          </For>
        </ul>
      </Show>
    </div>
  )
}