import React, { useState } from "react";
import axios from "axios";

function ReplaceData({ onComplete }) {
    const url = import.meta.env.VITE_BASE_URL;
    const [column, setColumn] = useState("");
    const [replaceStr, setReplaceStr] = useState("");

    const handleReplace = async () => {
        if (!column) return alert("Please enter a column name.");

        const formData = new FormData();
        formData.append("column", column);
        formData.append("replace_str", "Karen");

        try {

            const res = await axios.post(`${url}api/replace-data/`, formData,
            );

            onComplete(res.data.processed_data);
            console.log(res.data)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="process">
            <input
                type="text"
                placeholder="Enter column name: "
                value={column}
                onChange={(e) => setColumn(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter replacement string: "
                value={replaceStr}
                onChange={(e) => setReplaceStr(e.target.value)}
            />
            <button onClick={handleReplace}>Send</button>
        </div>
    );
}

export default ReplaceData;
