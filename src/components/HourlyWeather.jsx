import { Dropdown } from "antd";
import getImage from "../helper/getImage";
import { useLoading } from "../shared/LoadingContext";
import { useState } from "react";
import { useUnit } from "../shared/Unit";

export default function HourlyWeather({ Hourly }) {
  //hour for current day  0 -> 23 : 24i
  //hour for next day 24i -> 24(i+1) - 1

  const { isLoading } = useLoading();
  const { unit, nameUnit } = useUnit();
  const temps = Hourly.temperature_2m ? Array.from(Hourly.temperature_2m) : [];
  const times = Hourly?.time ? Array.from(Hourly.time) : [];
  const codes = Hourly.weather_code ? Array.from(Hourly.weather_code) : [];
  const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  });

  const days = Array(7)
    .fill(null)
    .map((_, i) => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      return day;
    });

  const [day1, setDay] = useState({
    index: 0,
    day: dayFormatter.format(days[0]),
  });

  let items;
  if (day1.index === 0) {
    items = days
      .map((d, i) => {
        const day = dayFormatter.format(d);
        return {
          label: (
            <p
              onClick={() => {
                setDay({ index: i, day: day });
              }}
              className="capitalize"
              aria-valuetext={i}
            >
              {day}
            </p>
          ),
          key: i,
        };
      })
      .slice(1);
  } else {
    items = days.map((d, i) => {
      const day = dayFormatter.format(d);
      return {
        label: (
          <p
            onClick={() => {
              setDay({ index: i, day: day });
            }}
            className="capitalize"
            aria-valuetext={i}
          >
            {day}
          </p>
        ),
        key: i,
      };
    });
  }
  const getHourlyDay = (indexDay) => {
    let currentDay = 24 * indexDay;
    let nextDay = Math.min(24 * (indexDay + 1) - 1, times.length);
    let elements = [];
    for (let i = currentDay; i < nextDay; i++) {
      let hour = timeFormatter.format(new Date(times[i]));
      let temp = temps[i];
      let icon = codes[i];
      elements.push({ icon, hour, temp });
    }
    return elements.map((el, i) => (
      <div
        key={currentDay + i}
        className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg"
      >
        <div className="flex items-center">
          <img src={getImage(el.icon)} className="size-15" alt="" />
          <p className="capitalize">{el.hour}</p>
        </div>
        <p>{ConvertUnitTemp(Number(el.temp))}°</p>
      </div>
    ));
    // const dayTimes = times.slice(currentDay, nextDay);
    // const dayTemps = temps.slice(currentDay, nextDay);
    // const dayCodes = codes.slice(currentDay, nextDay);
    // return dayTimes.map((timeValue, i) => {
    //   if (!timeValue) return null;

    //   const date = new Date(timeValue);
    //   const hourLabel = timeFormatter.format(date);
    //   const temp = Math.round(Number(dayTemps[i]));
    //   const icon = getImage(dayCodes[i]);

    //   return (
    //     <div
    //       key={currentDay + i}
    //       className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg"
    //     >
    //       <div className="flex items-center">
    //         <img src={icon} className="size-15" alt="" />
    //         <p className="capitalize">{hourLabel}</p>
    //       </div>
    //       <p>{temp}°</p>
    //     </div>
    //   );
    // });
  };
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
  if (isLoading) {
    return (
      <div className="lg:w-1/3 md:w-1/2 h-fit p-4 bg-secondary rounded-lg text-white space-y-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Hourly Forecast</h2>
          <Dropdown
            trigger={["click"]}
            disabled={isLoading}
            className="disabled:hover:!bg-transparent disabled:!pointer-events-none disabled:cursor-default"
            overlayClassName="custom-dropdown-menu2"
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-muted/20 cursor-pointer">
              <span className="bg-white h-0.5 w-4 mt-5"></span>
              <img src="/assets/images/icon-dropdown.svg" alt="" />
            </button>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center gap-4 max-h-[450px] overflow-x-hidden overflow-y-auto p-2 scroll-color">
          {Array.from({ length: 24 }).map((_, i) => {
            return (
              <div
                key={i}
                className="flex justify-between items-center p-6 w-full bg-accent mr-2 rounded-lg animate-pulse"
              ></div>
            );
          })}
        </div>
      </div>
    );
  } else
    return (
      <div className="lg:w-1/3 md:w-1/2 h-fit p-4 bg-secondary rounded-lg text-white space-y-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Hourly Forecast</h2>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            disabled={isLoading}
            overlayClassName="custom-dropdown-menu2"
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-muted/20 cursor-pointer">
              <span aria-valuetext={day1.index}>{day1.day}</span>
              <img src="/assets/images/icon-dropdown.svg" alt="" />
            </button>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center gap-4 max-h-[450px] overflow-x-hidden overflow-y-auto p-2 scroll-color">
          {getHourlyDay(day1.index)}
        </div>
      </div>
    );
}
