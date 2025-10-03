import CurrentWeatherDetails from "./CurrentWeatherDetails";
import ForecastDailyWeather from "./ForecastDailyWeather";
import HourlyWeather from "./HourlyWeather";

export default function Weather() {
  return (
    <div className="p-5 flex flex-col gap-10 md:flex-row">
      <div className="flex flex-col gap-8 text-white w-full">
        <CurrentWeatherDetails />
        <ForecastDailyWeather />
      </div>
      <HourlyWeather />
    </div>
  );
}
