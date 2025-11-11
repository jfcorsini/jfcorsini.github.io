import styles from './PortfolioWindow.module.css'

export const PortfolioWindowTitleBar = () => {
  return (
    <div className={styles.addressBar}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27c93f" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      <span>jfcorsini.com</span>
  </div>
  );
}