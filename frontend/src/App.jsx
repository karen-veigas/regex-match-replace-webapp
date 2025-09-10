
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ReplaceData from "./components/ReplaceData";

function App() {

  return (
    <div className="App">
      <h1>Regex Pattern Replacement App</h1>
      <FileUpload />
      <ReplaceData />
    </div>
  );
}

export default App;
