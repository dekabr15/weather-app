import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import HourlyCard from "./components/HourlyCard";
import DetailsCards from "./components/DetailsCards";
import DailyCard from "./components/DailyCard";
import WeatherService from "./api/WeatherService";
import GeoCode from "./api/GeoCode";
import { languageDetector } from "./api/GeoCode.js";

function App() {
  const [inputCity, setInputCity] = useState("");
  const [geoCodeData, setGeoCodeData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeCity, setActiveCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [searchMessage, setSearchMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const lang = activeCity ? languageDetector(activeCity.name) : "en";

  const [units, setUnits] = useState({
    temperature: "celsius",
    wind: "kmh",
  });

  useEffect(() => {
    const trimmed = inputCity.trim();
    if (trimmed.length < 3) {
      setGeoCodeData(null);
      setSearchMessage(null); // очищаем сообщение, если пользователь стёр текст
      return;
    }

    const timerId = setTimeout(async () => {
      try {
        const data = await GeoCode(trimmed);
        setGeoCodeData(data);
        setSearchMessage(null); // если всё ок, сообщение не нужно
      } catch (err) {
        console.error("GeoCode error in App:", err);

        if (err.code === "NO_RESULTS") {
          setGeoCodeData(null);
          setSearchMessage(
            lang === "en"
              ? "No locations found. Check the spelling."
              : "Ничего не найдено. Проверьте написание."
          );
        } else {
          setGeoCodeData(null);
          setSearchMessage(
            lang === "en"
              ? "Error while searching. Try again."
              : "Ошибка при поиске. Попробуйте ещё раз."
          );
        }
      }
    }, 400);

    return () => clearTimeout(timerId);
  }, [inputCity, lang]);

  async function handleWeatherSearch(cityFromButton) {
    const cityToUse = cityFromButton || selectedCity;

    if (!cityToUse) {
      console.warn("Город не выбран");
      return;
    }

    try {
      setIsLoading(true);
      setHasSearched(true);

      // Не обнуляем weatherData, чтобы не мигал "нет данных"
      const data = await WeatherService(cityToUse);
      setWeatherData(data);
      setActiveCity(cityToUse);
    } catch (err) {
      console.error("WeatherService error:", err);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#02012C] text-slate-100 flex justify-center">
      <section className="w-[95%] flex flex-col md:w-[720px] lg:w-[1216px] lg:max-w-[95%]">
        <Header lang={lang} units={units} setUnits={setUnits} />

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

            <div className="mt-3 flex justify-center min-h-5">
              {searchMessage && (
                <p className="dmsans text-sm text-white/60 text-center">
                  {searchMessage}
                </p>
              )}
            </div>
          </div>

          {weatherData && (
            <div className="flex flex-col mt-3 lg:flex-row lg:items-start lg:gap-6">
              <div className="w-full lg:flex-1 lg:max-w-[800px] lg:min-w-0">
                <CurrentWeatherCard
                  weatherData={weatherData}
                  selectedCity={activeCity}
                  units={units}
                />

                <div className="mt-5 w-full grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                  <DetailsCards
                    weatherData={weatherData}
                    lang={lang}
                    units={units}
                  />
                </div>

                <div className="flex flex-col mt-9">
                  <div>
                    <p className="dmsans text-xl font-semibold">
                      {lang === "en" ? "Daily forecast" : "Ежедневный прогноз"}
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-3 gap-3 md:grid-cols-7 md:gap-4 mt-2">
                    <DailyCard
                      weatherData={weatherData}
                      selectedCity={activeCity}
                      lang={lang}
                      units={units}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[384px] mt-8 lg:mt-0 mb-10">
                <HourlyCard
                  lang={lang}
                  weatherData={weatherData}
                  selectedCity={selectedCity}
                  units={units}
                />
              </div>
            </div>
          )}

          {/* Состояние загрузки */}
          {isLoading && (
            <div className="dmsans text-lg mt-12 flex justify-center text-white/60">
              {lang === "en" ? "Loading forecast..." : "Загружаю прогноз..."}
            </div>
          )}

          {/* Сообщение "ничего не найдено" — только если уже был поиск и данных нет */}
          {!isLoading && hasSearched && !weatherData && (
            <div className="dmsans text-3xl mt-12 flex justify-center">
              {lang === "en" ? (
                <p>No search result found!</p>
              ) : (
                <p>Ничего не найдено по вашему запросу!</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
