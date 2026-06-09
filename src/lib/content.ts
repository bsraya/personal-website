import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { slugify } from "@lib/string";

type Post = CollectionEntry<"posts">;
type Work = CollectionEntry<"works">;

export async function getAllPosts(): Promise<Post[]> {
  return getCollection("posts");
}

export async function getAllWorks(): Promise<Work[]> {
  return getCollection("works");
}

function sortByDate<T extends Post | Work>(entries: T[], order: "asc" | "desc" = "desc"): T[] {
  return [...entries].sort((a, b) => {
    const diff = new Date(a.data.publishedDate).getTime() - new Date(b.data.publishedDate).getTime();
    return order === "desc" ? -diff : diff;
  });
}

export async function getSortedPosts(order: "asc" | "desc" = "desc"): Promise<Post[]> {
  const all = await getAllPosts();
  return sortByDate(all.filter((p) => p.data.published), order);
}

export async function getSortedWorks(order: "asc" | "desc" = "desc"): Promise<Work[]> {
  const all = await getAllWorks();
  return sortByDate(all.filter((w) => w.data.published), order);
}

export async function getSeriesPosts(series: string): Promise<Post[]> {
  const posts = await getSortedPosts("asc");
  return posts.filter((p) => p.data.series === series);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.data.tag && slugify(p.data.tag) === tag);
}
