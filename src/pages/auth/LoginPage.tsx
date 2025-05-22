import { Form, Input, Button, Checkbox, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuthLoading,
  selectAuthError,
} from '../../store/slices/authSlice';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

/**
 * Login page component
 * Handles user authentication
 */
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  /**
   * Handle form submission
   */
  const onFinish = (values: LoginFormValues) => {
    dispatch(loginStart());

    // In a real app, you would make an API call here
    // This is a simulated login for demo purposes
    setTimeout(() => {
      if (values.email && values.password) {
        dispatch(
          loginSuccess({
            user: {
              id: '1',
              email: values.email,
              name: 'Demo User',
              role: 'user',
            },
            token: 'fake-jwt-token',
          }),
        );
      } else {
        dispatch(loginFailure('Please provide both email and password'));
      }
    }, 1000);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>Welcome Back</Title>
        <Text type="secondary">Sign in to your account</Text>
      </div>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your Email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="auth-form-forgot" href="">
              Forgot password?
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={loading}
            block
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <div className="auth-form-register">
        <Text type="secondary">
          Don't have an account? <Link to="/auth/register">Sign up</Link>
        </Text>
      </div>
    </div>
  );
};

export default LoginPage;
