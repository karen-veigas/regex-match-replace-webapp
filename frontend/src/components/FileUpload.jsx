
import React, { useState } from "react";
import { CForm, CFormLabel, CFormInput, CButton, CRow, CCol, CSpinner } from "@coreui/react";

import axios from "axios";


function FileUpload({ onUploaded, onError }) {
  const url = import.meta.env.VITE_BASE_URL;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <CForm>
      <CRow className="align-items-end gx-3">
        <CCol xs={12} md={8}>
          <CFormLabel htmlFor="fileInput">Choose file (CSV / Excel)</CFormLabel>
          <CFormInput
            id="fileInput"
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </CCol>

        <CCol xs={12} md={4}>
          <CButton color="primary" className="w-100 mt-3" onClick={handleUpload} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" /> Uploading...
              </>
            ) : (
              "Upload"
            )}
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
}

export default FileUpload;
