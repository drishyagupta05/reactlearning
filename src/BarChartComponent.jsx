// BarChartComponent.jsx
import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChartComponent = ({ data, selectedCity }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Current Wind Speed and Gusts (Bar Chart) - {selectedCity}</h2>
      <ResponsiveBar
        data={data}
        // Other props...
      />
    </div>
  );
};

export default BarChartComponent;
