import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Desktop } from './components/Desktop/Desktop.tsx'
import { PortfolioWindow } from './components/PortfolioWindow'
import { WindowsProvider } from './context/WindowsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WindowsProvider>
      <Desktop />
      <PortfolioWindow />
    </WindowsProvider>
  </StrictMode>,
)
