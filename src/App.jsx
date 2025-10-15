import { SkeletonTheme } from "react-loading-skeleton";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import WeatherSection from "./components/weatherSection";
import { LoadingProvider } from "./shared/LoadingContext";
import { UnitProvider } from "./shared/Unit";
import { GeoLocationProvider } from "./shared/geolocation";

function App() {
  return (
    <div className="bg-background">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <LoadingProvider>
          <GeoLocationProvider>
            <UnitProvider>
              <Header />
              <SearchSection />
              <WeatherSection />
            </UnitProvider>
          </GeoLocationProvider>
        </LoadingProvider>
      </SkeletonTheme>
    </div>
  );
}

export default App;
