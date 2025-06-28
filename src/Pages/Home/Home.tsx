import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Layout, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { LogoutOutlined } from "@ant-design/icons";
import logo from "/logo.svg"; // Using the SVG logo from public folder

function Home() {
  const navigate = useNavigate();

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

  return (
    <>
      <Layout>
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
      </Layout>
    </>
  );
}

export default Home;
