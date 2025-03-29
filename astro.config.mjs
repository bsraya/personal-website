import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    mdx(),
    solidJs({ devtools: true })
  ],
  vite: {
    plugins: [tailwindcss()],
  }
});