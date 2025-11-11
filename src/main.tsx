import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Desktop } from './components/Desktop/Desktop.tsx'
import { PortfolioWindow } from './components/PortfolioWindow'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Desktop />
    <PortfolioWindow />
  </StrictMode>,
)
