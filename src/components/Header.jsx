import { Dropdown, Space } from "antd";

export default function Header() {
  const items = [
    {
      label: <p>1st menu item</p>,
      key: "0",
    },
    {
      label: <p>2nd menu item</p>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <p>3rd menu item</p>,
      key: "3",
    },
  ];
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src="/assets/images/logo.svg" alt="" />
      </div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <button className="text-white bg-secondary-foreground p-2 rounded-lg space-x-2 flex hover:bg-muted/30">
          <Space>
            <img src="/assets/images/icon-units.svg" alt="" />
            <span>Units</span>
            <img src="/assets/images/icon-dropdown.svg" alt="" />
          </Space>
        </button>
      </Dropdown>
    </header>
  );
}
