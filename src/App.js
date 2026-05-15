import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import fetchWeather from "./fetchWeather";
import fetchForecast from "./fetchForecast";
import { renderWeatherIcon } from "./weatherIcons";
import "./weatherboard.css";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("metric");
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const getWeatherData = useCallback(async (cityName) => {
    try {
      setError(null);
      const weatherData = await fetchWeather(cityName, unit);
      const forecastData = await fetchForecast(cityName, unit);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError("Failed to fetch weather data. Try again later.");
    }
  }, [unit]);

  useEffect(() => {
    if (city) getWeatherData(city);
  }, [city, unit, getWeatherData]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
  
    // Add basic styling
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
  
    // Add weather details
    if (weather) {
      doc.text(`City: ${weather.city}`, 10, 10);
      doc.text(`Temperature: ${weather.temperature}° ${unit === "metric" ? "C" : "F"}`, 10, 20);
      doc.text(`Description: ${weather.description}`, 10, 30);
    }
  
    // Add forecast details
    if (forecast.length > 0) {
      doc.text("5-Day Forecast:", 10, 40);
      forecast.forEach((day, index) => {
        doc.text(`Date: ${day.date}`, 10, 50 + index * 10);
        doc.text(`Temperature: ${day.temperature}° ${unit === "metric" ? "C" : "F"}`, 80, 50 + index * 10);
        doc.text(`Description: ${day.description}`, 150, 50 + index * 10);
      });
    }
  
    // Save the PDF
    doc.save("WeatherJournal.pdf");
  };
  

  const addToFavorites = () => {
    if (city && !favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFromFavorites = (cityToRemove) => {
    setFavorites(favorites.filter((favCity) => favCity !== cityToRemove));
  };

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <motion.div className="dashboard-container"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h1 className="title">Weather Dashboard</h1>
      <div className="input-container">
        <motion.input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.button 
          onClick={() => getWeatherData(city)} 
          disabled={!city.trim()} 
          className="button search"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Search
        </motion.button>
        <motion.button 
          onClick={addToFavorites} 
          className="button favorites"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Add to Favorites
        </motion.button>
        <motion.button 
          onClick={handleExportPDF} 
          className="button export"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Export Journal
        </motion.button>
        <motion.button 
          onClick={handleUnitChange} 
          className="button unit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Toggle Unit ({unit === "metric" ? "Celsius" : "Fahrenheit"})
        </motion.button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <p>{weather.temperature}° {unit === "metric" ? "C" : "F"}</p>
          <p>{weather.description}</p>
          <div className={`icon ${weather.icon}`}>{renderWeatherIcon(weather.icon)}</div>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="forecast">
          <h3>5-Day Forecast:</h3>
          {forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <p>{day.date}</p>
              <p>{day.temperature}° {unit === "metric" ? "C" : "F"}</p>
              <p>{day.description}</p>
            </div>
          ))}
        </div>
      )}
      {favorites.length > 0 && (
        <div className="favorites-list">
          <h3>Favorites:</h3>
          {favorites.map((favCity, index) => (
            <div key={index} className="favorite-item">
              <p>{favCity}</p>
              <motion.button 
                onClick={() => removeFromFavorites(favCity)} 
                className="button remove"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Remove
              </motion.button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
