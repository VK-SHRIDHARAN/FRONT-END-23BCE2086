const fetchWeather = async (city, unit) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY || "d55239072fc4f2b89b806e7cbd476a5c";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("Weather fetch failed");
    const data = await response.json();
    return {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].main.toLowerCase(),
    };
  };
  
  export default fetchWeather;
  