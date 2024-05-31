// App.js
import React from "react";
import FileUpload from "./FileUpload";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi-File Upload</h1>
      </header>
      <FileUpload />
    </div>
  );
};

export default App;
