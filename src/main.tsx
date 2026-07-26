import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./Root.tsx";
import { BlogSite } from "./components/BlogSite/BlogSite.tsx";
import { SystemDateProvider } from "./context/SystemDateProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import "./index.css";
import { isBlogPath } from "./lib/route.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SystemDateProvider>
        {/* /blog is a document, not a window on the desktop. Choosing here
            keeps the desktop's clock, dock and easter eggs out of it. */}
        {isBlogPath() ? <BlogSite /> : <Root />}
      </SystemDateProvider>
    </ThemeProvider>
  </StrictMode>,
);
