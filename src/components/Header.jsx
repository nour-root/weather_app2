import { CheckOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

export default function Header() {
  const items = [
    {
      label: (
        <p className="font-semibold text-[16px] mb-1">Switch to imperial</p>
      ),
      key: "imperial",
    },
    {
      label: <p className="text-gray-400 text-xs font-semibold">Temperature</p>,
      key: "title-temp",
      type: "group",
      children: [
        {
          label: (
            <div className="flex justify-between items-center">
              <span>Celsius (°C)</span>
              <CheckOutlined />
            </div>
          ),
          key: "celsius",
        },
        {
          label: (
            <div className="flex justify-between items-center">
              Fahrenheit (°F)
            </div>
          ),
          key: "fahrenheit",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      label: <p className="text-gray-400 text-xs font-semibold">Wind Speed</p>,
      key: "title-wind",
      type: "group",
      children: [
        {
          label: (
            <div className="flex justify-between items-center">
              <span>km/h</span>
              <CheckOutlined />
            </div>
          ),
          key: "kmh",
        },
        {
          label: <div className="flex justify-between items-center">mph</div>,
          key: "mph",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      label: (
        <p className="text-gray-400 text-xs font-semibold">Precipitation</p>
      ),
      key: "title-precip",
      type: "group",
      children: [
        {
          label: (
            <div className="flex justify-between items-center">
              <span>Millimeters (mm)</span>
              <CheckOutlined />
            </div>
          ),
          key: "mm",
        },
        {
          label: (
            <div className="flex justify-between items-center">Inches (in)</div>
          ),
          key: "inches",
        },
      ],
    },
  ];
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src="/assets/images/logo.svg" alt="" />
      </div>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        overlayClassName="custom-dropdown-menu"
      >
        <button className="text-white bg-secondary-foreground p-2 rounded-lg space-x-2 flex hover:bg-muted/30 cursor-pointer">
          <img src="/assets/images/icon-units.svg" alt="" />
          <span>Units</span>
          <img src="/assets/images/icon-dropdown.svg" alt="" />
        </button>
      </Dropdown>
    </header>
  );
}
