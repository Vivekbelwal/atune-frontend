import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./Signup.css"; // Import the CSS file for styling
import { Auth } from "../../Api";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../Api/common/apiHelpers";

interface SignupFormValues {
  email: string;
  name: string;
  password: string;
}

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: SignupFormValues) => {
    setLoading(true);
    try {
      const response = await Auth.SignUp({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("accessToken", response.signUp.token);
      message.success("Singup successful!");
      navigate("/");
    } catch (error) {
      const errorMsg = handleApiError(error);
      message.error(errorMsg);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="signup-form"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="signup-button"
          >
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
