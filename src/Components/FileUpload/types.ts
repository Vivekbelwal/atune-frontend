import type { UploadFile } from "antd/es/upload/interface";

export interface FileUploadProps {
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

export type { UploadFile };
