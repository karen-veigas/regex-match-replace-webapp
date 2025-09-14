
import React, { useState } from "react";
import { Upload, Button, Space, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Dragger } = Upload;



function FileUpload({ onUploaded, onError }) {
  const url = import.meta.env.VITE_BASE_URL;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = ({ file }) => {
    setFile(file);
  };


  const handleUpload = async () => {
    if (!file) return onError?.("Please select a file.");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await axios.post(`${url}api/upload-file/`, formData,
        { headers: { "Content-Type": "multipart/form-data" }, });

      onUploaded?.(data);
    } catch (err) {
      onError?.("Upload failed. " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dragger
        file={file}
        onChange={handleFileChange}
        beforeUpload={() => false}
        multiple={false}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        style={{ padding: "1rem" }}
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined style={{ fontSize: 32, color: "#2563eb" }} />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Supports CSV or Excel files only
        </p>
      </Dragger>

      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <Button
          type="primary"
          onClick={handleUpload}
          loading={loading}
        >
          Upload File
        </Button>
      </div>
    </>
  );
}

export default FileUpload;
