import React, { useState } from "react";
import { CForm, CFormLabel, CFormInput, CButton, CRow, CCol, CSpinner } from "@coreui/react";
import axios from "axios";

function ReplaceData({ onReplaced, onError }) {
    const url = import.meta.env.VITE_BASE_URL;
    const [column, setColumn] = useState("");
    const [replaceStr, setReplaceStr] = useState("");
    const [pattern, setPattern] = useState("");

    const [loading, setLoading] = useState(false)

    const handleReplace = async () => {
        if (!column || !pattern || !replaceStr) return onError?.("All fields are required.");
        setLoading(true);

        const formData = new FormData();
        formData.append("column", column);
        // formData.append("pattern", pattern);
        formData.append("replace_str", replaceStr);

        try {

            const res = await axios.post(`${url}api/replace-data/`, formData,
            );

            onReplaced?.(res.data?.data);
        } catch (err) {
            onError?.("Replacement failed. " + (err?.message || ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <CForm>
            <CRow className="mb-3 gx-3">
                <CCol md={4}>
                    <CFormLabel>Column Name</CFormLabel>
                    <CFormInput value={column} onChange={(e) => setColumn(e.target.value)} placeholder="e.g. Email" />
                </CCol>

                <CCol md={4}>
                    <CFormLabel>Pattern (natural language)</CFormLabel>
                    <CFormInput value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder='e.g. "Find emails"' />
                </CCol>

                <CCol md={4}>
                    <CFormLabel>Replacement String</CFormLabel>
                    <CFormInput value={replaceStr} onChange={(e) => setReplaceStr(e.target.value)} placeholder="e.g. REDACTED" />
                </CCol>
            </CRow>

            <CButton color="success" onClick={handleReplace} disabled={loading}>
                {loading ? (<><CSpinner size="sm" /> Applying...</>) : "Apply Replacement"}
            </CButton>
        </CForm>
    );
}

export default ReplaceData;
