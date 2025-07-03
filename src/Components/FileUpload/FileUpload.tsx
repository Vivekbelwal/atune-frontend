import React, { useState } from "react";
import { Upload, Modal, Button, Image, message } from "antd";
import { UploadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import "./FileUpload.css";

interface FileUploadProps {
  maxCount?: number;
  accept?: string;
  multiple?: boolean;
  listType?: "text" | "picture" | "picture-card";
  disabled?: boolean;
  onFilesChange?: (files: UploadFile[]) => void;
  initialFiles?: UploadFile[];
  uploadText?: string;
  maxSize?: number; // in MB
  showPreview?: boolean;
  showRemove?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  maxCount = 5,
  accept = "*",
  multiple = true,
  listType = "picture-card",
  disabled = false,
  onFilesChange,
  initialFiles = [],
  uploadText = "Upload Files",
  maxSize = 10, // 10MB default
  showPreview = true,
  showRemove = true,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(initialFiles);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  // Get base64 for image preview
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Check if file is an image
  const isImage = (file: UploadFile) => {
    return file.type?.startsWith("image/") || false;
  };

  // Check if file is a PDF
  const isPDF = (file: UploadFile) => {
    return file.type === "application/pdf";
  };

  // Handle preview
  const handlePreview = async (file: UploadFile) => {
    if (!showPreview) return;

    if (isImage(file)) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
      );
    } else if (isPDF(file)) {
      // For PDF files, open in new tab
      if (file.url) {
        window.open(file.url, "_blank");
      } else if (file.originFileObj) {
        const url = URL.createObjectURL(file.originFileObj);
        window.open(url, "_blank");
        URL.revokeObjectURL(url);
      }
    } else {
      // For other file types, show file info
      Modal.info({
        title: "File Information",
        content: (
          <div>
            <p>
              <strong>Name:</strong> {file.name}
            </p>
            <p>
              <strong>Size:</strong>{" "}
              {file.size
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                : "Unknown"}
            </p>
            <p>
              <strong>Type:</strong> {file.type || "Unknown"}
            </p>
          </div>
        ),
      });
    }
  };

  // Handle file change
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onFilesChange?.(newFileList);
  };

  // Before upload validation
  const beforeUpload = (file: RcFile) => {
    // Check file size
    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtMaxSize) {
      message.error(`File must be smaller than ${maxSize}MB!`);
      return false;
    }

    // Check file count
    if (fileList.length >= maxCount) {
      message.error(`You can only upload up to ${maxCount} files!`);
      return false;
    }

    return false; // Prevent auto upload, handle manually
  };

  // Custom upload button
  const uploadButton = (
    <div className="upload-button">
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>{uploadText}</div>
    </div>
  );

  // Custom item render for different file types
  const itemRender = (originNode: React.ReactElement, file: UploadFile) => {
    const actions = [];

    // Preview action
    if (showPreview) {
      actions.push(
        <Button
          key="preview"
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handlePreview(file)}
        />
      );
    }

    // Remove action
    if (showRemove && !disabled) {
      actions.push(
        <Button
          key="remove"
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            const newFileList = fileList.filter(
              (item) => item.uid !== file.uid
            );
            setFileList(newFileList);
            onFilesChange?.(newFileList);
          }}
        />
      );
    }

    return (
      <div className="file-upload-item">
        {isImage(file) ? (
          <div className="image-preview">
            <Image
              src={file.url || file.thumbUrl}
              alt={file.name}
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              preview={false}
            />
          </div>
        ) : (
          <div className="file-icon">{isPDF(file) ? "📄" : "📎"}</div>
        )}
        <div className="file-info">
          <div className="file-name" title={file.name}>
            {file.name}
          </div>
          <div className="file-size">
            {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ""}
          </div>
        </div>
        <div className="file-actions">{actions}</div>
      </div>
    );
  };

  return (
    <div className="file-upload-container">
      <Upload
        listType={listType}
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        maxCount={maxCount}
        itemRender={listType === "text" ? itemRender : undefined}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>

      {/* Image Preview Modal */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        width={800}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default FileUpload;
