import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/blog"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publish_date: z.coerce.date(),
    tags: z.array(z.string()),
    published: z.boolean(),
    type: z.string(),
  })
})

export const collections = { blog };