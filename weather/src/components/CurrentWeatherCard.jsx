import Cards from "./Cards";
import WeatherIcon from "./WeatherIcon";
import iconLoading from "../assets/images/icon-loading.svg";
import { languageDetector } from "../api/GeoCode.js";

let str = languageDetector("ghbdtn");
console.log("languageDetector result: ", str);

export default function CurrentWeatherCard({ weatherData, selectedCity }) {
  const strBG =
    "bg-cover bg-no-repeat bg-center border-none bg-[url('/src/assets/images/bg-today-small.svg')] md:bg-[url('/src/assets/images/bg-today-large.svg')]";

  console.log("selectedCity: ", selectedCity);
  console.log("weatherData: ", weatherData);

  const hasData = weatherData && selectedCity;

  let formattedDate = "";
  if (hasData) {
    const lang = languageDetector(selectedCity.name);
    const locale = lang === "ru" ? "ru-RU" : "en-US";

    formattedDate = weatherData.current.time.toLocaleDateString(locale, {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <Cards className={`h-[286px] ${hasData ? strBG : ""}`}>
      {hasData ? (
        <div className="h-full flex flex-col items-center p-6 justify-center gap-3 text-center pt-[41px] md:flex-row md:justify-between md:text-left">
          <div>
            <h1 className="dmsans font-bold text-[38px]">
              {selectedCity.name}, {selectedCity.country}
            </h1>
            <h2 className="dmsans text-sm text-slate-300">{formattedDate}</h2>
          </div>

          <div className="flex flex-row items-center justify-center gap-15">
            <WeatherIcon
              code={weatherData.current.weather_code}
              className="w-[120px] h-[120px]"
            />
            <p className="dmsans font-semibold italic text-[98px]">
              {Math.round(weatherData.current.temperature_2m)}°
            </p>
          </div>
        </div>
      ) : (
        <div className="relative h-[286px] grid place-items-center text-center">
          <div>
            <img
              className="w-12 h-12 mx-auto mb-3 animate-spin"
              src={iconLoading}
              alt="Loading icon"
            />
            <h1 className="text-4xl">loading...</h1>
          </div>
        </div>
      )}
    </Cards>
  );
}
