import { Dropdown } from "antd";
import getImage from "../helper/getImage";
import { useLoading } from "../shared/LoadingContext";

export default function HourlyWeather({ Hourly, days }) {
  const { isLoading } = useLoading();
  const times = Hourly?.time
    ? Array.from(Hourly.time).slice(8, 20).reverse()
    : [];
  const temps = Hourly.apparent_temperature;
  const codes = Hourly.weather_code;

  const formatterUS = new Intl.DateTimeFormat("en-US", { weekday: "long" });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  });

  const validDays = days
    .map((d) => {
      const date = new Date(d);
      return isNaN(date) ? null : date;
    })
    .filter(Boolean);

  const today = formatterUS.format(validDays[0]);

  const items = validDays.slice(1).map((d) => {
    const day = formatterUS.format(d);
    return { label: <p className="capitalize">{day}</p>, key: day };
  });

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
          {Array.from({ length: 11 }).map((_, i) => {
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
              <span>{today}</span>
              <img src="/assets/images/icon-dropdown.svg" alt="" />
            </button>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center gap-4 max-h-[450px] overflow-x-hidden overflow-y-auto p-2 scroll-color">
          {times.map((t, i) => {
            const date = new Date(t);
            const hourLabel = timeFormatter.format(date);
            const temp = Math.round(Number.parseFloat(temps[i]));
            const icon = getImage(codes[i]);
            return (
              <div
                key={i}
                className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg"
              >
                <div className="flex items-center">
                  <img src={icon} className="size-15" alt="" />
                  <p className="capitalize">{hourLabel}</p>
                </div>
                <p>{temp}°</p>
              </div>
            );
          })}
        </div>
      </div>
    );
}
