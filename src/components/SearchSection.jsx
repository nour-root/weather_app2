import { Activity, useState } from "react";
import countries_cities from "../countries_cities.json";
import { useGeoLocation } from "../shared/geolocation";
import axios from "axios";
export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { setGeoLocation } = useGeoLocation();

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (String(value).trim() === "") {
      setLoading(false);
      setSuggestions([]);
      setQuery("");
      return;
    }
    setLoading(true);

    await new Promise((r) => setTimeout(r, 500));
    const filtered = countries_cities.flatMap((country) => {
      if (country.name.toLowerCase().startsWith(value.toLowerCase())) {
        return {
          city: null,
          country: country.name,
        };
      }
      const matchedCities = country.cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      return matchedCities.map((city) => ({
        city,
        country: country.name,
      }));
    });
    setSuggestions(filtered.slice(0, 15));
    setLoading(false);
  };

  const handleSelect = (c) => {
    if (c.country) setQuery(c.country);
    if (c.city) setQuery(c.city);
    setSuggestions([]);
  };
  const GetWeatherByCityName = async (query) => {
    if (query) {
      try {
        const data = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`
        );
        const lat = data.data.results[0].latitude;
        const long = data.data.results[0].longitude;
        const d = { latitude: lat, longitude: long };
        setGeoLocation({
          lat: d.latitude,
          long: d.longitude,
          city: city,
          country: country,
        });
      } catch (error) {
        return console.log(error);
      }
    } else {
      return Promise.resolve(null);
    }
  };

  return (
    <section className="text-white p-4 my-6 space-y-10">
      <h1 className="text-6xl font-Bricolage text-center">
        How's the sky looking today?
      </h1>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="relative w-full md:w-1/3 bg-secondary flex items-center space-x-4 p-3 rounded-lg">
          <img src="/assets/images/icon-search.svg" alt="" />
          <input
            name="city"
            type="text"
            autoComplete="off"
            value={query}
            onChange={handleChange}
            className="text-white font-medium tracking-wide focus:outline-0"
            placeholder="Search for a place..."
          />
          <Activity mode={suggestions.length > 0 ? "visible" : "hidden"}>
            <ul className="absolute max-h-60 left-0 right-0 top-14 bg-secondary rounded-lg overflow-auto z-50">
              {loading ? (
                <li className="px-4 py-2 h-full bg-secondary flex items-center gap-4 z-50">
                  <img
                    src="/assets/images/icon-loading.svg"
                    className="animate-spin"
                    alt=""
                  />
                  Search in progress
                </li>
              ) : (
                suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setCity(s.city);
                      setCountry(s.country);
                      handleSelect(s);
                    }}
                    className="px-4 py-2 h-full flex items-center cursor-pointer hover:bg-accent"
                  >
                    {s.city === null ? (
                      <span>{s.country}</span>
                    ) : (
                      <>
                        <span>{s.city}</span>,<span>{s.country}</span>
                      </>
                    )}
                  </li>
                ))
              )}
            </ul>
          </Activity>
        </div>
        <button
          onClick={() => GetWeatherByCityName(query)}
          type="button"
          className="bg-primary w-full p-2.5 rounded-lg hover:bg-primary/90 md:w-fit"
        >
          Search
        </button>
      </div>
    </section>
  );
}
