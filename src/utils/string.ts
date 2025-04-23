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
