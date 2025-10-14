import axios from "axios";
const getCurrentWeather = (data = { latitude: 0, longitude: 0 }, nameUnit) => {
  if (nameUnit === "imperial") {
    const temperature_unit = "fahrenheit";
    const wind_speed_unit = "mph";
    const precipitation_unit = "inch";
    return axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&wind_speed_unit=${wind_speed_unit}&temperature_unit=${temperature_unit}&precipitation_unit=${precipitation_unit}&hourly=weather_code,temperature_2m&current=precipitation,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature,temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min`
    );
  } else
    return axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&hourly=weather_code,temperature_2m&current=precipitation,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature,temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min`
    );
};
export default getCurrentWeather;
