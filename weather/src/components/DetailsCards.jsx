import Cards from "./Cards";

export default function DetailsCards({ weatherData, lang }) {
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

  const detailItems = [
    {
      key: "feelsLike",
      label: labels.feelsLike,
      value: weatherData
        ? +Math.round(weatherData.current.temperature_2m)
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
        ? +Math.round(weatherData.hourly.wind_speed_10m[0])
        : "-",
      unit: " m/s",
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
