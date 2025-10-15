import { Skeleton } from "antd";
import { useLoading } from "../shared/LoadingContext";
import getImage from "../helper/getImage";
import { useUnit } from "../shared/Unit";
export default function CurrentWeatherDetails({
  current,
  country,
  city,
  current_units,
}) {
  //(0°C × 9/5) + 32 = 32°F
  // speedMph = speedKmH * 0.621371;
  const { isLoading } = useLoading();
  const { unit, nameUnit } = useUnit();

  const time = new Date();
  const formatterUS = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
  });
  const apparent_temperature = Math.round(Number(current.apparent_temperature));
  const ConvertUnitTemp = (unitValue) => {
    if (unit.temp === "F") {
      if (nameUnit === "imperial") return unitValue;
      let temp = (unitValue * 9) / 5 + 32;
      return Math.floor(Number(temp));
    } else if (unit.temp === "C") {
      if (nameUnit === "metric") return unitValue;
      let temp = ((unitValue - 32) * 5) / 9;
      return Math.floor(temp);
    }
  };
  const ConvertUnitWind = (unitValue) => {
    if (unit.wind === "mp/h") {
      if (nameUnit === "imperial") return unitValue;
      let wind = unitValue * 0.621371;
      return Math.floor(wind);
    } else if (unit.wind === "km/h") {
      if (nameUnit === "metric") return unitValue;
      let wind = unitValue * 1.60934;
      return Math.floor(wind);
    }
  };
  const ConvertUnitPrecipitation = (unitValue) => {
    if (unit.precipitation === "mm") {
      if (nameUnit === "imperial") return unitValue;
      let inch = unitValue * 0.0393701;
      return Math.floor(inch);
    } else if (unit.precipitation === "inch") {
      if (nameUnit === "metric") return unitValue;
      let mm = unitValue * 25.4;
      return Math.floor(mm);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-white w-full">
      {isLoading ? (
        <Skeleton.Node
          active
          className="bg-secondary w-full h-[380px] rounded-2xl text-white"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <img
              src="/assets/images/icon-loading.svg"
              className="size-14 animate-spin"
            />
            <p className="text-2xl">Loading...</p>
          </div>
        </Skeleton.Node>
      ) : (
        <div className={`overflow-hidden relative md:w-full object-cover`}>
          <img
            src="/assets/images/bg-today-small.svg"
            alt=""
            className="sm:hidden w-full"
          />
          <img
            src="/assets/images/bg-today-large.svg"
            alt=""
            className="max-sm:hidden w-full"
          />
          <div className="absolute p-6 w-full h-full top-0 flex flex-col items-center justify-around gap-6 sm:flex-row">
            <div className="text-center space-y-2 capitalize">
              <p className="text-2xl md:text-3xl font-semibold">
                {city === null ? (
                  <span>{country}</span>
                ) : (
                  <>
                    {city} , <span>{country}</span>
                  </>
                )}
              </p>
              <p className="md:text-lg">{formatterUS.format(time)}</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <img
                src={getImage(current.weather_code)}
                className="size-34"
                alt=""
              />
              <p className="lg:text-8xl text-6xl italic font-semibold">
                {Math.round(Number(current.temperature_2m))}°
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {
          <div className="bg-secondary p-4 rounded-lg space-y-4">
            <p className="capitalize text-lg">feels Like</p>
            {isLoading ? (
              <div className="bg-white h-0.5 w-4 mt-10"></div>
            ) : (
              <p className="text-2xl">
                {ConvertUnitTemp(apparent_temperature) +
                  " " +
                  (unit.temp === "C" ? "°C" : "°F")}
              </p>
            )}
          </div>
        }
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Humidity</p>
          {isLoading ? (
            <div className="bg-white h-0.5 w-4 mt-10"></div>
          ) : (
            <p className="text-2xl">
              {current.relative_humidity_2m +
                "" +
                current_units.relative_humidity_2m}
            </p>
          )}
        </div>
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Wind</p>
          {isLoading ? (
            <div className="bg-white h-0.5 w-4 mt-10"></div>
          ) : (
            <p className="text-2xl">
              {ConvertUnitWind(Math.round(current.wind_speed_10m)) +
                " " +
                (unit.wind === "km/h" ? "Km/h" : "mp/h")}
            </p>
          )}
        </div>
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Precipitation</p>
          {isLoading ? (
            <div className="bg-white h-0.5 w-4 mt-10"></div>
          ) : (
            <p className="text-2xl">
              {ConvertUnitPrecipitation(Number(current.precipitation))}{" "}
              {unit.precipitation === "mm" ? "mm" : "inch"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
