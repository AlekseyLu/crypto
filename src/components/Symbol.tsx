import { Card, Col, Typography } from "antd";
import { Link } from "react-router-dom";

export const Symbol = ({ symbol }) => {
  return (
    <Col span={8}>
      <Link to={`${symbol?.symbol}`}>
        <Card title={symbol?.baseAsset} hoverable>
          <Typography.Text>{symbol?.symbol}</Typography.Text>
        </Card>
      </Link>
    </Col>
  );
};
