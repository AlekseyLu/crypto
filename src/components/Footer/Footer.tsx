import { Link } from "react-router-dom";

import LOGO from "/coinbase.png";

import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <img src={LOGO} alt="Логотип 'coinbase'" className={styles.logo} />
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/exchanges" className={styles.link}>
            Обмен
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/cryptocurrencies" className={styles.link}>
            Криптовалюта
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/news" className={styles.link}>
            Новости
          </Link>
        </li>
      </ul>
      <p>Разработано в 2024 году</p>
    </div>
  );
};
