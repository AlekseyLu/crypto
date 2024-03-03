import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";

import {
  Navbar,
  HomePage,
  Footer,
  Cryptocurrencies,
  News,
  CryptoDetails,
  Exchanges,
} from "./components";

import styles from "./styles/app.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <Navbar />
      <Layout className={styles.main}>
        <div className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/cryptocurrencies/:id" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
        <Footer />
      </Layout>
    </div>
  );
};
