import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Input } from "antd";

import { Loading } from "../Loading";

import { useGetCryproCoinsQuery } from "../../store/slices/cryptoApi";

import { ICryptos } from "../../types/cryptos.type";

import styles from "./cryptocurrencies.module.css";

interface IProps {
  limit?: boolean;
}

export const Cryptocurrencies: FC<IProps> = ({ limit }) => {
  const checked = limit ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryproCoinsQuery(checked);

  const [onSearch, setOnSearch] = useState("");
  const [cryptos, setCryptos] = useState<ICryptos[]>([]);

  useEffect(() => {
    setCryptos(cryptosList?.result);

    const filtredCryptos = cryptosList?.result.filter((item) =>
      item.name.toLocaleLowerCase().includes(onSearch.toLocaleLowerCase())
    );

    setCryptos(filtredCryptos);
  }, [onSearch, cryptosList]);

  if (isFetching) return <Loading />;

  return (
    <div className={styles.wrapp}>
      {checked > 10 && (
        <>
          <h2 className={styles.tops}>Топ 100 криптовалют на рынке</h2>
          <Input
            placeholder="Введите название"
            allowClear
            onChange={({ target }) => setOnSearch(target.value)}
            className={styles.search}
          />
        </>
      )}
      <ul className={styles.list}>
        {cryptos?.map((current) => (
          <li key={current.id} className={styles.item}>
            <Link
              to={`/cryptocurrencies/${current.id}`}
              className={styles.link}
            >
              <div className={styles.headContainer}>
                <Avatar src={current.icon} />
                <h2 className={styles.headName}>
                  {current.rank}. {current.name}
                </h2>
              </div>
              <div className={styles.titleContainer}>
                <h3 className={styles.titleBlock}>Цена:</h3>
                <span className={styles.descr}>
                  {new Intl.NumberFormat("us-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(current.price))}
                </span>
              </div>
              <div className={styles.titleContainer}>
                <h3 className={styles.titleBlock}>Рыночная капитализация:</h3>
                <span className={styles.descr}>
                  {new Intl.NumberFormat("us-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(current.marketCap))}
                </span>
              </div>
              <div className={styles.titleContainer}>
                <h3 className={styles.titleBlock}>Изменения за 24 часа:</h3>
                <span
                  className={
                    styles.descr +
                    " " +
                    (current.priceChange1h > 0 ? styles.lift : styles.down)
                  }
                >
                  {current.priceChange1h}%
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
