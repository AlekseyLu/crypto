import { useState } from "react";
import { useParams } from "react-router-dom";
import { Select } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useGetCoinDetailsTimestampQuery } from "../store/slices/cryptoApi";

import { Loading } from ".";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const periods = [
  { value: "all", label: "За всё время" },
  { value: "1m", label: "За 1 месяц" },
  { value: "1y", label: "За 1 год" },
  { value: "6m", label: "За 6 месяцев" },
  { value: "3m", label: "За 3 месяца" },
  { value: "1w", label: "За 1 неделю" },
  { value: "24h", label: "За 24 часа" },
];

export const LineChart = () => {
  const { id } = useParams();
  const [timestamp, setTimestamp] = useState("24h");
  const { data: coinDetailsTimestamp, isFetching } =
    useGetCoinDetailsTimestampQuery({
      id: id,
      timestamp,
    });

  const coinPrice: string[] = [];
  const coinTimestamp: string[] = [];

  if (!isFetching) {
    for (let i = 0; i < coinDetailsTimestamp.length; i++) {
      coinPrice.push(coinDetailsTimestamp[i][1]);
    }

    for (let i = 0; i < coinDetailsTimestamp.length; i++) {
      coinTimestamp.push(
        new Date(coinDetailsTimestamp[i][0] * 1000).toLocaleDateString()
      );
    }
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    showLine: true,
    pointStyle: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const onChange = (value: string) => {
    setTimestamp(value);
  };

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <Select
            placeholder="Выберете период"
            optionFilterProp="children"
            defaultValue={timestamp}
            onChange={onChange}
            options={periods}
            style={{
              minWidth: "200px",
              maxWidth: "max-content",
              marginBottom: "20px",
            }}
          />
          <Line options={options} data={data} />
        </>
      )}
    </>
  );
};
