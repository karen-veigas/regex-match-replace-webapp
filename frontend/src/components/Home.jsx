import React, { useState } from "react";
import { Card, Space, Typography, Alert  } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FileUpload from "../components/FileUpload";
import ReplaceForm from "../components/ReplaceForm";
import DataTable from "../components/DataTable";

import RhombusAILogo from "../components/icons/rhombus_ai_logo.jpeg";

const { Title, Text } = Typography;

export default function Home() {
  const [data, setData] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info"); 
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = (message, type = "info") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f0f5ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Card
        style={{ maxWidth: 900, width: "100%" }}
        bodyStyle={{ padding: "2rem" }}
      >
        <Space align="center" style={{ marginBottom: "1.5rem" }}>
          <img
            src={RhombusAILogo}
            alt="Rhombus AI Logo"
            style={{ width: 50, height: 50, borderRadius: 8 }}
          />
          <div>
            <Title level={3} style={{ margin: 0, color: "#1d4ed8" }}>
              Regex Pattern Matching & Replacement
            </Title>
            <Text type="secondary">
              Upload CSV/Excel → Enter Your Prompt → Replace & Preview
            </Text>
          </div>
        </Space>

        {alertVisible && (
          <Alert
            message={alertMessage}
            type={alertType}
            closable
            showIcon
            style={{ marginBottom: "1rem" }}
            onClose={closeAlert}
          />
        )}

        <Title level={5} style={{ marginTop: "1.5rem" }}>
          Upload File : 
        </Title>
        <FileUpload
          onUploaded={(d) => {setData(d)
            showAlert("File uploaded successfully!", "success");}}
          onError={(msg) => showAlert(msg, "error")}
          
        />
        <Title level={5} style={{ marginTop: "2rem" }}>
          Enter your prompt: 
        </Title>
        <ReplaceForm
          onReplaced={(d) => {setData(d)
            showAlert("Replacement applied successfully!", "success");}}
          onError={(msg) => showAlert(msg, "error")}
        />
        {data && (
          <>
            <Title level={5} style={{ marginTop: "2rem" }}>
              Preview: 
            </Title>
            <DataTable data={data} />
          </>
        )}
      </Card>
    </div>
  );
}