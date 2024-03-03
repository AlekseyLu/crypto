import { Link, useParams } from "react-router-dom";
import { Col, Divider, Row, Typography } from "antd";
import {
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  NumberOutlined,
  RedditOutlined,
  ThunderboltOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import { LineChart, Loading } from ".";

import { ICryptos } from "../types/cryptos.type";

import { useGetCoinDetailsQuery } from "../store/slices/cryptoApi";

import styles from "../styles/cryptodetails.module.css";

const { Title, Text } = Typography;

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
    <div style={{ color: "#333", padding: "20px" }}>
      <Row justify="center">
        <Title level={2}>
          {coinDetails?.rank}. {coinDetails?.name} ({coinDetails?.symbol})
        </Title>
      </Row>
      <Row justify="center">
        <Text>График отображения изменинй цены в долларах</Text>
      </Row>
      <Divider />
      <Row justify="space-between" align="middle" style={{ margin: "20px 0" }}>
        <Title level={3} style={{ margin: "0" }}>
          График цен {coinDetails?.name}
        </Title>
        <Title level={3} style={{ margin: "0" }}>
          Текущая цена {coinDetails?.name}:
          {new Intl.NumberFormat("us-US", {
            style: "currency",
            currency: "USD",
          }).format(Number(coinDetails?.price))}
        </Title>
      </Row>
      {!isFetching && (
        <Row style={{ marginBottom: "20px" }} align="middle" justify="center">
          <LineChart />
        </Row>
      )}
      <Row className={styles.infoContainer}>
        <Col style={{ padding: "10px" }}>
          <Col>
            <Title level={3}>Детальная статистика {coinDetails?.name}</Title>
            <p>
              Обзор, показывающий статистику {coinDetails?.name}, такую как
              базовая валюта и валюта котировки, рейтинг и объем торгов.
            </p>
          </Col>
          {stats.map(({ title, value, icon }) => (
            <Col className={styles.coinStats} key={title}>
              <Col className={styles.coinStatsName}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className={styles.stats}>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col style={{ padding: "10px" }}>
          <Col className={styles.coinValueStatisticsHeading}>
            <Title level={3}>Информация другой статистики</Title>
            <p>
              Обзор, показывающий статистику {coinDetails.name}, такую как объем
              поставок и изменение цены за время.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className={styles.coinStats} key={title}>
              <Col className={styles.coinStatsName}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className={styles.stats}>{value}</Text>
            </Col>
          ))}
        </Col>
      </Row>
      <Row justify="space-evenly" align="middle">
        <Col
          className={styles.coinValueStatisticsHeading}
          span={24}
          style={{ textAlign: "center" }}
        >
          <Title level={3}>Источники информации {coinDetails.name}</Title>
        </Col>
        {infoSource?.map(({ icon, link, name }) => (
          <Link
            to={link}
            target="_blanck"
            className={styles.coinStatsName}
            key={name}
          >
            {icon}
            <Text>{name}</Text>
          </Link>
        ))}
      </Row>
    </div>
  );
};
