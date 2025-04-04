export interface Frontmatter {
  title: string;
  description: string;
  publishedDate: Date;
  tags: Array<string>;
  published: boolean;
  type: string;
}