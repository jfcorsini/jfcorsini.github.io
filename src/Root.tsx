import { BootScreen } from "./components/Desktop/BootScreen.tsx";
import { Desktop } from "./components/Desktop/Desktop.tsx";
import { MobileShell } from "./components/Mobile/MobileShell.tsx";
import { NotesWindow } from "./components/NotesWindow/NotesWindow.tsx";
import { PortfolioWindow } from "./components/PortfolioWindow/index.tsx";
import { ProjectsWindow } from "./components/ProjectsWindow/ProjectsWindow.tsx";
import { SnakeWindow } from "./components/SnakeWindow/SnakeWindow.tsx";
import { Void } from "./components/Void/Void.tsx";
import { AppsProvider } from "./context/AppsProvider.tsx";
import { useSystemDate } from "./context/hooks.ts";
import { VISIBLE_APPS } from "./lib/apps.ts";
import { BIRTH_DATE } from "./lib/dateEntries.ts";
import { useIsMobile } from "./lib/useIsMobile.ts";

/** Phones get their own shell — a windowed desktop shrunk to 390px is nobody's idea of fun. */
export const Root = () => {
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
            {VISIBLE_APPS.includes("notes") && <NotesWindow />}
            <SnakeWindow />
          </Desktop>
        </AppsProvider>
      )}
      {/* Outside the branch so resizing across the breakpoint does not reboot. */}
      <BootScreen />
    </>
  );
};
