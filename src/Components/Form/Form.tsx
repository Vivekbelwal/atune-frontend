import React from "react";
import { Form as AntForm, Button, Space, Card, Typography } from "antd";
import { FormInstance } from "antd/es/form";
import "./Form.css";

const { Title } = Typography;

interface FormProps {
  title?: string;
  form?: FormInstance;
  onFinish: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  loading?: boolean;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  showCancel?: boolean;
  layout?: "horizontal" | "vertical" | "inline";
  labelCol?: any;
  wrapperCol?: any;
  size?: "small" | "middle" | "large";
  disabled?: boolean;
  initialValues?: any;
  className?: string;
  cardProps?: any;
  submitButtonProps?: any;
  cancelButtonProps?: any;
  preserve?: boolean;
  validateTrigger?: string | string[];
  scrollToFirstError?: boolean;
}

const Form: React.FC<FormProps> = ({
  title,
  form,
  onFinish,
  onFinishFailed,
  loading = false,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  showCancel = true,
  layout = "vertical",
  labelCol,
  wrapperCol,
  size = "middle",
  disabled = false,
  initialValues,
  className = "",
  cardProps = {},
  submitButtonProps = {},
  cancelButtonProps = {},
  preserve = true,
  validateTrigger = "onChange",
  scrollToFirstError = true,
}) => {
  const formContent = (
    <AntForm
      form={form}
      layout={layout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      size={size}
      disabled={disabled}
      initialValues={initialValues}
      preserve={preserve}
      validateTrigger={validateTrigger}
      scrollToFirstError={scrollToFirstError}
      className={`reusable-form ${className}`}
    >
      {children}

      <AntForm.Item className="form-actions">
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={disabled}
            {...submitButtonProps}
          >
            {submitText}
          </Button>
          {showCancel && onCancel && (
            <Button
              onClick={onCancel}
              disabled={loading}
              {...cancelButtonProps}
            >
              {cancelText}
            </Button>
          )}
        </Space>
      </AntForm.Item>
    </AntForm>
  );

  if (title) {
    return (
      <Card
        title={
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
        }
        className={`form-card ${className}`}
        {...cardProps}
      >
        {formContent}
      </Card>
    );
  }

  return formContent;
};

export default Form;
