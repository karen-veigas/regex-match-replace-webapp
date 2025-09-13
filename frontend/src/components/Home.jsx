import React, { useState } from "react";
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CAlert
} from "@coreui/react";
import FileUpload from "../components/FileUpload";
import ReplaceForm from "../components/ReplaceForm";
import DataTable from "../components/DataTable";
import RhombusAILogo from "../components/icons/rhombus_ai_logo.jpeg";


export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="page-wrapper">
      <CCard className="card-wrapper">
        <CCardHeader className="header-row">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={RhombusAILogo}
              alt="Rhombus AI Logo"
              width={50}
              height={50}
              style={{ borderRadius: "6px" }}
            />
            <div>
              <h3 className="page-title">Regex Pattern Matching & Replacement</h3>
              <div className="subtitle">Upload CSV/Excel → describe the pattern → replace & preview</div>
            </div>
          </div>
        </CCardHeader>

        <CCardBody>
          {error && <CAlert color="danger" onClose={() => setError("")}>{error}</CAlert>}
          <div className="container-fluid">

            <section>
              <h5>
                1. Upload file
              </h5>
              <FileUpload onUploaded={(d) => { setData(d); setError(""); }} onError={(msg) => setError(msg)} />
            </section>

            <section style={{ marginBottom: 20 }}>
              <h5>2. Pattern matching</h5>
              <ReplaceForm onReplaced={(d) => { setData(d); setError(""); }} onError={(msg) => setError(msg)} />
            </section>

            {data && (
              <>
                <h5 style={{ marginTop: 8 }}>3. Processed data</h5>
                <DataTable data={data} />
              </>
            )}

          </div>
        </CCardBody>
      </CCard>
    </div>
  );
}