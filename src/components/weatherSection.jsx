import { useEffect, useState } from "react";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import ForecastDailyWeather from "./ForecastDailyWeather";
import HourlyWeather from "./HourlyWeather";
import accessGeoLocationAPI from "../services/AccessGeolocationAPI";
import getCurrentWeather from "../services/getCurrentWeather";
import { useLoading } from "../shared/LoadingContext";
import { useUnit } from "../shared/Unit";
import { useGeoLocation } from "../shared/geolocation";
export default function Weather() {
  const { geoLocation } = useGeoLocation();
  const { nameUnit } = useUnit();
  const { setIsLoading } = useLoading();
  const [current, setCurrent] = useState({});
  const [currentUnit, setCurrentUnit] = useState({});
  const [hourly, setHourly] = useState({});
  const [daily, setDaily] = useState({});
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (geoLocation.lat && geoLocation.long) {
      const data = { latitude: geoLocation.lat, longitude: geoLocation.long };
      getCurrentWeather(data, nameUnit)
        .then((data) => {
          console.log(geoLocation.city);
          setIsLoading(true);
          setCity(geoLocation.city);
          setCountry(geoLocation.country);
          setCurrent(data.data.current);
          setCurrentUnit(data.data.current_units);
          setHourly(data.data.hourly);
          setDaily(data.data.daily);
        })
        .catch((error) => {
          setIsLoading(true);
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      accessGeoLocationAPI().then((loc) => {
        setIsLoading(true);
        const d = { latitude: loc.data.lat, longitude: loc.data.lon };
        getCurrentWeather(d, nameUnit)
          .then((data) => {
            setIsLoading(true);
            setCity(loc.data.city);
            setCountry(loc.data.country);
            setCurrent(data.data.current);
            setCurrentUnit(data.data.current_units);
            setHourly(data.data.hourly);
            setDaily(data.data.daily);
          })
          .catch((error) => {
            setIsLoading(true);
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      });
    }
  }, [nameUnit, geoLocation]);
  return (
    <div className="p-5 flex flex-col gap-10 lg:flex-row">
      <div className="flex flex-col gap-8 text-white w-full">
        <CurrentWeatherDetails
          current={current}
          country={country}
          city={city}
          current_units={currentUnit}
        />
        <ForecastDailyWeather Daily={daily} />
      </div>
      <HourlyWeather Hourly={hourly} />
    </div>
  );
}
