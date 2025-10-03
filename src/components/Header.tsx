export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src="/assets/images/logo.svg" alt="" />
      </div>
      <button className="text-white bg-secondary-foreground p-2 rounded-lg space-x-2 flex">
        <img src="/assets/images/icon-units.svg" alt="" />
        <span>Units</span>
        <img src="/assets/images/icon-dropdown.svg" alt="" />
      </button>
    </header>
  );
}
