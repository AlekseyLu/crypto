import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";

import { News } from "../News";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { HomePage } from "../HomePage";
import { NotFound } from "../NotFound";
import { Exchanges } from "../Exchanges";
import { CryptoDetails } from "../CryptoDetails";
import { Cryptocurrencies } from "../Cryptocurrencies";

import styles from "./app.module.css";

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Layout>
    </div>
  );
};
