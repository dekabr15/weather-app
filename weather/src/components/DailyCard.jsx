import Cards from "./Cards";
import WeatherIcon from "./WeatherIcon";
import { languageDetector } from "../api/GeoCode.js";

export default function DailyCard({ weatherData, selectedCity }) {
  if (!weatherData || !weatherData.daily || !selectedCity) {
    const placeholders = Array.from({ length: 7 });

    return (
      <>
        {placeholders.map((_, index) => (
          <Cards
            key={index}
            className="h-[165px] w-full flex flex-col items-center justify-center gap-2"
          >
            <p className="dmsans text-sm text-[#D4D3D9] opacity-40">---</p>
            <div className="w-12 h-12 rounded-full bg-white/5 opacity-40" />
            <div className="flex flex-row justify-between w-full px-6 text-[#D4D3D9] opacity-40">
              <p className="dmsans text-[14px]">-°</p>
              <p className="dmsans text-[14px]">-°</p>
            </div>
          </Cards>
        ))}
      </>
    );
  }

  const lang = languageDetector(selectedCity.name);
  const locale = lang === "ru" ? "ru-RU" : "en-US";

  const dailyItems = weatherData.daily.time.map((date, index) => ({
    key: index,
    day: date.toLocaleDateString(locale, { weekday: "short" }),
    iconCode: weatherData.daily.weather_code[index],
    minTemp: Math.round(weatherData.daily.temperature_2m_min[index]),
    maxTemp: Math.round(weatherData.daily.temperature_2m_max[index]),
    unit: "°",
  }));

  return (
    <>
      {dailyItems.slice(0, 7).map((item) => (
        <Cards
          key={item.key}
          className="h-[165px] w-full flex flex-col items-center justify-center gap-2"
        >
          <p className="dmsans text-sm text-[#D4D3D9]">{item.day}</p>

          <WeatherIcon code={item.iconCode} className="w-20 h-20" />

          <div className="flex flex-row justify-between w-full px-6 dmsans text-[14px]">
            <p>
              {item.minTemp}
              {item.unit}
            </p>

            <p>
              {item.maxTemp}
              {item.unit}
            </p>
          </div>
        </Cards>
      ))}
    </>
  );
}
