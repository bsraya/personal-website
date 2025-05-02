import { defineConfig } from "astro/config";

// Astro Intregrations
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap"
import metaTags from "astro-meta-tags";
import robotsTxt from "astro-robots-txt";
import vercel from "@astrojs/vercel";
import AstroPWA from "@vite-pwa/astro";

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
  site: "https://bsraya.com",
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-light",
    },
    remarkPlugins: [
      remarkMath,
      [remarkToc, { heading: 'toc', maxDepth: 3 }]
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeHeadingIds,
      rehypeSlug,
      rehypeAccessibleEmojis,
      [rehypeAutolinkHeadings, { behavior: 'append' }]
    ],
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
    AstroPWA({
      manifest: {
        name: "Bijon Setyawan Raya",
        short_name: "BSR",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        includeAssets: ['favicon.svg'],
        registerType: 'autoUpdate',
        display: "standalone",
        scope: "/",
        base: "/?from=pwa",
        icons: [
          {
            "src": "/static/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/static/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    })
  ],
  vite: {
    plugins: [tailwindcss()],
  }
});
