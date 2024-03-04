import { Link } from "react-router-dom";

import { Loading } from "../Loading";

import { useGetExchangesQuery } from "../../store/slices/exchangesApi";

import { IEchanges } from "../../types/exchanges.type";

import styles from "./exhanges.module.css";

export const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery("");
  const exchanges: IEchanges[] = data
    ?.filter((item) => item.rank < 11)
    .sort((a, b) => (a.rank > b.rank ? 1 : -1));

  if (isFetching) return <Loading />;

  console.log(exchanges);

  return (
    <section className={styles.exchanges}>
      <h2 className={styles.title}>Список доступных бирж для обмена</h2>
      <ul className={styles.list}>
        {exchanges?.map((elem) => (
          <li className={styles.item} key={elem.id}>
            <Link to={elem.url} className={styles.link} target="_blanck">
              <img src={elem.icon} alt={elem.name} className={styles.logo} />
              <h3 className={styles.name}>
                #{elem.rank} {elem.name}
              </h3>
              <ul className={styles.dataList}>
                <li className={styles.dataItem}>
                  <span className={styles.subtitle}>Изменения за 24 часа:</span>
                  <strong
                    className={
                      styles.text +
                      " " +
                      (elem.change24h > 0 ? styles.up : styles.down)
                    }
                  >
                    {elem.change24h}
                  </strong>
                </li>
                <li>
                  <span className={styles.subtitle}>Объем за 24 часа:</span>
                  <strong className={styles.text}>
                    {new Intl.NumberFormat("us-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(Number(elem.volume24h))}
                  </strong>
                </li>
                <li>
                  <span className={styles.subtitle}>Объем за неделю:</span>
                  <strong className={styles.text}>
                    {new Intl.NumberFormat("us-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(Number(elem.volume7d))}
                  </strong>
                </li>
                <li>
                  <span className={styles.subtitle}>Объем за месяц:</span>
                  <strong className={styles.text}>
                    {new Intl.NumberFormat("us-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(Number(elem.volume1m))}
                  </strong>
                </li>
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
