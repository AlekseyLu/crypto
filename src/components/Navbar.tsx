import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import {
  BulbOutlined,
  CloseOutlined,
  HomeOutlined,
  LineChartOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";

import styles from "../styles/navbar.module.css";

export const Navbar: FC = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const closeMenu = () => setIsActiveMenu(false);

  return (
    <div className={styles.navbar}>
      <img src="/coinbase.png" alt="#" className={styles.logo} />
      <Button
        className={styles.burger}
        onClick={() => setIsActiveMenu((prev) => !prev)}
      >
        {isActiveMenu ? <CloseOutlined /> : <MenuOutlined />}
      </Button>
      <nav className={styles.nav + " " + (isActiveMenu && styles.active)}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink to="/" className={styles.link} onClick={closeMenu}>
              <HomeOutlined />
              Главная
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/exchanges"
              className={styles.link}
              onClick={closeMenu}
            >
              <LineChartOutlined />
              Обмен
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/cryptocurrencies"
              className={styles.link}
              onClick={closeMenu}
            >
              <MoneyCollectOutlined />
              Криптовалюта
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/news" className={styles.link} onClick={closeMenu}>
              <BulbOutlined />
              Новости
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
