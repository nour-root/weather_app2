import axios from "axios";

const getCurrentWeather = (data = { latitude: 0, longitude: 0 }) => {
  return axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&timezone&hourly=weather_code,apparent_temperature&current=precipitation,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature,temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min`
  );
};
export default getCurrentWeather;
