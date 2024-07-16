export default function slugify(text: string): string {
  return text
    .toLowerCase()

    .normalize("NFKD")
    .replace(/[^\w\s-]+/g, "")
    .replace(/[-\s]+/g, "-")
    .replace(/^[\s-_]+|[\s-_]+$/g, "");
}
