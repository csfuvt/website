import React, { ReactNode } from 'react';
import styles from './KHoverTip.module.css';

interface TooltipProps {
  children: ReactNode;
  description: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, description }) => {
  return (
    <div className={styles.tooltipContainer}>
      {children}
      <div className={styles.tooltipText}>{description}</div>
    </div>
  );
};

export default Tooltip;
