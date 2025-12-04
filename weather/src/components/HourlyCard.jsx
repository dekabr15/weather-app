import { useState, useEffect, useRef } from "react";
import Cards from "./Cards";
import WeatherIcon from "./WeatherIcon";
import iconDropdown from "../assets/images/icon-dropdown.svg";
import DropDownDays from "./DropDownDays";

export default function HourlyCard({ weatherData, lang }) {
  const placeholders = Array.from({ length: 24 });

  const [dropDownDays, setDropDownDays] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const unitsRef = useRef(null);

  function handleDropOpen() {
    setDropDownDays((prev) => !prev);
  }

  useEffect(() => {
    if (!dropDownDays) return;

    function handleClickOutside(e) {
      if (unitsRef.current && !unitsRef.current.contains(e.target)) {
        setDropDownDays(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropDownDays]);

  if (!weatherData) {
    return (
      <Cards className="h-[693px] w-full flex flex-col">
        <section className="px-6 pt-6">
          <div className="flex flex-row justify-between items-center">
            <p className="dmsans font-semibold text-lg">
              {lang === "en" ? "Hourly forecast" : "Почасовой прогноз"}
            </p>

            <button className="relative w-[150px] h-[37px] bg-[#3C3B5E] hover:bg-[#42415e] rounded-lg flex items-center justify-between pl-4 pr-4">
              <span className="dmsans text-sm">
                {lang === "en" ? "Today" : "Сегодня"}
              </span>
              <img src={iconDropdown} alt="icon Dropdown" />
            </button>
          </div>
        </section>

        <div className="w-[99%] mt-4 flex-1 overflow-y-auto px-4 pb-4 space-y-3 custom-scrollbar">
          {placeholders.map((_, index) => (
            <div
              key={index}
              className="w-full h-[60px] bg-[#3C3B5E] rounded-xl border-2 border-[#5c5b71]/50"
            />
          ))}
        </div>
      </Cards>
    );
  }

  const locale = lang === "ru" ? "ru-RU" : "en-US";

  const hourlyItems = weatherData.hourly.time.map((date, index) => ({
    key: index,
    date,
    timeLabel: date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: lang === "ru" ? "2-digit" : undefined,
      hour12: locale === "en-US",
      timeZone: "UTC",
    }),
    iconCode: weatherData.hourly.weather_code[index],
    temp: Math.round(weatherData.hourly.temperature_2m[index]),
    unit: "°",
  }));

  const dailyTime = weatherData.daily?.time ?? [];
  const safeDayIndex =
    dailyTime.length === 0
      ? 0
      : Math.min(selectedDayIndex, dailyTime.length - 1);

  const selectedDayDate = dailyTime[safeDayIndex];

  const selectedDayLabel = selectedDayDate
    ? selectedDayDate.toLocaleDateString(locale, {
        weekday: "long",
        timeZone: "UTC",
      })
    : lang === "en"
    ? "Today"
    : "Сегодня";

  let hourlyItemsForDay = hourlyItems;

  if (selectedDayDate) {
    const selectedStr = selectedDayDate.toISOString().slice(0, 10);

    hourlyItemsForDay = hourlyItems.filter((item) => {
      const dayStr = item.date.toISOString().slice(0, 10);
      return dayStr === selectedStr;
    });
  } else {
    hourlyItemsForDay = hourlyItems.slice(0, 24);
  }

  return (
    <Cards className="h-[693px] w-full flex flex-col relative">
      <section className="px-6 pt-6">
        <div className="flex flex-row justify-between items-center">
          <p className="dmsans font-semibold text-lg">
            {lang === "en" ? "Hourly forecast" : "Почасовой прогноз"}
          </p>

          <div ref={unitsRef} className="relative">
            <button
              onClick={handleDropOpen}
              className="relative w-[150px] h-[37px] bg-[#3C3B5E] hover:bg-[#42415e] rounded-lg flex items-center justify-between pl-4 pr-4 "
            >
              <span className="dmsans text-sm">{selectedDayLabel}</span>
              <img
                className={`${dropDownDays ? "rotate-180" : ""}`}
                src={iconDropdown}
                alt="icon Dropdown"
              />
            </button>

            {dropDownDays && (
              <DropDownDays
                lang={lang}
                weatherData={weatherData}
                selectedDayIndex={safeDayIndex}
                onSelectDay={(index) => {
                  setSelectedDayIndex(index);
                  setDropDownDays(false);
                }}
              />
            )}
          </div>
        </div>
      </section>

      <div className="w-[99%] mt-4 flex-1 overflow-y-auto px-4 pb-4 space-y-3 custom-scrollbar">
        {hourlyItemsForDay.map((item) => (
          <Cards
            key={item.key}
            className="w-full h-[60px] bg-[#3C3B5E] rounded-xl border-2 border-[#5c5b71]/50 hover:bg-[#42415e]/50 px-4 flex"
          >
            <div className="flex flex-row justify-between items-center flex-1 ">
              <div className="flex flex-1 items-center gap-2">
                <WeatherIcon code={item.iconCode} className="w-10 h-10" />
                <p className="text-lg font-medium dmsans">{item.timeLabel}</p>
              </div>

              <div>
                <p className="text-xl dmsans font-medium">
                  {item.temp}
                  {item.unit}
                </p>
              </div>
            </div>
          </Cards>
        ))}
      </div>
    </Cards>
  );
}
