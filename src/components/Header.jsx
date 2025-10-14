import { CheckOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useUnit } from "../shared/Unit";
import { Activity, useState } from "react";

export default function Header() {
  const { nameUnit, setNameUnit, setUnit, unit } = useUnit();
  const [name, setName] = useState("imperial");

  function SwitchTOUnit() {
    if (name === "imperial") {
      setNameUnit("imperial");
      setName("metric");
      setUnit({ temp: "F", wind: "mp/h", precipitation: "inch" });
    } else {
      setNameUnit("metric");
      setName("imperial");
      setUnit({ temp: "C", wind: "km/h", precipitation: "mm" });
    }
  }

  const items = [
    {
      label: (
        <p
          onClick={() => SwitchTOUnit()}
          className="font-semibold text-[16px] mb-1"
        >
          Switch to {name}
        </p>
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
            <div
              onClick={() => {
                setUnit({ ...unit, temp: "C" });
              }}
              className="flex justify-between items-center"
            >
              <span>Celsius (&deg; C)</span>
              <Activity
                mode={
                  nameUnit === "metric" && unit.temp === "C"
                    ? "visible"
                    : "hidden"
                }
              >
                <CheckOutlined />
              </Activity>
            </div>
          ),
          key: "celsius",
        },
        {
          label: (
            <div
              onClick={() => {
                setUnit({ ...unit, temp: "F" });
              }}
              className="flex justify-between items-center"
            >
              <span>Fahrenheit (&deg;F)</span>
              <Activity
                mode={
                  nameUnit === "imperial" || unit.temp === "F"
                    ? "visible"
                    : "hidden"
                }
              >
                <CheckOutlined />
              </Activity>
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
            <div
              onClick={() => {
                setUnit({ ...unit, wind: "km/h" });
              }}
              className="flex justify-between items-center"
            >
              <span>km/h</span>
              <Activity
                mode={
                  nameUnit === "metric" && unit.wind === "km/h"
                    ? "visible"
                    : "hidden"
                }
              >
                <CheckOutlined />
              </Activity>
            </div>
          ),
          key: "kmh",
        },
        {
          label: (
            <div
              onClick={() => {
                setUnit({ ...unit, wind: "mp/h" });
              }}
              className="flex justify-between items-center"
            >
              mp/h
              <Activity
                mode={
                  nameUnit === "imperial" || unit.wind === "mp/h"
                    ? "visible"
                    : "hidden"
                }
              >
                <CheckOutlined />
              </Activity>
            </div>
          ),
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
            <div
              onClick={() => {
                setUnit({ ...unit, precipitation: "mm" });
              }}
              className="flex justify-between items-center"
            >
              <span>Millimeters (mm)</span>
              <Activity
                mode={
                  nameUnit === "metric" && unit.precipitation === "mm"
                    ? "visible"
                    : "hidden"
                }
              >
                <CheckOutlined />
              </Activity>
            </div>
          ),
          key: "mm",
        },
        {
          label: (
            <div
              onClick={() => {
                setUnit({ ...unit, precipitation: "inch" });
              }}
              className="flex justify-between items-center"
            >
              Inches (in)
              <Activity
                mode={
                  nameUnit === "imperial" || unit.precipitation === "inch"
                    ? "visible"
                    : "hidden"
                }
              >
                <CheckOutlined />
              </Activity>
            </div>
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
