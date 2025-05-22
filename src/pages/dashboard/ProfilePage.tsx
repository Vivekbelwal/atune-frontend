import { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  Row,
  Col,
  Alert,
  Descriptions,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../store';
import { selectUser, updateUser } from '../../store/slices/authSlice';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ProfileFormValues {
  name: string;
  email: string;
  location: string;
  website: string;
  bio: string;
}

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [form] = Form.useForm<ProfileFormValues>();

  const initialValues: ProfileFormValues = {
    name: user?.name || '',
    email: user?.email || '',
    location: '',
    website: '',
    bio: '',
  };

  const handleEdit = () => {
    form.setFieldsValue(initialValues);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const onFinish = (values: ProfileFormValues) => {
    // Update user in Redux store
    dispatch(
      updateUser({
        name: values.name,
        // Only update other fields if they're not empty
        ...(values.email && { email: values.email }),
      }),
    );

    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
      <Title level={4}>Profile</Title>
      <Text type="secondary">Manage your account information</Text>

      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          style={{ marginTop: 16, marginBottom: 16 }}
        />
      )}

      <Card style={{ marginTop: 24 }}>
        <div
          style={{
            padding: '24px',
            background: '#1890ff',
            color: 'white',
            borderRadius: '2px 2px 0 0',
            marginTop: -24,
            marginLeft: -24,
            marginRight: -24,
            marginBottom: 24,
          }}
        >
          <Row align="middle" gutter={24}>
            <Col>
              <Avatar
                size={80}
                icon={<UserOutlined />}
                style={{ backgroundColor: 'white', color: '#1890ff' }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </Col>
            <Col>
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                {user?.name}
              </Title>
              <Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                {user?.email}
              </Text>
              <div style={{ marginTop: 4 }}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  Role: {user?.role || 'User'}
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {isEditing ? (
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: 'Please enter your name' },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Full Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="location" label="Location">
                  <Input
                    prefix={<HomeOutlined />}
                    placeholder="e.g., San Francisco, CA"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="website" label="Website">
                  <Input
                    prefix={<GlobalOutlined />}
                    placeholder="e.g., https://example.com"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="bio" label="Bio">
              <TextArea rows={4} placeholder="Tell us about yourself" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 8 }}
              >
                Save Changes
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Form.Item>
          </Form>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 16,
              }}
            >
              <Button type="primary" onClick={handleEdit}>
                Edit Profile
              </Button>
            </div>

            <Divider orientation="left">Personal Information</Divider>

            <Descriptions column={2}>
              <Descriptions.Item label="Full Name">
                {user?.name || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {user?.email || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {user?.role || 'User'}
              </Descriptions.Item>
              <Descriptions.Item label="Member Since">
                {new Date().toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={2}>
                {initialValues.location || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Website" span={2}>
                {initialValues.website || 'Not provided'}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Bio</Divider>
            <p>
              {initialValues.bio ||
                'No bio provided. Click "Edit Profile" to add one.'}
            </p>
          </>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
