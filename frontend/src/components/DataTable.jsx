// src/components/DataTable.jsx
import React from "react";
import { Table } from "antd";

export default function DataTable({ data }) {
  if (!data) return null;

  let rowData = [];
  const firstValue = data[0] ?? data;
  const isColumnWise =
    firstValue && typeof firstValue === "object" && !Array.isArray(data);

  if (isColumnWise) {
    const keys = Object.keys(data);
    const length = data[keys[0]]?.length || 0;

    rowData = Array.from({ length }, (_, i) => {
      const row = {};
      keys.forEach((key) => {
        row[key] = data[key][i];
      });
      return row;
    });
  } else {
    rowData = data;
  }

  const columns = Object.keys(rowData[0] ?? {}).map((col) => ({
    title: col,
    dataIndex: col,
    key: col,
  }));

  return (
    <Table
      dataSource={rowData}
      columns={columns}
      pagination={{ pageSize: 5 }}
      bordered
      size="middle"
    />
  );
}
