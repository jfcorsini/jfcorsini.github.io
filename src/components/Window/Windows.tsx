import React from 'react';
import { motion, useDragControls } from 'motion/react';
import styles from './Windows.module.css';

type Props = React.PropsWithChildren<{
  titleBar?: React.ReactNode;
}>

export const Windows = ({ children, titleBar }: Props) => {
  const dragControls = useDragControls();

  return (
    <motion.div 
      drag 
      dragControls={dragControls} 
      dragMomentum={false} 
      dragListener={false} 
      className={styles.container}
      style={{
        x: '-50%',
        y: '-50%',
        left: '50%',
        top: '50%',
      }}
    >
      <div className={styles.titleBar} onPointerDown={(e) => dragControls.start(e)}>
        <div className={styles.buttons}>
          <div className={styles.close}></div>
          <div className={styles.hide}></div>
          <div className={styles.resize}></div>
        </div>
        {titleBar}
      </div>
      {children}
    </motion.div>
  );
}