import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isVisible, parseFrontmatter } from "../src/lib/frontmatter";

const BLOG_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/content/blog",
);

/**
 * The build's view of the posts: slugs and headers only, straight off disk.
 * The app reads the same files through import.meta.glob, which does not exist
 * in the config's Node context.
 *
 * Hidden posts drop out here too, so a draft gets no page and no sitemap entry.
 */
export const readPosts = async () => {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
      const { meta } = parseFrontmatter(raw);
      const slug = file.replace(/\.md$/, "");

      if (!isVisible(meta)) return null;

      return {
        slug,
        title: meta.title ?? slug,
        date: meta.date ?? "",
        summary: meta.summary ?? "",
      };
    }),
  );

  return posts
    .filter((post) => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
};
