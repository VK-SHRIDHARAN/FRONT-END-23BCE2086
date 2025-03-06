const fetchForecast = async (city, unit) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY || "d55239072fc4f2b89b806e7cbd476a5c";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("Forecast fetch failed");
    const data = await response.json();
    return data.list.slice(0, 5).map((item) => ({
      temperature: item.main.temp,
      description: item.weather[0].description,
      date: item.dt_txt,
    }));
  };
  
  export default fetchForecast;
  