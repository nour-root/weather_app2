import { Dropdown } from "antd";

export default function HourlyWeather() {
  const items = [
    {
      label: <p>Monday</p>,
      key: "Monday",
    },
    {
      label: <p>Tuesday</p>,
      key: "Tuesday",
    },
    {
      label: <p>Wednesday</p>,
      key: "Wednesday",
    },
    {
      label: <p>Thursday</p>,
      key: "Thursday",
    },
    {
      label: <p>friday</p>,
      key: "friday",
    },
    {
      label: <p>saturday</p>,
      key: "saturday",
    },
    {
      label: <p>Sunday</p>,
      key: "Sunday",
    },
  ];
  return (
    <div className="md:w-1/3 h-fit p-4 bg-secondary rounded-lg text-white space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Hourly Forecast</h2>
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          overlayClassName="custom-dropdown-menu2"
        >
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-muted/20 cursor-pointer">
            <span>Tuesday</span>
            <img src="/assets/images/icon-dropdown.svg" alt="" />
          </button>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center gap-4 max-h-[450px] overflow-x-hidden overflow-y-auto p-2 scroll-color">
        <div className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg">
          <div className="flex items-center">
            <img
              src="/assets/images/icon-overcast.webp"
              className="size-15"
              alt=""
            />
            <p className="capitalize">5 PM</p>
          </div>
          <p>12°</p>
        </div>
        <div className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg">
          <div className="flex items-center">
            <img
              src="/assets/images/icon-overcast.webp"
              className="size-15"
              alt=""
            />
            <p className="capitalize">5 PM</p>
          </div>
          <p>12°</p>
        </div>
        <div className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg">
          <div className="flex items-center">
            <img
              src="/assets/images/icon-overcast.webp"
              className="size-15"
              alt=""
            />
            <p className="capitalize">5 PM</p>
          </div>
          <p>12°</p>
        </div>
        <div className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg">
          <div className="flex items-center">
            <img
              src="/assets/images/icon-overcast.webp"
              className="size-15"
              alt=""
            />
            <p className="capitalize">5 PM</p>
          </div>
          <p>12°</p>
        </div>
        <div className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg">
          <div className="flex items-center">
            <img
              src="/assets/images/icon-overcast.webp"
              className="size-15"
              alt=""
            />
            <p className="capitalize">5 PM</p>
          </div>
          <p>12°</p>
        </div>
        <div className="flex justify-between items-center px-2 w-full bg-accent mr-2 rounded-lg">
          <div className="flex items-center">
            <img
              src="/assets/images/icon-overcast.webp"
              className="size-15"
              alt=""
            />
            <p className="capitalize">5 PM</p>
          </div>
          <p>12°</p>
        </div>
      </div>
    </div>
  );
}
