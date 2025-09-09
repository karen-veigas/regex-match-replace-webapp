
import React, { useState } from "react";
import axios from "axios";


function FileUpload({ hasUploaded }) {
  const url = import.meta.env.VITE_BASE_URL;
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${url}api/upload-file/`, formData,
        { headers: { "Content-Type": "multipart/form-data" }, });

      if (hasUploaded) hasUploaded(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="upload">
      <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
