import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./Root.tsx";
import { SystemDateProvider } from "./context/SystemDateProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SystemDateProvider>
        <Root />
      </SystemDateProvider>
    </ThemeProvider>
  </StrictMode>,
);
