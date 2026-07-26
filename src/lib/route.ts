import { useEffect, useState } from "react";

export const BLOG_BASE = "/blog";

export const blogPath = (slug?: string) =>
  slug ? `${BLOG_BASE}/${slug}` : BLOG_BASE;

const normalize = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

export const isBlogPath = (pathname = window.location.pathname) =>
  normalize(pathname) === BLOG_BASE || pathname.startsWith(`${BLOG_BASE}/`);

/** Slug of the post being read, or null on the blog index. */
export const blogSlug = (pathname = window.location.pathname) => {
  const rest = normalize(pathname).slice(BLOG_BASE.length + 1);
  return rest === "" ? null : rest;
};

/**
 * The whole router. Two views and a flat list of posts do not need more than
 * pushState plus a listener for the back button.
 */
export const usePathname = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, "", to);
    setPathname(to);
    window.scrollTo(0, 0);
  };

  return { pathname, navigate };
};
