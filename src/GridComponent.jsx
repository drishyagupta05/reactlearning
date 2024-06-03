// GridComponent.jsx
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const GridComponent = ({ rowData, columns }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columns} />
    </div>
  );
};

export default GridComponent;
