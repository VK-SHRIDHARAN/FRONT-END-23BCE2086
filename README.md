# Weather Dashboard

## Project Overview
The Weather Dashboard is a web application that provides users with real-time weather information for any city using multiple weather APIs. The dashboard allows users to search for weather data, view forecasts, maintain a weather journal, and manage favorite cities with a drag-and-drop interface.

## Technologies Used
- **Framework:** React.js (with hooks like useState, useEffect, and useCallback)
- **UI Animations:** Framer Motion
- **Data Fetching:** Custom API handlers for weather and forecast retrieval
- **PDF Export:** jsPDF
- **Styling:** CSS

## Key Features
- **City Weather Search:** Users can enter a city name to retrieve current weather data.
- **Dynamic Visualization:** Displays temperature, weather conditions, and icons dynamically.
- **Forecast Cards:** Provides a 5-day forecast for the selected city.
- **Error Handling:** Displays error messages for invalid searches or API failures.
- **Weather Journal:** Allows users to save weather details and export them to PDF.
- **Temperature Unit Toggle:** Users can switch between Celsius and Fahrenheit.
- **API Key Obfuscation:** Secure API key handling to prevent unauthorized access.

## Bonus Features
- **Geolocation Support:** Fetches weather data based on the user's current location with an animated UI element.
- **Favorites List:** Users can save favorite cities and reorder them using drag-and-drop.
- **Export to PDF:** Saves weather journal entries as a downloadable PDF.
- **Performance Optimization:** Uses memoization and debouncing to enhance speed and reduce unnecessary API calls.

## Implementation Details
1. **Fetching Data:** Uses `fetchWeather` and `fetchForecast` helper functions to retrieve data from APIs.
2. **State Management:** React's `useState` and `useEffect` are used to manage city searches, weather data, and favorite lists.
3. **UI Interactions:** Framer Motion handles smooth animations for inputs, buttons, and weather elements.
4. **PDF Generation:** `jsPDF` is utilized to export weather journal entries as a structured PDF.

## Getting Started
### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/weather-dashboard.git
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-dashboard
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

### Environment Setup
Create a `.env` file and add your API keys:
```sh
REACT_APP_WEATHER_API_KEY=your_api_key
```

## Future Enhancements
- Implement additional weather data points like wind speed, humidity, and UV index.
- Enhance the UI with more visual effects and weather-based themes.
- Add user authentication for personalized weather tracking.

## License
This project is open-source and available under the MIT License.

