import { Link } from "react-router-dom";

import styles from "./notfound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <h1 className={styles.title}>4 0 4</h1>
      <p className={styles.text}>Такая страница не найдена</p>
      <Link to="/" className={styles.backHome}>
        На главную
      </Link>
    </div>
  );
};
