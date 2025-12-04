import Cards from "./Cards";

export default function DropDownHeader({
  lang,
  units,
  onChangeUnits,
  className = "",
}) {
  const sections = [
    {
      id: "temperature",
      title: lang === "en" ? "Temperature" : "Температура",
      options: [
        {
          value: "celsius",
          label: lang === "en" ? "Celsius (°C)" : "Цельсий (°C)",
        },
        {
          value: "fahrenheit",
          label: lang === "en" ? "Fahrenheit (°F)" : "Фаренгейт (°F)",
        },
      ],
    },
    {
      id: "wind",
      title: lang === "en" ? "Wind speed" : "Скорость ветра",
      options: [
        {
          value: "kmh",
          label: lang === "en" ? "km/h" : "км/ч",
        },
        {
          value: "mph",
          label: "mph",
        },
      ],
    },
  ];

  return (
    <Cards
      className={`w-[214px] p-4 bg-[#262540] rounded-xl z-50 ${className}`}
    >
      <h1 className="dmsans font-medium text-[16px]">
        {lang === "en" ? "Units of measurement" : "Единицы измерения"}
      </h1>

      {sections.map((section, index) => (
        <section key={section.id} className={index === 0 ? "mt-4" : "mt-3"}>
          {index !== 0 && <hr className="border-white/10 mb-3" />}

          <p className="text-xs text-white/60 mb-2">{section.title}</p>

          <div className="space-y-2">
            {section.options.map((opt) => {
              const id = `${section.id}-${opt.value}`;
              const checked = units[section.id] === opt.value;

              return (
                <div key={opt.value}>
                  <input
                    type="radio"
                    name={section.id}
                    id={id}
                    value={opt.value}
                    className="peer hidden"
                    checked={checked}
                    onChange={() =>
                      onChangeUnits((prev) => ({
                        ...prev,
                        [section.id]: opt.value,
                      }))
                    }
                  />
                  <label
                    htmlFor={id}
                    className="
                      flex items-center justify-between w-full
                        px-3 py-2 text-sm cursor-pointer
                      hover:bg-white/5
                      peer-checked:bg-white/10    peer-checked:rounded-lg
                    "
                  >
                    <span>{opt.label}</span>
                    <span className="opacity-0 peer-checked:opacity-100">
                      ✓
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </Cards>
  );
}
