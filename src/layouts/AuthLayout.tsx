import { Outlet, Navigate } from 'react-router-dom';
import { Card } from 'antd';
import { useAppSelector } from '../store';
import { selectIsAuthenticated } from '../store/slices/authSlice';

/**
 * Authentication layout component
 * Provides layout for login and registration pages
 * Redirects to dashboard if user is already authenticated
 */
const AuthLayout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-container">
      <Card className="auth-card" bordered={false}>
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout;
