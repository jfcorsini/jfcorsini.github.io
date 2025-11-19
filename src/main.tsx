import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Desktop } from "./components/Desktop/Desktop.tsx";
import { PortfolioWindow } from "./components/PortfolioWindow/index.tsx";
import { ProjectsWindow } from "./components/ProjectsWindow/ProjectsWindow.tsx";
import { AppsProvider } from "./context/AppsProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppsProvider>
      <Desktop />
      <PortfolioWindow />
      <ProjectsWindow />
    </AppsProvider>
  </StrictMode>,
);
