import { createContext, useContext, useState } from "react";

const LoadingContext = createContext(false);
const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
const useLoading = () => useContext(LoadingContext);
export { useLoading, LoadingProvider };
