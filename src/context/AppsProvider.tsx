import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { APP_NAMES, type AppName } from "../lib/appName";
import { AppsContext } from "./AppsContext";

/** Windows sit above the desktop chrome but below the dock and menu bar. */
const WINDOW_Z_BASE = 10;

const EXPLORED_KEY = "explored";

/* Storage access throws in sandboxed iframes and some private modes, and this
   only decides whether an easter egg shows up — never worth taking the page
   down for. Failing closed just means the desktop stays plain. */
const readExplored = () => {
  try {
    return localStorage.getItem(EXPLORED_KEY) === "true";
  } catch {
    return false;
  }
};

const writeExplored = () => {
  try {
    localStorage.setItem(EXPLORED_KEY, "true");
  } catch {
    /* the flag simply will not survive this visit */
  }
};

const raise = (stack: AppName[], id: AppName) => [
  ...stack.filter((w) => w !== id),
  id,
];

export const AppsProvider = ({ children }: PropsWithChildren) => {
  const [closed, setClosed] = useState<AppName[]>(["projects", "snake"]);
  const [minimized, setMinimized] = useState<AppName[]>([]);
  const [stack, setStack] = useState<AppName[]>([...APP_NAMES]);
  const [hasExplored, setHasExplored] = useState(readExplored);

  const close = useCallback((id: AppName) => {
    setClosed((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setMinimized((prev) => prev.filter((w) => w !== id));
  }, []);

  /* Only ever called from a dock or desktop-icon click, so reaching here is
     proof the visitor is driving rather than reading. */
  const open = useCallback((id: AppName) => {
    setClosed((prev) => prev.filter((w) => w !== id));
    setMinimized((prev) => prev.filter((w) => w !== id));
    setStack((prev) => raise(prev, id));
    setHasExplored(true);
    writeExplored();
  }, []);

  const minimize = useCallback((id: AppName) => {
    setMinimized((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const focus = useCallback((id: AppName) => {
    setStack((prev) => (prev.at(-1) === id ? prev : raise(prev, id)));
  }, []);

  const zIndexOf = useCallback(
    (id: AppName) => WINDOW_Z_BASE + stack.indexOf(id),
    [stack],
  );

  const focused = useMemo(() => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const id = stack[i];
      if (!closed.includes(id) && !minimized.includes(id)) return id;
    }
    return null;
  }, [stack, closed, minimized]);

  const value = useMemo(
    () => ({
      closed,
      minimized,
      stack,
      focused,
      close,
      open,
      minimize,
      focus,
      hasExplored,
      zIndexOf,
    }),
    [
      closed,
      minimized,
      stack,
      focused,
      close,
      open,
      minimize,
      focus,
      hasExplored,
      zIndexOf,
    ],
  );

  return <AppsContext value={value}>{children}</AppsContext>;
};
