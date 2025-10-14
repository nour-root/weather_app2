import getImage from "../helper/getImage";
import { useLoading } from "../shared/LoadingContext";
import { useUnit } from "../shared/Unit";

export default function ForecastDailyWeather({ Daily }) {
  const { isLoading } = useLoading();
  const { unit, nameUnit } = useUnit();
  const ConvertUnitTemp = (unitValue) => {
    if (unit.temp === "F") {
      if (nameUnit === "imperial") return Math.floor(unitValue);
      let temp = (unitValue * 9) / 5 + 32;
      return Math.floor(Number(temp));
    } else if (unit.temp === "C") {
      if (nameUnit === "metric") return Math.floor(unitValue);
      let temp = ((unitValue - 32) * 5) / 9;
      return Math.floor(temp);
    }
  };

  const times = Daily.time ? Array.from(Daily.time).length : [];
  const temperature_max = Daily.temperature_2m_max
    ? Array.from(Daily.temperature_2m_max)
    : [];
  const temperature_min = Daily.temperature_2m_min
    ? Array.from(Daily.temperature_2m_min)
    : [];
  const weather_code = Daily.weather_code ? Array.from(Daily.weather_code) : [];

  const DayFormatter = Intl.DateTimeFormat("en-US", { weekday: "short" });

  function getDays() {
    let days = [];
    for (let i = 0; i < times; i++) {
      let t = new Date();
      days.push({ time: t.setDate(t.getDate() + i) });
    }
    return days;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Daily Forecast</h2>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {Array.from({ length: 7 }).map((t, i) => (
            <div
              key={i}
              className="bg-secondary p-4 min-[140px] min-h-[228px] rounded-lg space-y-4 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  } else
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Daily Forecast</h2>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {getDays().map((t, i) => (
            <div key={i} className="bg-secondary p-4 rounded-lg space-y-4">
              <p className="capitalize text-lg">
                {DayFormatter.format(t.time)}
              </p>
              <img src={getImage(weather_code[i])} alt="weather icon" />
              <div className="flex justify-between items-center w-full text-lg">
                <p>{ConvertUnitTemp(temperature_max[i])}°</p>
                <p>{ConvertUnitTemp(Number(temperature_min[i]))}°</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
