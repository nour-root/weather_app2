import { Skeleton } from "antd";
import { useLoading } from "../shared/LoadingContext";
import getImage from "../helper/getImage";
export default function CurrentWeatherDetails({ current, country, city }) {
  const { isLoading } = useLoading();
  const timeString = String(current.time).split("T");
  let time;
  if (timeString && !isNaN(Date.parse(timeString[0]))) {
    time = new Date(timeString[0]);
  }
  const formatterUS = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
  });
  const apparent_temperature = Math.round(
    Number.parseFloat(current.apparent_temperature)
  );
  return (
    <div className="flex flex-col gap-8 text-white w-full">
      {isLoading ? (
        <Skeleton.Node className="bg-secondary w-full h-[380px] rounded-2xl text-white">
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
                {city} , <span>{country}</span>
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
                {parseInt(current.temperature_2m)}°
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
              <p className="text-2xl">{apparent_temperature}°</p>
            )}
          </div>
        }
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Humidity</p>
          {isLoading ? (
            <div className="bg-white h-0.5 w-4 mt-10"></div>
          ) : (
            <p className="text-2xl">{current.relative_humidity_2m}%</p>
          )}
        </div>
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Wind</p>
          {isLoading ? (
            <div className="bg-white h-0.5 w-4 mt-10"></div>
          ) : (
            <p className="text-2xl">
              {Math.round(Number(current.wind_speed_10m))} km/h
            </p>
          )}
        </div>
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Precipitation</p>
          {isLoading ? (
            <div className="bg-white h-0.5 w-4 mt-10"></div>
          ) : (
            <p className="text-2xl">
              {Math.round(Number(current.precipitation))} mm
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
