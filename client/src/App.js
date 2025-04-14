import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherBackground from "./components/WeatherBackground";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import ForecastCard from "./components/ForecastCard";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherRes = await fetch(
        `http://localhost:5000/api/weather?city=${city}`
      );
      if (!weatherRes.ok) throw new Error("Failed to fetch current weather");
      const weather = await weatherRes.json();
      setWeatherData(weather);

      // Fetch 5-day forecast
      const forecastRes = await fetch(
        `http://localhost:5000/api/forecast?city=${city}`
      );
      if (!forecastRes.ok) throw new Error("Failed to fetch forecast");
      const forecast = await forecastRes.json();

      // Assuming forecast.forecast contains the array of forecast data
      setForecastData(forecast.forecast); // <-- Make sure this matches the API response structure
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch weather or forecast data");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(debouncedSearchInput);
    }
  };

  return (
    <div className="app-container">
      <WeatherBackground isDarkMode={isDarkMode} />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Weather Dashboard</h1>
          <button style={{ 
            backgroundColor: isDarkMode ? '#333' : '#f7f7f7',
            color: isDarkMode ? '#fff' : '#333',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px'
            

          }} onClick={toggleTheme}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <SearchBar
          onSearch={() => handleSearch(debouncedSearchInput)}
          value={searchInput}
          setValue={setSearchInput}
          onKeyDown={handleKeyDown}
        />

        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {weatherData && <WeatherCard weatherData={weatherData} />}

        {forecastData.length > 0 && (
          <div className="container mt-4">
            <h3 className="mb-4 text-center">5-Day Forecast</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                gap: "4rem",
                justifyContent: "flex-start",
                paddingBottom: "1rem",
              }}
            >
              {forecastData.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ minWidth: "150px" }}
                >
                  <ForecastCard
                    date={item.date}
                    temperature={item.temperature}
                    condition={item.condition}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
