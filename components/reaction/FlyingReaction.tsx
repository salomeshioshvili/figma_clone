import React from "react";
import styles from "./index.module.css";

type Props = {
  x: number;
  y: number;
  timestamp: number;
  value: string;
};

const FlyingReaction = ({ x, y, timestamp, value }: Props) => (
  <div
    className={`pointer-events-none fixed select-none ${styles.disappear} text-${
      (timestamp % 5) + 2
    }xl ${styles["goUp" + (timestamp % 3)]}`}
    style={{ 
      left: `${x}px`, 
      top: `${y}px`,
      transform: 'translate(-50%, -50%)' 
    }}
  >
    <div className={styles["leftRight" + (timestamp % 3)]}>
      <div>{value}</div>
    </div>
  </div>
);

export default FlyingReaction;