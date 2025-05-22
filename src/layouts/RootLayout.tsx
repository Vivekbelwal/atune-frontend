import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { useAppSelector } from '../store';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import type { MenuProps } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

/**
 * Root layout component
 * Provides the main application layout with header, content, and footer
 */
const RootLayout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentYear = new Date().getFullYear();

  // Build menu items based on authentication status
  const menuItems: MenuItem[] = [
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
    },
  ];

  if (isAuthenticated) {
    menuItems.push({
      key: 'dashboard',
      label: <Link to="/dashboard">Dashboard</Link>,
    });
  } else {
    menuItems.push({
      key: 'login',
      label: <Link to="/auth/login">Login</Link>,
    });
    menuItems.push({
      key: 'register',
      label: <Link to="/auth/register">Register</Link>,
    });
  }

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" />
        <Title level={4} style={{ margin: 0, color: 'white' }}>
          ATune
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[]}
          style={{ marginLeft: 'auto' }}
          items={menuItems}
        />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        ATune ©{currentYear} Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default RootLayout;
