import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

 const api_key = "85b1a42d5ed24786b78191037252508"; 

  const fetchWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      alert("Please enter a valid City name");
      return;
    }

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${encodeURIComponent(
          trimmedCity
        )}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // WeatherAPI returns { error: { message: "No matching location found." } } for invalid cities
      if (data.error) {
        throw new Error(data.error.message);
      }

      setWeather(data);
    } catch (err) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Application</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c} °C</p>
          </div>

          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity} %</p>
          </div>

          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
          </div>

          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
