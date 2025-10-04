export default function CurrentWeatherDetails() {
  return (
    <div className="flex flex-col gap-8 text-white w-full">
      <div className="overflow-hidden relative md:w-full object-cover">
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
              Berlin, Germany
            </p>
            <p className="md:text-lg">tuesday, Aug 5, 2025</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <img
              src="/assets/images/icon-sunny.webp"
              className="size-34"
              alt=""
            />
            <p className="lg:text-8xl text-6xl italic font-semibold">20°</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">feels Like</p>
          <p className="text-2xl">18°</p>
        </div>
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Humidity</p>
          <p className="text-2xl">46%</p>
        </div>
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Wind</p>
          <p className="text-2xl">14 km/h</p>
        </div>
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <p className="capitalize text-lg">Precipitation</p>
          <p className="text-2xl">0 mm</p>
        </div>
      </div>
    </div>
  );
}
