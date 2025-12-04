import Cards from "./Cards";

export default function DropDownDays({
  lang,
  weatherData,
  selectedDayIndex,
  onSelectDay,
}) {
  const locale = lang === "ru" ? "ru-RU" : "en-US";

  if (!weatherData?.daily?.time) return null;

  const days = weatherData.daily.time.map((date, index) => {
    const label = date.toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });

    return { index, label };
  });

  return (
    <Cards className="w-[214px] max-h-[313px] absolute right-0 top-12 bg-[#262540] rounded-xl p-2 z-50">
      <div className="flex flex-col gap-1">
        {days.map((day) => (
          <button
            key={day.index}
            type="button"
            onClick={() => onSelectDay(day.index)}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm dmsans hover:bg-white/5
              ${day.index === selectedDayIndex ? "bg-white/10" : ""}`}
          >
            {day.label}
          </button>
        ))}
      </div>
    </Cards>
  );
}
