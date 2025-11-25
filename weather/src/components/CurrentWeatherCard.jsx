import Cards from "./Cards";
import WeatherIcon from "./WeatherIcon";
import iconLoading from "../assets/images/icon-loading.svg";
import { languageDetector } from "../api/GeoCode.js";

export default function CurrentWeatherCard({ weatherData, selectedCity }) {
  const strBG =
    "bg-cover bg-no-repeat bg-center border-none bg-[url('/src/assets/images/bg-today-small.svg')] md:bg-[url('/src/assets/images/bg-today-large.svg')]";

  const hasData = weatherData && selectedCity;

  if (!hasData) {
    return (
      <Cards className="relative h-[286px]">
        <div className="relative h-full grid place-items-center text-center">
          <div>
            <img
              className="w-12 h-12 mx-auto mb-3 animate-spin"
              src={iconLoading}
              alt="Loading icon"
            />
            <h1 className="text-4xl">loading...</h1>
          </div>
        </div>
      </Cards>
    );
  }

  const lang = languageDetector(selectedCity.name);
  const locale = lang === "ru" ? "ru-RU" : "en-US";

  const formattedDate = weatherData.current.time.toLocaleDateString(locale, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Cards className={`relative h-[286px] ${strBG}`}>
      <div className="h-full flex flex-col p-6 gap-3 md:flex-row md:items-center">
        {/* ЛЕВЫЙ БЛОК: город + дата */}
        <div className="flex-1 text-center md:text-left md:pr-32">
          <h1 className="dmsans font-bold text-[38px] leading-tight">
            {selectedCity.name}, {selectedCity.country}
          </h1>
          <h2 className="dmsans text-sm text-slate-300">{formattedDate}</h2>
        </div>

        {/* ПРАВЫЙ БЛОК: температура + иконка под ней */}
        <div className="relative flex items-center justify-end shrink-0 pr-6">
          <WeatherIcon
            code={weatherData.current.weather_code}
            className="absolute right-50 w-[120px] h-[120px] z-0"
          />
          <p className="relative z-10 dmsans font-semibold italic text-[98px] leading-none pr-8">
            {Math.round(weatherData.current.temperature_2m)}°
          </p>
        </div>
      </div>
    </Cards>
  );
}
