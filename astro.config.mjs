import { defineConfig } from "astro/config";

// Astro Intregrations
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap"
import metaTags from "astro-meta-tags";
import robotsTxt from "astro-robots-txt";

// Markdown plugins
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import rehypeSlug from 'rehype-slug';
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

// Expressive code plugins
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginCodeOutput } from "@fujocoded/expressive-code-output";


export default defineConfig({
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-light",
    },
    remarkPlugins: [remarkMath, [remarkToc, { heading: 'toc', maxDepth: 3 }]],
    rehypePlugins: [rehypeKatex, rehypeHeadingIds, rehypeSlug, rehypeAccessibleEmojis, [rehypeAutolinkHeadings, { behavior: 'append' }]],
    remarkRehype: { footnoteLabel: 'Footnotes' },
    gfm: true
  },
  integrations: [
    solid({ devtools: true }),
    expressiveCode({
      themes: ['github-light'],
      plugins: [pluginLineNumbers(), pluginCodeOutput()]
    }),
    mdx({
      extendMarkdownConfig: true
    }),
    sitemap(),
    metaTags(),
    robotsTxt(),
  ],
  vite: {
    plugins: [tailwindcss()],
  }
});