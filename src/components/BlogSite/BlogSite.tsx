import { useEffect } from "react";
import { findPost, formatDate, POSTS, type Post } from "../../lib/posts";
import { BLOG_BASE, blogPath, blogSlug, usePathname } from "../../lib/route";
import styles from "./BlogSite.module.css";

/** The desktop pins the document; a page of prose has to be able to scroll. */
const useScrollableDocument = () => {
  useEffect(() => {
    document.documentElement.dataset.view = "reading";
    return () => {
      delete document.documentElement.dataset.view;
    };
  }, []);
};

/** Titles matter here: this view is what a shared link opens. */
const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

type LinkProps = React.PropsWithChildren<{
  to: string;
  className?: string;
  navigate: (to: string) => void;
}>;

/* A real href so links are shareable and middle-clickable; pushState only
   takes over the plain left click. */
const Link = ({ to, className, navigate, children }: LinkProps) => (
  <a
    href={to}
    className={className}
    onClick={(e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      navigate(to);
    }}
  >
    {children}
  </a>
);

const Index = ({ navigate }: { navigate: (to: string) => void }) => (
  <>
    <header className={styles.masthead}>
      <h1 className={styles.mastheadTitle}>Notes</h1>
      <p className={styles.mastheadBlurb}>
        Short pieces on building software, by João F. Corsini.
      </p>
    </header>

    {POSTS.length === 0 && (
      <p className={styles.empty}>
        Nothing published yet. The link keeps working when there is.
      </p>
    )}

    <ol className={styles.index}>
      {POSTS.map((post) => (
        <li key={post.slug}>
          <Link
            to={blogPath(post.slug)}
            navigate={navigate}
            className={styles.indexItem}
          >
            <span className={styles.indexDate}>{formatDate(post.date)}</span>
            <span className={styles.indexTitle}>{post.title}</span>
            <span className={styles.indexSummary}>{post.summary}</span>
          </Link>
        </li>
      ))}
    </ol>
  </>
);

const Article = ({
  post,
  navigate,
}: {
  post: Post;
  navigate: (to: string) => void;
}) => (
  <article>
    <header className={styles.articleHeader}>
      <Link to={BLOG_BASE} navigate={navigate} className={styles.back}>
        ← All notes
      </Link>
      <h1 className={styles.articleTitle}>{post.title}</h1>
      <p className={styles.articleMeta}>
        {formatDate(post.date)} · {post.minutes} min read
      </p>
    </header>
    <div
      className={styles.prose}
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  </article>
);

/**
 * Everything under /blog. Same posts as the notes app, but as a document:
 * one column, no window chrome, its own scroll.
 */
export const BlogSite = () => {
  const { pathname, navigate } = usePathname();
  const slug = blogSlug(pathname);
  const post = slug ? findPost(slug) : null;

  useScrollableDocument();
  useDocumentTitle(
    post ? `${post.title} — João F. Corsini` : "Notes — João F. Corsini",
  );

  return (
    <div className={styles.page}>
      <div className={styles.column}>
        {slug && !post ? (
          <div className={styles.missing}>
            <h1 className={styles.articleTitle}>Not found</h1>
            <p className={styles.articleMeta}>
              No note lives at that address.{" "}
              <Link to={BLOG_BASE} navigate={navigate}>
                All notes
              </Link>
            </p>
          </div>
        ) : post ? (
          <Article post={post} navigate={navigate} />
        ) : (
          <Index navigate={navigate} />
        )}

        <footer className={styles.footer}>
          {/* Full load on purpose — the desktop is a different app. */}
          <a href="/">jfcorsini.com</a>
          <a href="https://github.com/jfcorsini">GitHub</a>
        </footer>
      </div>
    </div>
  );
};
