import { Windows } from "../Window/Windows";
import { PortfolioWindowContent } from "./PortfolioWindowContent";
import { PortfolioWindowTitleBar } from "./PortfolioWindowTitleBar";

export const PortfolioWindow = () => {
  return (
    <Windows name="portfolio" titleBar={<PortfolioWindowTitleBar />}>
      <PortfolioWindowContent />
    </Windows>
  );
};
