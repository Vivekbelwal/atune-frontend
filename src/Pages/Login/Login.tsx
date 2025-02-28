import { Button, Form, Input, message } from "antd";
import "./Login.css";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Api";
import { handleApiError } from "../../Api/common/apiHelpers";

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFinish = useCallback(
    async (values: { email: string; password: string }) => {
      setLoading(true);
      try {
        const response = await Auth.Login(values);
        localStorage.setItem("accessToken", response.signIn.token);
        message.success("Login successful!");
        navigate("/");
      } catch (error) {
        const errorMsg = handleApiError(error);
        message.error(errorMsg);
      }
      setLoading(false);
    },
    [navigate]
  );

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <Form
        name="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="login-form"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="signup-link">
        <a href="/signup">Don't have an account? Sign up here</a>
      </div>
    </div>
  );
}

export default Login;
