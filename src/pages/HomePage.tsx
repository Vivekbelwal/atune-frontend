import { Link } from 'react-router-dom';
import { Typography, Row, Col, Card, Button, Space, Divider } from 'antd';
import {
  RocketOutlined,
  AppstoreOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const HomePage = () => {
  return (
    <div className="container-custom">
      <Row
        gutter={[24, 48]}
        align="middle"
        style={{ marginTop: 48, marginBottom: 48 }}
      >
        <Col xs={24} md={12}>
          <Title>Welcome to ATune</Title>
          <Paragraph style={{ fontSize: 16 }}>
            A highly scalable React application with modern architecture, built
            with React, Redux, TypeScript, and Ant Design.
          </Paragraph>
          <Space size="middle">
            <Button type="primary" size="large">
              <Link to="/auth/login">Get Started</Link>
            </Button>
            <Button size="large">
              <Link to="/about">Learn More</Link>
            </Button>
          </Space>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            alt="Hero"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
      </Row>

      <Divider />

      <Title level={2} style={{ textAlign: 'center', margin: '40px 0' }}>
        Key Features
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={
              <div style={{ padding: 24, textAlign: 'center', fontSize: 48 }}>
                <RocketOutlined style={{ color: '#1890ff' }} />
              </div>
            }
          >
            <Meta
              title="Modern Stack"
              description="Built with React 19, Redux Toolkit, TypeScript, and Ant Design for a modern development experience."
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={
              <div style={{ padding: 24, textAlign: 'center', fontSize: 48 }}>
                <AppstoreOutlined style={{ color: '#1890ff' }} />
              </div>
            }
          >
            <Meta
              title="Scalable Architecture"
              description="Organized with a scalable folder structure and modular components for maintainability as your application grows."
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={
              <div style={{ padding: 24, textAlign: 'center', fontSize: 48 }}>
                <ThunderboltOutlined style={{ color: '#1890ff' }} />
              </div>
            }
          >
            <Meta
              title="Performance Focused"
              description="Optimized for performance with code splitting, lazy loading, and efficient state management."
            />
          </Card>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', margin: '48px 0' }}>
        <Button type="primary" size="large">
          <Link to="/auth/register">Join Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
