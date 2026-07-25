import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BootScreen } from "./components/Desktop/BootScreen.tsx";
import { Desktop } from "./components/Desktop/Desktop.tsx";
import { PortfolioWindow } from "./components/PortfolioWindow/index.tsx";
import { ProjectsWindow } from "./components/ProjectsWindow/ProjectsWindow.tsx";
import { SnakeWindow } from "./components/SnakeWindow/SnakeWindow.tsx";
import { MobileShell } from "./components/Mobile/MobileShell.tsx";
import { Void } from "./components/Void/Void.tsx";
import { AppsProvider } from "./context/AppsProvider.tsx";
import { useSystemDate } from "./context/hooks.ts";
import { SystemDateProvider } from "./context/SystemDateProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import { BIRTH_DATE } from "./lib/dateEntries.ts";
import { useIsMobile } from "./lib/useIsMobile.ts";
import "./index.css";

/** Phones get their own shell — a windowed desktop shrunk to 390px is nobody's idea of fun. */
const Root = () => {
  const isMobile = useIsMobile();
  const { today } = useSystemDate();

  /* Wind the clock back past João and the site has nobody to be about. */
  if (today < BIRTH_DATE) {
    return <Void />;
  }

  return (
    <>
      {isMobile ? (
        <MobileShell />
      ) : (
        <AppsProvider>
          <Desktop>
            <PortfolioWindow />
            <ProjectsWindow />
            <SnakeWindow />
          </Desktop>
        </AppsProvider>
      )}
      {/* Outside the branch so resizing across the breakpoint does not reboot. */}
      <BootScreen />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SystemDateProvider>
        <Root />
      </SystemDateProvider>
    </ThemeProvider>
  </StrictMode>,
);
