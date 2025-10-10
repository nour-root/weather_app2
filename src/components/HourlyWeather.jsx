import { Dropdown } from "antd";
import getImage from "../helper/getImage";
import { useLoading } from "../shared/LoadingContext";
import { useState } from "react";

export default function HourlyWeather({ Hourly }) {
  //hour for current day  0 -> 23 : 24i
  //hour for next day 24i -> 24(i+1) - 1

  const { isLoading } = useLoading();

  const temps = Hourly.temperature_2m ? Array.from(Hourly.temperature_2m) : [];
  const times = Hourly?.time ? Array.from(Hourly.time) : [];
  const codes = Hourly.weather_code ? Array.from(Hourly.weather_code) : [];
  const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  });

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const days = Array(7)
    .fill(null)
    .map((_, i) => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      return formatDate(day);
    });

  const validDays = days
    .map((d) => {
      const date = new Date(d);
      return date;
    })
    .filter(Boolean);

  const [day1, setDay] = useState({
    index: 0,
    day: dayFormatter.format(validDays[0]),
  });

  let items;
  if (day1.index === 0) {
    items = validDays
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
    items = validDays.map((d, i) => {
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
  function getHourlyDay(indexDay) {
    let currentDay = 24 * indexDay;
    let nextDay = Math.min(24 * (indexDay + 1) - 1, times.length);
    const dayTimes = times.slice(currentDay, nextDay);
    const dayTemps = temps.slice(currentDay, nextDay);
    const dayCodes = codes.slice(currentDay, nextDay);
    return dayTimes.map((timeValue, i) => {
      if (!timeValue) return null;

      const date = new Date(timeValue);
      const hourLabel = timeFormatter.format(date);
      const temp = Math.round(Number(dayTemps[i]));
      const icon = getImage(dayCodes[i]);

      return (
        <div
          key={currentDay + i}
          className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg"
        >
          <div className="flex items-center">
            <img src={icon} className="size-15" alt="" />
            <p className="capitalize">{hourLabel}</p>
          </div>
          <p>{temp}°</p>
        </div>
      );
    });
  }

  if (isLoading) {
    return (
      <div className="lg:w-1/3 md:w-1/2 h-fit p-4 bg-secondary rounded-lg text-white space-y-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Hourly Forecast</h2>
          <Dropdown
            trigger={["click"]}
            overlayClassName="custom-dropdown-menu2"
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-muted/20 cursor-pointer">
              <span className="bg-white h-0.5 w-4 mt-5"></span>
              <img src="/assets/images/icon-dropdown.svg" alt="" />
            </button>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center gap-4 max-h-[450px] overflow-x-hidden overflow-y-auto p-2 scroll-color">
          {Array.from({ length: 12 }).map((_, i) => {
            return (
              <div
                key={i}
                className="flex justify-between items-center p-6 w-full bg-accent mr-2 rounded-lg"
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
