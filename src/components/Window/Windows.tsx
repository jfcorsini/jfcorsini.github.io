import React, { useState } from 'react';
import { motion, useDragControls } from 'motion/react';
import styles from './Windows.module.css';

type Props = React.PropsWithChildren<{
  titleBar?: React.ReactNode;
}>

export const Windows = ({ children, titleBar }: Props) => {
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <motion.div 
      drag={!isMaximized}
      dragControls={dragControls} 
      dragMomentum={false} 
      dragListener={false} 
      className={styles.container}
      initial={false}
      animate={{
        x: isMaximized ? 0 : '-50%',
        y: isMaximized ? 0 : '-50%',
        left: isMaximized ? 0 : '50%',
        top: isMaximized ? 0 : '50%',
        width: isMaximized ? '100vw' : '900px',
        height: isMaximized ? '100vh' : '600px',
        borderRadius: isMaximized ? 0 : 'var(--border-radius)',
      }}
      transition={{
        type: 'spring',
        damping: 50,
        stiffness: 600,
        mass: 2,
      }}
    >
      <div className={styles.titleBar} onPointerDown={(e) => dragControls.start(e)}>
        <div className={styles.buttons}>
          <div className={styles.close}></div>
          <div className={styles.hide}></div>
          <div onClick={() => setIsMaximized(!isMaximized)} className={styles.resize}></div>
        </div>
        {titleBar}
      </div>
      {children}
    </motion.div>
  );
}