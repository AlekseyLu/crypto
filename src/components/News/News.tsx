import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Typography } from "antd";

import { INews } from "../../types/news.type";

import { useGetCryptoNewsQuery } from "../../store/slices/newsApi";

import styles from "./news.module.css";

const { Title } = Typography;

interface IProps {
  limit?: boolean;
}

export const News: FC<IProps> = ({ limit }) => {
  const checked = limit ? 10 : 100;
  const { data, isLoading } = useGetCryptoNewsQuery(checked);

  const [onSearch, setOnSearch] = useState("");
  const [posts, setPosts] = useState<INews[]>([]);

  useEffect(() => {
    setPosts(data?.result);

    const filtredPosts = data?.result.filter((item: INews) =>
      item.title.toLocaleLowerCase().includes(onSearch.toLocaleLowerCase())
    );

    setPosts(filtredPosts);
  }, [data, onSearch]);

  if (isLoading)
    return (
      <div className={styles.loadContainer}>
        <h2 className={styles.loadTitle}>loading...</h2>
      </div>
    );

  return (
    <div className={styles.newsWrapp}>
      {checked > 10 && (
        <>
          <Title level={2}>Топ 100 новостей криптовалюты</Title>
          <Input
            placeholder="Введите название"
            allowClear
            value={onSearch}
            onChange={({ target }) => setOnSearch(target.value)}
            className={styles.search}
          />
        </>
      )}
      <ul className={styles.newsList}>
        {posts?.map((post) => (
          <li key={post.id} className={styles.newsItem}>
            <Link to={post.link} target="_blanck" className={styles.link}>
              <img src={post.imgUrl} className={styles.image} />
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <div className={styles.cardBottom}>
                <span className={styles.date}>
                  {new Date(post.feedDate).toDateString()}
                </span>
                <span className={styles.source}>{post.source}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
