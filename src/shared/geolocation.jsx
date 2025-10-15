import { createContext, useContext, useState } from "react";

const GeoLocationContext = createContext(false);
const GeoLocationProvider = ({ children }) => {
  const [geoLocation, setGeoLocation] = useState({
    lat: null,
    long: null,
    city: "",
    country: "",
  });
  return (
    <GeoLocationContext.Provider value={{ geoLocation, setGeoLocation }}>
      {children}
    </GeoLocationContext.Provider>
  );
};
const useGeoLocation = () => useContext(GeoLocationContext);
export { useGeoLocation, GeoLocationProvider };
