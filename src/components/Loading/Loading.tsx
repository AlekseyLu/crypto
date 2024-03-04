import styles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.loadContainer}>
      <h2 className={styles.loadTitle}>loading...</h2>
    </div>
  );
};
