export function createSlug(text: string) {
  const slug = text.toLowerCase().replace(/\s+/g, "-");
  const cleanedSlug = slug.replace(/[^a-z0-9-]+/g, "");
  const finalSlug = cleanedSlug.replace(/^-+|-+$/g, "");
  const singleDashSlug = finalSlug.replace(/-+/g, "-");

  return singleDashSlug;
}
