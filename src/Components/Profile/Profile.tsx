import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Descriptions,
  Button,
  message,
  Alert,
  Space,
  Row,
  Col,
  Divider,
  Result,
  Modal,
} from "antd";
import { UserOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { useUser } from "../../contexts/UserContext";
import Loading from "../Loading";
import UserEditForm from "../UserEditForm";
import "./Profile.css";

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const { user, loading, error, fetchUser } = useUser();
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    // Always try to fetch user data when Profile component mounts
    // This ensures we get fresh data after login
    if (!user && !loading) {
      fetchUser();
    }
  }, []);

  const handleRetry = () => {
    fetchUser();
  };

  const handleEditProfile = () => {
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    message.success("Profile updated successfully!");
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Loading
        size="large"
        text="Loading profile..."
        minHeight="400px"
        centered={true}
      />
    );
  }

  if (error) {
    // If the error is about no access token, treat it as not logged in
    if (error.includes("No access token found")) {
      return (
        <Row justify="center" style={{ padding: "24px" }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            <Result
              status="warning"
              title="Please Log In"
              subTitle="You need to be logged in to view your profile."
              extra={
                <Button type="primary" href="/login">
                  Go to Login
                </Button>
              }
            />
          </Col>
        </Row>
      );
    }

    // For other errors, show the error with retry option
    return (
      <Row justify="center" style={{ padding: "24px" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Alert
            message="Error Loading Profile"
            description={error}
            type="error"
            showIcon
            action={
              <Button
                size="small"
                danger
                onClick={handleRetry}
                icon={<ReloadOutlined />}
              >
                Retry
              </Button>
            }
          />
        </Col>
      </Row>
    );
  }

  if (!user) {
    return (
      <Row justify="center" style={{ padding: "24px" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Result
            status="404"
            title="No Profile Data Available"
            subTitle="Please log in again to load your profile information."
            extra={
              <Space>
                <Button
                  type="primary"
                  onClick={handleRetry}
                  icon={<ReloadOutlined />}
                >
                  Load Profile
                </Button>
                <Button href="/login">Go to Login</Button>
              </Space>
            }
          />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row justify="center" style={{ padding: "24px" }}>
        <Col xs={24} sm={22} md={20} lg={16} xl={14}>
          <Card
            className="profile-card"
            actions={[
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>,
              <Button
                key="refresh"
                type="text"
                icon={<ReloadOutlined />}
                onClick={handleRetry}
              >
                Refresh
              </Button>,
            ]}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Profile Header */}
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={6} style={{ textAlign: "center" }}>
                  <Avatar
                    size={80}
                    src={user.avatar?.url}
                    icon={<UserOutlined />}
                    className="profile-avatar"
                  />
                </Col>
                <Col xs={24} sm={18}>
                  <Space direction="vertical" size="small">
                    <Title level={2} style={{ margin: 0 }}>
                      {user.name}
                    </Title>
                    <Text type="secondary" style={{ fontSize: "16px" }}>
                      {user.email}
                    </Text>
                  </Space>
                </Col>
              </Row>

              <Divider />

              {/* Profile Details */}
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Title level={4}>Profile Information</Title>
                <Descriptions
                  bordered
                  column={1}
                  size="middle"
                  labelStyle={{ fontWeight: "bold", width: "150px" }}
                >
                  <Descriptions.Item label="Full Name">
                    <Text strong>{user.name}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Email Address">
                    <Text copyable>{user.email}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="User ID">
                    <Text code copyable>
                      {user.id}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Member Since">
                    <Text>{formatDate(user.createdAt)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Updated">
                    <Text>{formatDate(user.updatedAt)}</Text>
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        open={editModalOpen}
        onCancel={handleEditCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <UserEditForm
          onSuccess={handleEditSuccess}
          onCancel={handleEditCancel}
        />
      </Modal>
    </>
  );
};

export default Profile;
