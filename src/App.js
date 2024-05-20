import React, { useState } from "react";
import { Select, Button, Card, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAQI } from "./redux/actions";
import "./App.css";

const { Option } = Select;

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <CityDropdown />
      </div>
      <Footer />
    </div>
  );
};

const Header = () => {
  return <header className="header">React Onboarding</header>;
};

const Footer = () => {
  return (
    <footer className="footer">
      Made by <a href="mailto:drishya.gupta@zs.com">Drishya</a>
    </footer>
  );
};

// City coordinates mapping
const cityCoordinates = {
  Pune: { lat: 18.5204, lon: 73.8567 },
  "New Delhi": { lat: 28.6139, lon: 77.209 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
  Hyderabad: { lat: 17.385, lon: 78.4867 },
  Noida: { lat: 28.5355, lon: 77.391 },
};

const CityDropdown = () => {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const getAqi = async () => {
    if (!selectedCity) {
      message.error("Please select a city before fetching weather data");
      return;
    }

    const { lat, lon } = cityCoordinates[selectedCity];
    setLoading(true);

    try {
      const response = await axios.get(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=us_aqi&format=json`
      );
      // Store in redux
      dispatch(setAQI(response.data));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      message.error("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dropdown-container">
      <h1 className="heading_style">Select a city</h1>
      <Select
        placeholder="Select a city"
        style={{ width: 200 }}
        onChange={handleCityChange}
      >
        <Option value="Pune">Pune</Option>
        <Option value="New Delhi">New Delhi</Option>
        <Option value="Bangalore">Bangalore</Option>
        <Option value="Hyderabad">Hyderabad</Option>
        <Option value="Noida">Noida</Option>
      </Select>
      <div className="button-container">
        <Button type="primary" onClick={getAqi} loading={loading}>
          Get Weather
        </Button>
      </div>
      <div className="statistics-card">
        <StatisticsCard />
      </div>
    </div>
  );
};

const StatisticsCard = () => {
  const aqiData = useSelector((state) => state.aqiData);

  if (!aqiData || !aqiData.hourly || !aqiData.hourly.us_aqi) {
    return null;
  }

  const aqi = aqiData.hourly.us_aqi[0]; // Extract AQI from API response
  let color, label;
  if (aqi < 50) {
    color = "green";
    label = "AQI is Good";
  } else if (aqi >= 50 && aqi < 100) {
    color = "yellow";
    label = "AQI is Moderate";
  } else {
    color = "red";
    label = "AQI is Hazardous";
  }

  return (
    <Card title="Statistics" style={{ width: 300, marginTop: 20 }}>
      <p style={{ color }}>AQI: {aqi}</p>
      <p>Status: {label}</p>
    </Card>
  );
};

export default App;
