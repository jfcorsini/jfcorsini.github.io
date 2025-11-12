import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Desktop } from "./components/Desktop/Desktop.tsx";
import { PortfolioWindow } from "./components/PortfolioWindow";
import { WindowsProvider } from "./context/WindowsProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WindowsProvider>
      <Desktop />
      <PortfolioWindow />
    </WindowsProvider>
  </StrictMode>,
);
