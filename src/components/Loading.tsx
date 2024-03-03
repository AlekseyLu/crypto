import { FC } from "react";

import styles from "../styles/Loading.module.css";

export const Loading: FC = () => {
  return (
    <div className={styles.loadContainer}>
      <h2 className={styles.loadTitle}>loading...</h2>
    </div>
  );
};
