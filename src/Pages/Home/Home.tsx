import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Layout, Button, Menu } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import logo from "/logo.svg"; // Using the SVG logo from public folder

const { Header, Sider, Content } = Layout;

function Home() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    if (!localStorage.accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  // Handle logout functionality
  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();
    // Reload the page
    window.location.reload();
  };

  // Handle menu item selection
  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  // Toggle sider collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Menu items
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "My Profile",
    },
    {
      key: "2",
      icon: <FileTextOutlined />,
      label: "My Blogs",
    },
  ];

  // Render content based on selected menu item
  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <div style={{ padding: "24px", minHeight: "360px" }}>
            <h2>My Profile Page</h2>
          </div>
        );
      case "2":
        return (
          <div style={{ padding: "24px", minHeight: "360px" }}>
            <h2>My Blogs</h2>
          </div>
        );
      default:
        return (
          <div style={{ padding: "24px", minHeight: "360px" }}>
            <h2>Welcome to Atune</h2>
          </div>
        );
    }
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Keep the original header completely unchanged */}
        <Header className="header">
          <div className="Logo">
            <img src={logo} alt="Atune Logo" style={{ height: "40px" }} />
          </div>
          <div className="logout">
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>

        {/* Content area below header with sider */}
        <Layout style={{ height: "calc(100vh - 64px)" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={250}
            collapsedWidth={80}
            style={{
              background: "#f0f2f5",
              borderRight: "1px solid #d9d9d9",
              position: "relative",
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{
                height: "calc(100% - 50px)",
                borderRight: 0,
                background: "transparent",
              }}
            />

            {/* Toggle button at bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "12px",
                borderTop: "1px solid #d9d9d9",
                textAlign: "center",
                background: "#f0f2f5",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                onClick={toggleCollapsed}
                style={{
                  fontSize: "14px",
                  width: collapsed ? "100%" : "auto",
                  minWidth: "32px",
                  height: "32px",
                }}
              />
            </div>
          </Sider>

          <Content
            style={{
              background: "#fff",
              margin: 0,
              overflow: "auto",
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
