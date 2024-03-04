import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { News } from "../News";
import { MarketData } from "../MarketData";
import { Cryptocurrencies } from "../Cryptocurrencies";

import styles from "./homepage.module.css";

export const HomePage: FC = () => (
  <section className={styles.homepage}>
    <h2 className={styles.titleBlock}>Статистика рынка</h2>
    <MarketData />
    <div className={styles.titleContainer}>
      <h2 className={styles.titleBlock}>Топ 10 самый популярных криптовалют</h2>
      <Link to="/cryptocurrencies">
        <Button type="link" color="primery" size="large">
          Смотреть все
        </Button>
      </Link>
    </div>
    <Cryptocurrencies limit />

    <div className={styles.titleContainer}>
      <h2 className={styles.titleBlock}>Топ 10 новостей криптовалюты</h2>
      <Link to="/news">
        <Button type="link" color="primery" size="large">
          Смотреть все
        </Button>
      </Link>
    </div>
    <News limit />
  </section>
);
