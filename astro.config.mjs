import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

// Expressive code plugins
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginCodeOutput } from "@fujocoded/expressive-code-output";


export default defineConfig({
  integrations: [
    solid({ devtools: true }),
    expressiveCode({
      themes: ['github-light'],
      plugins: [pluginLineNumbers(), pluginCodeOutput()]
    }),
      remarkRehype: { footnoteLabel: 'Footnotes' },
      gfm: true,
    }),
    solidJs({ devtools: true })
  ],
  vite: {
    plugins: [tailwindcss()],
  }
});