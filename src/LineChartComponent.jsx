// LineChartComponent.jsx
import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChartComponent = ({ data, selectedCity }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Hourly Wind Speed (Line Chart) - {selectedCity}</h2>
      <ResponsiveLine
        data={data}
        // Other props...
      />
    </div>
  );
};

export default LineChartComponent;
