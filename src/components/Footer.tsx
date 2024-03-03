import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/footer.module.css";

export const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <img src="/coinbase.png" alt="#" className={styles.logo} />
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            Обмен
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            Криптовалюта
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            Новости
          </Link>
        </li>
      </ul>
      <p>Разработано в 2024 году</p>
    </div>
  );
};
