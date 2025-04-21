export function toKebabCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

export function fromKebabCase(input: string): string {
  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
