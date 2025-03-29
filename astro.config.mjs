import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import rehypePresetMinify from "rehype-preset-minify";

export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'dracula' },
      remarkPlugins: [remarkMath, remarkToc],
      rehypePlugins: [rehypeKatex, rehypePresetMinify],
      remarkRehype: { footnoteLabel: 'Footnotes' },
      gfm: true,
    }),
    solidJs({ devtools: true })
  ],
  vite: {
    plugins: [tailwindcss()],
  }
});