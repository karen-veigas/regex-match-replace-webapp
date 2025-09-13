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
import RhombusAILogo from "../components/icons/rhombus_ai_logo.jpeg";


export default function Home() {

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
              <h3 className="page-title text-primary">
                Regex Pattern Matching & Replacement
              </h3>
              <div className="subtitle">
                Upload File → describe pattern → replace & preview
              </div>
            </div>
          </div>
        </CCardHeader>

        <CCardBody>

          <section style={{ marginBottom: 20 }}>
            <h5>1. Upload file</h5>
            <FileUpload />
          </section>

          <section style={{ marginBottom: 20 }}>
            <h5>2. Pattern matching</h5>
            <ReplaceForm/>
          </section>

        </CCardBody>
      </CCard>
    </div>
  );
}
