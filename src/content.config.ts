import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/posts"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    keywords: z.array(z.string()).nullable(),
    tag: z.string(),
    series: z.string().nullable(),
    published: z.boolean()
  })
})

const works = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/works"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    keywords: z.array(z.string()).nullable(),
    tag: z.string().nullable(),
    published: z.boolean()
  })
})


export const collections = { posts, works };