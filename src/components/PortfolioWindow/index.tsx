import { Windows } from "../Window";
import { PortfolioWindowContent } from "./PortfolioWindowContent";
import { PortfolioWindowTitleBar } from "./PortfolioWindowTitleBar";

export const PortfolioWindow = () => {
  return (
    <Windows name="portfolio">
      <Windows.TitleBar>
        <PortfolioWindowTitleBar />
      </Windows.TitleBar>
      <Windows.Content>
        <PortfolioWindowContent />
      </Windows.Content>
    </Windows>
  );
};
