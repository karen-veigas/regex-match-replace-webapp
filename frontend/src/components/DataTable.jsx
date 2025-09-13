import React from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";

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

  const columns = Object.keys(rowData[0] ?? {});

  return (
    <div className="table-wrapper">
      <CTable
  bordered
  striped
  hover
  responsive
  className="align-middle text-sm shadow-sm"
>
        <CTableHead color="light">
          <CTableRow>
            {columns.map((col) => (
              <CTableHeaderCell key={col}>{col}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {rowData.map((row, rIdx) => (
            <CTableRow key={rIdx}>
              {columns.map((col) => (
                <CTableDataCell key={col}>{String(row[col] ?? "")}</CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
}
