export function slugify(input: string): string {
  return input
    // remove leading & trailing whitespace
    .trim()  
    // remove special characters
    .replace(/[^A-Za-z0-9 ]/g, '')
    // replace spaces
    .replace(/\s+/g, '-')
    // remove leading & trailing separtors
    .replace(/^-+|-+$/g, '')
    // output lowercase
    .toLowerCase()
}

export function deslugify(input: string): string {
  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getSlugFromPath(filePath: string): string | null {
  if (!filePath) {
    return null;
  }

  // 1. Get the filename with extension (e.g., "first-post.mdx")
  const filenameWithExtension = filePath.substring(filePath.lastIndexOf('/') + 1);

  // 2. Remove the extension (e.g., "first-post")
  // This handles common single extensions like .md, .mdx, .ts, .js
  // For more complex extensions (e.g., .tar.gz), you might need a more robust solution.
  const lastDotIndex = filenameWithExtension.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return filenameWithExtension;
  }

  return filenameWithExtension.substring(0, lastDotIndex);
}