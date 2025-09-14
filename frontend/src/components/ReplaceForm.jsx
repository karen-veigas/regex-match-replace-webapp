import React, { useState } from "react";
import { CForm, CFormLabel, CFormInput, CButton, CRow, CCol, CSpinner } from "@coreui/react";
import axios from "axios";

function ReplaceData({ onReplaced, onError }) {
    const url = import.meta.env.VITE_BASE_URL;
    const [prompt, setPrompt] = useState("");

    const [loading, setLoading] = useState(false)

    const handleReplace = async () => {
        if ( !prompt ) return onError?.("All fields are required.");
        setLoading(true);

        const formData = new FormData();
        formData.append("prompt", prompt);

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
                    <CFormLabel>Pattern (natural language)</CFormLabel>
                    <CFormInput value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='e.g. "Find emails"' />
                </CCol>

            </CRow>

            <CButton color="success" onClick={handleReplace} disabled={loading}>
                {loading ? (<><CSpinner size="sm" /> Applying...</>) : "Apply Replacement"}
            </CButton>
        </CForm>
    );
}

export default ReplaceData;
