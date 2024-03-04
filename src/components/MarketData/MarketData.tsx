import { Statistic } from "antd";

import { Loading } from "../Loading";

import { IMarketData } from "../../types/marketData.type";

import { useGetMarketDataQuery } from "../../store/slices/marketDataApi";

import styles from "./marketData.module.css";

export const MarketData = () => {
  const { data: marketData, isFetching } = useGetMarketDataQuery("");
  const markets: IMarketData = marketData;

  if (isFetching) return <Loading />;

  return (
    <ul className={styles.statsList}>
      <li className={styles.statsItem}>
        <Statistic
          title="Рыночная капитолизация:"
          value={markets.marketCap}
          prefix="$"
        />
      </li>
      <li className={styles.statsItem}>
        <Statistic
          title="Изменения рыночной капитолизации:"
          value={markets.marketCapChange}
          suffix="%"
        />
      </li>
      <li className={styles.statsItem}>
        <Statistic
          title="Объем криптовалют"
          value={markets.volume}
          prefix="$"
        />
      </li>
      <li className={styles.statsItem}>
        <Statistic
          title="Изменения объема криптовалюты"
          value={markets.volumeChange}
          suffix="%"
        />
      </li>
    </ul>
  );
};
