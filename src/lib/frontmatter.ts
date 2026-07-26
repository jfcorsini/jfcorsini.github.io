/**
 * Frontmatter for the blog posts. They are mine, written in files I control, so
 * a YAML dependency would be a lot of parser to read a few flat keys.
 *
 * Lives on its own because the build reads the same headers from disk to emit a
 * static page per post.
 */
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export type PostMeta = {
  title?: string;
  date?: string;
  summary?: string;
  /** `hidden: true` keeps a draft in the repo but off the site entirely. */
  hidden?: string;
};

export const isVisible = (meta: PostMeta) => meta.hidden !== "true";

export const parseFrontmatter = (raw: string) => {
  const match = raw.match(FRONTMATTER);
  if (!match) return { meta: {} as PostMeta, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    meta[line.slice(0, colon).trim()] = line
      .slice(colon + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }

  return { meta: meta as PostMeta, body: raw.slice(match[0].length) };
};
