import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import WeatherSection from "./components/weatherSection";

function App() {
  return (
    <div className="bg-background">
      <Header />
      <SearchSection />
      <WeatherSection />
    </div>
  );
}

export default App;
