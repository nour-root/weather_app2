import { useEffect, useState } from "react";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import ForecastDailyWeather from "./ForecastDailyWeather";
import HourlyWeather from "./HourlyWeather";
import accessGeoLocationAPI from "../services/AccessGeolocationAPI";
import getCurrentWeather from "../services/getCurrentWeather";
import { useLoading } from "../shared/LoadingContext";
export default function Weather() {
  const { setIsLoading } = useLoading();
  const [current, setCurrent] = useState({});
  const [hourly, setHourly] = useState({});
  const [daily, setDaily] = useState({});
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [days, setDays] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    accessGeoLocationAPI().then((loc) => {
      setIsLoading(true);
      const d = { latitude: loc.data.lat, longitude: loc.data.lon };
      getCurrentWeather(d)
        .then((data) => {
          setIsLoading(true);
          setCity(loc.data.city);
          setCountry(loc.data.country);
          setCurrent(data.data.current);
          setHourly(data.data.hourly);
          setDaily(data.data.daily);
          setDays(data.data.daily.time);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    });
  }, []);
  return (
    <div className="p-5 flex flex-col gap-10 lg:flex-row">
      <div className="flex flex-col gap-8 text-white w-full">
        <CurrentWeatherDetails
          current={current}
          country={country}
          city={city}
        />
        <ForecastDailyWeather Daily={daily} />
      </div>
      <HourlyWeather Hourly={hourly} days={days} />
    </div>
  );
}
