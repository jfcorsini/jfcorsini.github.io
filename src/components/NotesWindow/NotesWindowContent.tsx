import { useState } from "react";
import { formatDate, POSTS } from "../../lib/posts";
import { blogPath } from "../../lib/route";
import styles from "./NotesWindow.module.css";

/**
 * The notes app: a list on the left, the post on the right. Shared with the
 * phone shell, which stacks the two instead of splitting them.
 */
export const NotesWindowContent = () => {
  const [slug, setSlug] = useState(POSTS[0]?.slug);
  const post = POSTS.find((p) => p.slug === slug) ?? POSTS[0];

  if (!post) {
    return <div className={styles.empty}>No notes yet.</div>;
  }

  return (
    <div className={styles.layout}>
      <nav className={styles.list} aria-label="Notes">
        <p className={styles.listHeader}>
          {POSTS.length} {POSTS.length === 1 ? "note" : "notes"}
        </p>
        {POSTS.map((entry) => (
          <button
            key={entry.slug}
            className={`${styles.listItem} ${
              entry.slug === post.slug ? styles.listItemActive : ""
            }`}
            onClick={() => setSlug(entry.slug)}
          >
            <span className={styles.listTitle}>{entry.title}</span>
            <span className={styles.listMeta}>{formatDate(entry.date)}</span>
            <span className={styles.listSummary}>{entry.summary}</span>
          </button>
        ))}
      </nav>

      <article className={styles.reader}>
        <header className={styles.readerHeader}>
          <h1 className={styles.readerTitle}>{post.title}</h1>
          <p className={styles.readerMeta}>
            {formatDate(post.date)} · {post.minutes} min read
            {/* A full page load on purpose: the reading view is its own
                document, not a state of the desktop. */}
            <a className={styles.readerLink} href={blogPath(post.slug)}>
              Open reading view ↗
            </a>
          </p>
        </header>
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </div>
  );
};
