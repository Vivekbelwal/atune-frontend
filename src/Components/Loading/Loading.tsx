import React from "react";
import { Spin, Row, Col, Typography, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Loading.css";

const { Text } = Typography;

interface LoadingProps {
  size?: "small" | "default" | "large";
  text?: string;
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
  centered?: boolean;
  minHeight?: number | string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "large",
  text = "Loading...",
  tip,
  spinning = true,
  children,
  centered = true,
  minHeight = "200px",
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // If children are provided, wrap them with Spin
  if (children) {
    return (
      <Spin
        spinning={spinning}
        size={size}
        tip={tip || text}
        indicator={size === "large" ? antIcon : undefined}
      >
        {children}
      </Spin>
    );
  }

  // Standalone loading component
  if (centered) {
    return (
      <Row
        justify="center"
        align="middle"
        className="loading-container"
        style={{ minHeight }}
      >
        <Col>
          <Space direction="vertical" align="center" size="middle">
            <Spin
              size={size}
              spinning={spinning}
              indicator={size === "large" ? antIcon : undefined}
            />
            {text && (
              <Text type="secondary" className="loading-text">
                {text}
              </Text>
            )}
          </Space>
        </Col>
      </Row>
    );
  }

  // Non-centered loading
  return (
    <Space direction="vertical" align="center" className="loading-inline">
      <Spin
        size={size}
        spinning={spinning}
        indicator={size === "large" ? antIcon : undefined}
      />
      {text && (
        <Text type="secondary" className="loading-text">
          {text}
        </Text>
      )}
    </Space>
  );
};

export default Loading;
