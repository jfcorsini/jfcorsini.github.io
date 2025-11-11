import { Windows } from '../Window/Windows'
import { PortfolioWindowTitleBar } from './PortfolioWindowTitleBar'
import { PortfolioWindowContent } from './PortfolioWindowContent'

export const PortfolioWindow = () => {
  return (
    <Windows name="portfolio" titleBar={<PortfolioWindowTitleBar />}>
      <PortfolioWindowContent />
    </Windows>
  )
}