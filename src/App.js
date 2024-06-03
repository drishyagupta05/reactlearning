import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import jsondata from "./data.json";
import Loader from "./Loader.js";

const cities = [
  { name: "All Cities", latitude: null, longitude: null },
  { name: "Pune", latitude: 18.5204, longitude: 73.8567 },
  { name: "Delhi", latitude: 28.6139, longitude: 77.209 },
  { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
  { name: "Hyderabad", latitude: 17.385, longitude: 78.4867 },
  { name: "Noida", latitude: 28.5355, longitude: 77.391 },
];

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [startDate, setStartDate] = useState("2024-05-30");
  const [endDate, setEndDate] = useState("2024-05-31");
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [loading, setLoading] = useState(false);
  const [data] = useState(jsondata);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Convert start and end dates to Date objects
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      // Filter the data based on the selected date range
      const filteredData = data.map((cityData) => {
        const filteredHourly = cityData.hourly.time.reduce(
          (acc, time, idx) => {
            // Convert time to Date object for comparison
            const timeObj = new Date(time);

            // Check if time is between start date and end date (inclusive)
            if (timeObj >= startDateObj && timeObj <= endDateObj) {
              acc.time.push(time);
              acc.wind_speed_10m.push(cityData.hourly.wind_speed_10m[idx]);
              acc.wind_direction_10m.push(
                cityData.hourly.wind_direction_10m[idx]
              );
              acc.wind_gusts_10m.push(cityData.hourly.wind_gusts_10m[idx]);
            }
            return acc;
          },
          {
            time: [],
            wind_speed_10m: [],
            wind_direction_10m: [],
            wind_gusts_10m: [],
          }
        );
        return {
          ...cityData,
          hourly: filteredHourly,
        };
      });

      const cityData = cities.slice(1).map((city, index) => ({
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        current: filteredData[index].current,
        hourly: filteredData[index].hourly,
      }));

      // Extract row data for the grid
      const rowData = cityData.flatMap((item, index) =>
        item.hourly.time.map((time, idx) => ({
          id: `${index + 1}-${idx + 1}`,
          city: item.name,
          datetime: time,
          latitude: item.latitude,
          longitude: item.longitude,
          current_wind_speed: item.current.wind_speed_10m,
          current_wind_direction: item.current.wind_direction_10m,
          current_wind_gusts: item.current.wind_gusts_10m,
        }))
      );
      setRowData(rowData);

      // Extract data for the line chart
      const lineData = cityData.map((item) => ({
        id: item.name,
        data: item.hourly.time.map((time, idx) => ({
          x: time,
          y: item.hourly.wind_speed_10m[idx],
        })),
      }));
      setLineData(lineData);

      // Extract data for the bar chart
      const barData = cityData.map((item) => ({
        city: item.name,
        wind_speed: item.current.wind_speed_10m,
        wind_gusts: item.current.wind_gusts_10m,
      }));
      setBarData(barData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleUpdate = () => {
    fetchWeatherData();
  };

  const filteredRowData =
    selectedCity === "All Cities"
      ? rowData
      : rowData.filter((item) => item.city === selectedCity);
  const filteredLineData =
    selectedCity === "All Cities"
      ? lineData
      : lineData.filter((item) => item.id === selectedCity);
  const filteredBarData =
    selectedCity === "All Cities"
      ? barData
      : barData.filter((item) => item.city === selectedCity);

  const columns = [
    { headerName: "ID", field: "id" },
    { headerName: "City", field: "city" },
    { headerName: "Time", field: "datetime" },
    { headerName: "Latitude", field: "latitude" },
    { headerName: "Longitude", field: "longitude" },
    { headerName: "Current Wind Speed (km/h)", field: "current_wind_speed" },
    {
      headerName: "Current Wind Direction (°)",
      field: "current_wind_direction",
    },
    { headerName: "Current Wind Gusts (km/h)", field: "current_wind_gusts" },
  ];

  return (
    <div>
      <h1>Weather Data Visualization</h1>

      <label htmlFor="start-date-select">Start Date:</label>
      <input
        type="date"
        id="start-date-select"
        onChange={handleStartDateChange}
        value={startDate}
      />
      <label htmlFor="end-date-select">End Date:</label>
      <input
        type="date"
        id="end-date-select"
        onChange={handleEndDateChange}
        value={endDate}
      />
      <label htmlFor="city-select">Select a city:</label>
      <select id="city-select" onChange={handleCityChange} value={selectedCity}>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <button onClick={handleUpdate}>Update</button>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact rowData={filteredRowData} columnDefs={columns} />
          </div>
          <h2>Hourly Wind Speed (Line Chart) - {selectedCity}</h2>
          <div style={{ height: 400, width: "100%" }}>
            <ResponsiveLine
              data={filteredLineData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: "Time",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Wind Speed (km/h)",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              colors={{ scheme: "nivo" }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              enableSlices="x"
              sliceTooltip={({ slice }) => {
                return (
                  <div
                    style={{
                      background: "white",
                      padding: "9px 12px",
                      border: "1px solid #ccc",
                    }}
                  >
                    {slice.points.map((point) => (
                      <div
                        key={point.id}
                        style={{
                          color: point.serieColor,
                          padding: "3px 0",
                        }}
                      >
                        <strong>{point.serieId}</strong> [
                        {point.data.xFormatted}]: {point.data.yFormatted} km/h
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </div>
          <h2>Current Wind Speed and Gusts (Bar Chart) - {selectedCity}</h2>
          <div style={{ height: 400, width: "100%" }}>
            <ResponsiveBar
              data={filteredBarData}
              keys={["wind_speed", "wind_gusts"]}
              indexBy="city"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              groupMode="grouped"
              colors={{ scheme: "nivo" }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "City",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Value",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              animate={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
