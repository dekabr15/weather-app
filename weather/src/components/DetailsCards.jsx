import Cards from "./Cards";

export default function DetailsCards({ weatherData, lang, units }) {
  console.log(lang);

  const LABELS = {
    en: {
      feelsLike: "Feels Like",
      humidity: "Humidity",
      wind: "Wind",
      cloudiness: "Cloudiness",
    },
    ru: {
      feelsLike: "Ощущается как",
      humidity: "Влажность",
      wind: "Ветер",
      cloudiness: "Облачность",
    },
  };

  const labels = LABELS[lang] || LABELS.en;

  const WIND_UNITS = {
    en: {
      ms: " m/s",
      mph: " mph",
    },
    ru: {
      ms: " м/с",
      mph: " миль/ч",
    },
  };

  const windUnitLabel =
    units.wind === "mph"
      ? WIND_UNITS[lang]?.mph || WIND_UNITS.en.mph
      : WIND_UNITS[lang]?.ms || WIND_UNITS.en.ms;

  const detailItems = [
    {
      key: "feelsLike",
      label: labels.feelsLike,
      value: weatherData
        ? units.temperature === "fahrenheit"
          ? Math.round((weatherData.current.temperature_2m * 9) / 5 + 32)
          : Math.round(weatherData.current.temperature_2m)
        : "-",
      unit: "°",
    },

    {
      key: "humidity",
      label: labels.humidity,
      value: weatherData ? +weatherData.hourly.relative_humidity_2m[0] : "-",
      unit: "%",
    },
    {
      key: "wind",
      label: labels.wind,
      value: weatherData
        ? units.wind === "mph"
          ? Math.round(weatherData.hourly.wind_speed_10m[0] * 2.23694)
          : Math.round(weatherData.hourly.wind_speed_10m[0])
        : "-",
      unit: windUnitLabel,
    },

    {
      key: "cloudiness",
      label: labels.cloudiness,
      value: weatherData ? +Math.round(weatherData.hourly.cloud_cover[0]) : "-",
      unit: "%",
    },
  ];

  return (
    <>
      {detailItems.map((detail) => {
        return (
          <Cards className="h-[118px] w-full   md:mt-8 pl-5 " key={detail.key}>
            <h1 className="pt-5 dmsans font-medium  text-[18px] text-[#D4D3D9]">
              {detail.label}
            </h1>
            <p className="pt-2 dmsans font-light text-[32px]">
              {weatherData ? `${detail.value}${detail.unit} ` : "-"}
            </p>
          </Cards>
        );
      })}
    </>
  );
}
