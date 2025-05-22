import { Outlet, Navigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../store';
import {
  selectIsAuthenticated,
  selectUser,
  logout,
} from '../store/slices/authSlice';

const { Content, Sider } = Layout;

/**
 * Dashboard layout component
 * Provides layout for dashboard pages with sidebar navigation
 * Redirects to login if user is not authenticated
 */
const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const { token } = theme.useToken();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  // Menu items for the sidebar
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Sider
        width={250}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        {/* User profile section */}
        <div
          style={{
            padding: '24px 16px',
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: token.colorPrimary,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                margin: '0 auto',
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div style={{ marginTop: 8, fontWeight: 'bold' }}>{user?.name}</div>
            <div style={{ fontSize: 12, color: token.colorTextSecondary }}>
              {user?.email}
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{ borderRight: 0 }}
          items={menuItems}
        />
      </Sider>

      {/* Main content area */}
      <Layout style={{ padding: '24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            background: token.colorBgContainer,
            borderRadius: token.borderRadius,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
