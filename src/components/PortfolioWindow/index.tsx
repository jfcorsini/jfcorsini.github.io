import { Windows } from "../Window";
import { WindowUrlTitleBar } from "../Window/WindowsUrlTitleBar";
import { PortfolioWindowContent } from "./PortfolioWindowContent";

export const PortfolioWindow = () => {
  return (
    <Windows name="portfolio">
      <Windows.TitleBar>
        <WindowUrlTitleBar url="jfcorsini.com" iconName="LockClosed" />
      </Windows.TitleBar>
      <Windows.Content>
        <PortfolioWindowContent />
      </Windows.Content>
    </Windows>
  );
};
