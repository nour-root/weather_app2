import { createContext, useState, useContext } from "react";

const UnitContext = createContext("C");

const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState({
    temp: "C",
    wind: "km/h",
    precipitation: "mm",
  });
  const [nameUnit, setNameUnit] = useState("metric");
  return (
    <UnitContext.Provider value={{ unit, setUnit, nameUnit, setNameUnit }}>
      {children}
    </UnitContext.Provider>
  );
};
const useUnit = () => useContext(UnitContext);
export { useUnit, UnitProvider };
