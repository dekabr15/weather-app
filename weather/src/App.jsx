import { useState, useEffect } from "react";
import logo from "./assets/images/logo.svg";
import iconUnits from "./assets/images/icon-units.svg";
import iconDropdown from "./assets/images/icon-dropdown.svg";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import HourlyCard from "./components/HourlyCard";
import DetailsCards from "./components/DetailsCards";
import DailyCard from "./components/DailyCard";
import WeatherService from "./api/WeatherService";
import GeoCode from "./api/GeoCode";

function App() {
  const [inputCity, setInputCity] = useState("");
  const [geoCodeData, setGeoCodeData] = useState(null);

  const [selectedCity, setSelectedCity] = useState(null);

  const [activeCity, setActiveCity] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const trimmed = inputCity.trim();
    if (trimmed.length < 3) {
      setGeoCodeData(null);
      return;
    }
    const timerId = setTimeout(async () => {
      try {
        const data = await GeoCode(trimmed);
        setGeoCodeData(data);
      } catch (err) {
        console.error("GeoCode error in App:", err);
      }
    }, 400);

    return () => clearTimeout(timerId);
  }, [inputCity]);

  async function handleWeatherSearch(cityFromButton) {
    const cityToUse = cityFromButton || selectedCity;

    if (!cityToUse) {
      console.warn("Город не выбран");
      return;
    }

    try {
      setWeatherData(null);

      const data = await WeatherService(cityToUse);
      setWeatherData(data);

      setActiveCity(cityToUse);
    } catch (err) {
      console.error("WeatherService error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#02012C] text-slate-100 flex justify-center">
      <section className="w-[95%] flex flex-col md:w-[720px] lg:w-[1216px] lg:max-w-[95%]">
        <header className="mt-12 h-[43px] dmsans text-base font-medium flex justify-between">
          <img
            src={logo}
            alt="logo-weather-app"
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none select-none no-drag"
          />
          <button className="bg-[#262540] w-[119px] rounded-lg flex items-center justify-center gap-2.5">
            <img
              src={iconUnits}
              alt="icon units logo"
              aria-hidden="true"
              draggable="false"
              className="pointer-events-none select-none"
            />
            Units
            <img
              src={iconDropdown}
              alt="icon drop and down"
              aria-hidden="true"
              draggable="false"
              className="pointer-events-none select-none"
            />
          </button>
        </header>

        <div className="mt-16">
          <div className="flex flex-col justify-center">
            <h1 className="bricolage flex justify-center font-bold text-[52px] text-center w-[343px] mx-auto md:w-[482px] lg:w-[731px]">
              How’s the sky looking today?
            </h1>

            <div className="flex justify-center mt-16">
              <SearchBar
                inputCity={inputCity}
                setInputCity={setInputCity}
                geoCodeData={geoCodeData}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                onSearch={handleWeatherSearch}
              />
            </div>
          </div>

          <div className="flex flex-col mt-12 lg:flex-row lg:items-start lg:gap-6">
            <div className="w-full lg:flex-1 lg:max-w-[800px] lg:min-w-0">
              <CurrentWeatherCard
                weatherData={weatherData}
                selectedCity={activeCity}
              />

              <div className="mt-5 w-full grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                <DetailsCards weatherData={weatherData} />
              </div>

              <div className="flex flex-col mt-9">
                <div>
                  <p className="dmsans text-xl font-semibold">Daily forecast</p>
                </div>
                <div className="w-full grid grid-cols-3 gap-3 md:grid-cols-7 md:gap-4 mt-2">
                  <DailyCard
                    weatherData={weatherData}
                    selectedCity={activeCity}
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[384px] mt-8 lg:mt-0 mb-10">
              <HourlyCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
