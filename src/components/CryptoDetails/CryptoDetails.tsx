import { Link, useParams } from "react-router-dom";
import { Divider, Row } from "antd";
import {
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  NumberOutlined,
  RedditOutlined,
  ThunderboltOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import { Loading } from "../Loading";
import { LineChart } from "../LineChart";

import { ICryptos } from "../../types/cryptos.type";

import { useGetCoinDetailsQuery } from "../../store/slices/cryptoApi";

import styles from "./cryptodetails.module.css";

export const CryptoDetails = () => {
  const { id } = useParams();

  const { data: coinDetailsDate, isFetching } = useGetCoinDetailsQuery(id);

  const coinDetails: ICryptos = coinDetailsDate;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${new Intl.NumberFormat("eu-EU", {
        style: "currency",
        currency: "USD",
      }).format(coinDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: new Intl.NumberFormat("eu-EU", {
        style: "currency",
        currency: "USD",
      }).format(coinDetails?.volume),
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: new Intl.NumberFormat("eu-EU", {
        style: "currency",
        currency: "USD",
      }).format(coinDetails?.marketCap),
      icon: <DollarCircleOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Общий объем поставок",
      value: coinDetails?.totalSupply,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Изменения за 1 час",
      value: coinDetails?.priceChange1h,
      icon: <LineChartOutlined />,
    },
    {
      title: "Изменения за за 1 день",
      value: coinDetails?.priceChange1d,
      icon: <LineChartOutlined />,
    },
    {
      title: "Изменения за 1 неделю",
      value: coinDetails?.priceChange1w,
      icon: <LineChartOutlined />,
    },
  ];

  const infoSource = [
    {
      name: "Reddit",
      link: coinDetails?.redditUrl,
      icon: <RedditOutlined />,
    },
    {
      name: "Twitter",
      link: coinDetails?.twitterUrl,
      icon: <TwitterOutlined />,
    },
    {
      name: coinDetails?.name,
      link: coinDetails?.websiteUrl,
      icon: (
        <img
          src={coinDetails?.icon}
          alt={coinDetails?.name}
          style={{ width: "14px" }}
        />
      ),
    },
  ];

  if (isFetching) return <Loading />;

  return (
    <section className={styles.cryptoDetailsContainer}>
      <h2 className={styles.title}>
        {coinDetails?.rank}. {coinDetails?.name} ({coinDetails?.symbol})
      </h2>
      <p className={styles.text}>График отображения изменинй цены в долларах</p>
      <Divider />
      <div className={styles.subtitleContainer}>
        <h3 className={styles.subtitle}>График цен {coinDetails?.name}</h3>
        <h3 className={styles.subtitle}>
          Текущая цена {coinDetails?.name}:
          {new Intl.NumberFormat("us-US", {
            style: "currency",
            currency: "USD",
          }).format(Number(coinDetails?.price))}
        </h3>
      </div>
      {!isFetching && (
        <Row style={{ marginBottom: "20px" }} align="middle" justify="center">
          <LineChart />
        </Row>
      )}
      <div className={styles.infoContainer}>
        <div className={styles.infoBlock}>
          <div className={styles.titleContainer}>
            <h3 className={styles.subtitle}>
              Детальная статистика {coinDetails?.name}
            </h3>
            <p className={styles.text}>
              Обзор, показывающий статистику {coinDetails?.name}, такую как
              базовая валюта и валюта котировки, рейтинг и объем торгов.
            </p>
          </div>
          <ul className={styles.infoList}>
            {stats.map(({ title, value, icon }) => (
              <li className={styles.coinStatsItem} key={title}>
                <div className={styles.coinStatsName}>
                  <span>{icon}</span>
                  <span>{title}</span>
                </div>
                <strong className={styles.stats}>{value}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.titleContainer}>
            <h3 className={styles.subtitle}>Информация другой статистики</h3>
            <p className={styles.text}>
              Обзор, показывающий статистику {coinDetails.name}, такую как объем
              поставок и изменение цены за время.
            </p>
          </div>
          <ul className={styles.infoList}>
            {genericStats.map(({ icon, title, value }) => (
              <li className={styles.coinStatsItem} key={title}>
                <div className={styles.coinStatsName}>
                  <span>{icon}</span>
                  <span>{title}</span>
                </div>
                <strong
                  className={
                    styles.stats +
                    " " +
                    (Number(value) > 0 ? styles.up : styles.down)
                  }
                >
                  {value}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.infoBlock}>
        <h3 className={styles.subtitle}>
          Источники информации {coinDetails.name}
        </h3>
        <ul className={styles.sourceContainer}>
          {infoSource?.map(({ icon, link, name }) => (
            <li key={name}>
              <Link to={link} target="_blanck" className={styles.coinStatsName}>
                {icon}
                <span className={styles.sourceName}>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
