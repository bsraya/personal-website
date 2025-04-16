import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "../types/frontmatter.ts";

enum SortOrder {
    Ascending = "ascending",
    Descending = "descending",
}

export function sortContent(posts: MarkdownInstance<Frontmatter>[], sortOrder: SortOrder = SortOrder.Descending) {
    return posts.sort((a, b) =>  {
        const dateA = new Date(a.frontmatter.publishedDate);
        const dateB = new Date(b.frontmatter.publishedDate);
        if (sortOrder === SortOrder.Ascending) {
            return dateA.getTime() - dateB.getTime();
        }
        if (sortOrder === SortOrder.Descending) {
            return dateB.getTime() - dateA.getTime();
        }
    })
}

export function getSimilarPosts(series: string) {
    const allPosts = Object.values(import.meta.glob<MarkdownInstance<Frontmatter>>("../content/posts/*.mdx", { eager: true }));
    const sortedPosts = sortContent(allPosts, SortOrder.Ascending);

    return Array.from(sortedPosts).filter((post) => {
        if (post.frontmatter.series === series) {
            return post
        }
    });
}