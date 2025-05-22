import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuthLoading,
  selectAuthError,
} from '../../store/slices/authSlice';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const onFinish = (values: {
    name: string;
    email: string;
    password: string;
    confirm: string;
    agreement: boolean;
  }) => {
    dispatch(loginStart());

    // In a real app, you would make an API call here
    // For demo purposes, we'll simulate a successful registration after a delay
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: {
            id: '1',
            email: values.email,
            name: values.name,
            role: 'user',
          },
          token: 'fake-jwt-token',
        }),
      );
    }, 1000);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>Create an Account</Title>
        <Text type="secondary">Join our platform today</Text>
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
        name="register"
        initialValues={{ agreement: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('You must accept the agreement')),
            },
          ]}
        >
          <Checkbox>
            I agree to the <a href="">Terms of Service</a> and{' '}
            <a href="">Privacy Policy</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={loading}
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>

      <div className="auth-form-register">
        <Text type="secondary">
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </Text>
      </div>
    </div>
  );
};

export default RegisterPage;
