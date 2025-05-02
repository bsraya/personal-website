import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "@type/frontmatter";
import { slugify } from "@util/string.ts";

enum SortOrder {
    Ascending = "ascending",
    Descending = "descending",
}

export function getAllPosts() {
    return Object.values(
        import.meta.glob<MarkdownInstance<Frontmatter>>("../content/posts/*.mdx", { eager: true })
    );
}

export function getAllWorks() {
    return Object.values(
        import.meta.glob<MarkdownInstance<Frontmatter>>("../content/works/*.mdx", { eager: true })
    );
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


export function getSortedPosts(sortOrder: SortOrder = SortOrder.Descending) {
    const posts = getAllPosts();
  
    const publishedPosts = posts.filter((item) => item.frontmatter.published === true);
    return sortContent(publishedPosts, sortOrder=sortOrder);
}


export function getSortedWorks() {
    const works = getAllWorks();

    const publishedWorks = works.filter((item) => item.frontmatter.published === true);
    return sortContent(publishedWorks);
}


export function getSeriesPosts(series: string) {
    const posts = getSortedPosts(SortOrder.Ascending);

    return Array.from(posts).filter((post) => {
        if (post.frontmatter.series === series) {
            return post
        }
    });
}


export function getPostsByTag(tag: string) {
    const posts = getAllPosts();

    return posts.filter(post => post.frontmatter.tag && (slugify(post.frontmatter.tag) == tag));
}