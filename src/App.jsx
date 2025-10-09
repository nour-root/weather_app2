import { SkeletonTheme } from "react-loading-skeleton";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import WeatherSection from "./components/weatherSection";
import { LoadingProvider } from "./shared/LoadingContext";

function App() {
  return (
    <div className="bg-background">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <LoadingProvider>
          <Header />
          <SearchSection />
          <WeatherSection />
        </LoadingProvider>
      </SkeletonTheme>
    </div>
  );
}

export default App;
