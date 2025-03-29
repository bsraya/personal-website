import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    mdx(),
    solidJs({ devtools: true })
  ]
});