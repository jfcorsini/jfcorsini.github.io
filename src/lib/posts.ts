import { marked } from "marked";
import { isVisible, parseFrontmatter } from "./frontmatter";

export type Post = {
  /** Filename without extension — also the URL segment under /blog. */
  slug: string;
  title: string;
  /** ISO date from the frontmatter, kept as a string so no timezone shifts it. */
  date: string;
  summary: string;
  /** Rendered HTML body, frontmatter stripped. */
  html: string;
  /** Rough reading time in minutes, floored at one. */
  minutes: number;
};

const WORDS_PER_MINUTE = 220;

const files = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

/**
 * Newest first, drafts left out — the order both the notes list and /blog read
 * in. Hidden posts never reach the bundle's list, so there is no address to
 * guess at either.
 */
export const POSTS: Post[] = Object.entries(files)
  .flatMap(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    if (!isVisible(meta)) return [];

    const slug = path.split("/").pop()!.replace(/\.md$/, "");

    return {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      summary: meta.summary ?? "",
      html: marked.parse(body, { async: false }),
      minutes: Math.max(
        1,
        Math.round(body.split(/\s+/).length / WORDS_PER_MINUTE),
      ),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
