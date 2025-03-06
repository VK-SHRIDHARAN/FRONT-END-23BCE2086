import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

export const renderWeatherIcon = (icon) => {
  switch (icon) {
    case 'clear':
      return <WiDaySunny />;
    case 'clouds':
      return <WiCloud />;
    case 'rain':
      return <WiRain />;
    case 'snow':
      return <WiSnow />;
    case 'thunderstorm':
      return <WiThunderstorm />;
    default:
      return <WiCloud />;
  }
};
