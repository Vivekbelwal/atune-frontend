import React, { useState } from "react";
import {
  Form as AntForm,
  Input,
  Upload,
  Avatar,
  message,
  Space,
  Typography,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadFile } from "antd/es/upload";
import Form from "../Form";
import { useUser } from "../../contexts/UserContext";
import { User as UserApi, File as FileApi } from "../../Api";
import "./UserEditForm.css";

const { Text } = Typography;

interface UserEditFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface UpdateUserFormData {
  name: string;
  avatar?: UploadFile[];
}

const UserEditForm: React.FC<UserEditFormProps> = ({ onSuccess, onCancel }) => {
  const { user, fetchUser } = useUser();
  const [form] = AntForm.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    user?.avatar?.url
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFinish = async (values: UpdateUserFormData) => {
    if (!user) return;

    setLoading(true);
    try {
      let avatarId = user.avatarId;

      // Upload new avatar if provided
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const uploadResponse = await FileApi.UploadFile(
          fileList[0].originFileObj as File,
          "avatar"
        );
        avatarId = uploadResponse.uploadFile.id;
      }

      // Update user with new data
      const updateInput = {
        name: values.name,
        ...(avatarId && { avatarId }),
      };

      await UserApi.UpdateUser(updateInput);

      // Refresh user data
      await fetchUser();

      message.success("Profile updated successfully!");
      onSuccess?.();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      message.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info: any) => {
    const { fileList: newFileList } = info;
    setFileList(newFileList);

    if (info.file.status === "done") {
      // Get this url from response in real world.
      setAvatarUrl(info.file.response?.url);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    return false; // Prevent auto upload
  };

  const uploadButton = (
    <div className="avatar-upload-button">
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form
      title="Edit Profile"
      form={form}
      onFinish={handleFinish}
      onCancel={onCancel}
      loading={loading}
      submitText="Update Profile"
      cancelText="Cancel"
      showCancel={!!onCancel}
      initialValues={{
        name: user?.name || "",
      }}
      className="user-edit-form"
    >
      {/* Avatar Upload */}
      <AntForm.Item
        label="Profile Picture"
        name="avatar"
        className="avatar-form-item"
      >
        <Space
          direction="vertical"
          align="center"
          className="avatar-upload-container"
        >
          <Avatar
            size={80}
            src={avatarUrl}
            icon={<UserOutlined />}
            className="avatar-preview"
          />
          <Upload
            name="avatar"
            listType="picture"
            fileList={fileList}
            onChange={handleAvatarChange}
            beforeUpload={beforeUpload}
            showUploadList={false}
            accept="image/*"
          >
            {uploadButton}
          </Upload>
          <Text
            type="secondary"
            style={{ fontSize: "12px", textAlign: "center" }}
          >
            JPG or PNG, max 2MB
          </Text>
        </Space>
      </AntForm.Item>

      {/* Name Input */}
      <AntForm.Item
        label="Full Name"
        name="name"
        rules={[
          { required: true, message: "Please enter your name!" },
          { min: 2, message: "Name must be at least 2 characters!" },
          { max: 50, message: "Name must be less than 50 characters!" },
        ]}
      >
        <Input placeholder="Enter your full name" size="large" />
      </AntForm.Item>

      {/* Email Display (Read-only) */}
      <AntForm.Item label="Email Address">
        <Input
          value={user?.email}
          disabled
          size="large"
          placeholder="Email address"
        />
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Email cannot be changed
        </Text>
      </AntForm.Item>

      {/* User ID Display (Read-only) */}
      <AntForm.Item label="User ID">
        <Input value={user?.id} disabled size="large" placeholder="User ID" />
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Unique identifier for your account
        </Text>
      </AntForm.Item>
    </Form>
  );
};

export default UserEditForm;
