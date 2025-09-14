import React, { useState } from "react";
import { Card, Space, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FileUpload from "../components/FileUpload";
import ReplaceForm from "../components/ReplaceForm";
import DataTable from "../components/DataTable";

import RhombusAILogo from "../components/icons/rhombus_ai_logo.jpeg";

const { Title, Text } = Typography;

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (msg) => {
    message.error(msg);
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

        <Title level={5} style={{ marginTop: "1.5rem" }}>
          Upload File : 
        </Title>
        <FileUpload
          onUploaded={(d) => setData(d)}
          onError={handleError}
          loading={loading}
          setLoading={setLoading}
        />
        <Title level={5} style={{ marginTop: "2rem" }}>
          Enter your prompt: 
        </Title>
        <ReplaceForm
          onReplaced={(d) => setData(d)}
          onError={handleError}
          loading={loading}
          setLoading={setLoading}
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