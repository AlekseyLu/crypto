import { FC } from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import LOGO from "../../public/coinbase.png";

import styles from "../styles/header.module.css";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <img src={LOGO} alt="logo" />
      <Button>
        <MenuOutlined />
      </Button>
    </header>
  );
};
