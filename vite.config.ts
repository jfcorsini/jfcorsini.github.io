import react from "@vitejs/plugin-react-swc";
import fs from "node:fs/promises";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import svgr from "vite-plugin-svgr";
import { readPosts } from "./scripts/readPosts";

const SITE = "https://jfcorsini.com";

/**
 * GitHub Pages serves files, not routes: without a real index.html at
 * /blog/<slug>/ a shared link 404s. The built app already renders any path, so
 * it gets copied to one file per post — each with its own title and meta tags —
 * plus a 404.html fallback for anything unforeseen.
 */
const blogPages = (): Plugin => ({
  name: "blog-pages",
  apply: "build",
  async writeBundle(options, bundle) {
    const entry = bundle["index.html"];
    if (!options.dir || !entry || entry.type !== "asset") return;

    const shell = entry.source.toString();
    const outDir = options.dir;
    const posts = await readPosts();

    const write = async (route: string, html: string) => {
      const dir = path.join(outDir, route);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, "index.html"), html);
    };

    /** Rewrites the shell's shared meta block for one specific page. */
    const describe = (title: string, description: string, url: string) =>
      shell
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(
          /(<meta\s+(?:name|property)="(?:title|og:title|twitter:title)"\s+content=")[^"]*/g,
          `$1${title}`,
        )
        .replace(
          /(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*/g,
          `$1${description}`,
        )
        .replace(/(<link\s+rel="canonical"\s+href=")[^"]*/, `$1${url}`)
        .replace(
          /(<meta\s+property="(?:og|twitter):url"\s+content=")[^"]*/g,
          `$1${url}`,
        );

    await write(
      "blog",
      describe(
        "Notes — João F. Corsini",
        "Short pieces on building software, by João F. Corsini.",
        `${SITE}/blog`,
      ),
    );

    for (const post of posts) {
      await write(
        `blog/${post.slug}`,
        describe(
          `${post.title} — João F. Corsini`,
          post.summary,
          `${SITE}/blog/${post.slug}`,
        ),
      );
    }

    /* Pages falls back to 404.html, so serving the app there means a mistyped
       or renamed note still lands on something that can explain itself. */
    await fs.writeFile(path.join(outDir, "404.html"), shell);

    const urls: { loc: string; priority: string; lastmod?: string }[] = [
      { loc: `${SITE}/`, priority: "1.0" },
      { loc: `${SITE}/blog`, priority: "0.8" },
      ...posts.map((post) => ({
        loc: `${SITE}/blog/${post.slug}`,
        priority: "0.6",
        lastmod: post.date,
      })),
    ];

    await fs.writeFile(
      path.join(outDir, "sitemap.xml"),
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map(({ loc, priority, lastmod }) =>
          [
            "  <url>",
            `    <loc>${loc}</loc>`,
            ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
            `    <priority>${priority}</priority>`,
            "  </url>",
          ].join("\n"),
        ),
        "</urlset>",
        "",
      ].join("\n"),
    );
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), blogPages()],
  base: "/",
});
