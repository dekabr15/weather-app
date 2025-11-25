import Cards from "./Cards";

export default function DetailsCards({ weatherData }) {
  const detailItems = [
    {
      key: "feelsLike",
      label: "Feels Like",
      value: weatherData
        ? +Math.round(weatherData.current.temperature_2m)
        : "-",
      unit: "°",
    },
    {
      key: "humidity",
      label: "Humidity",
      value: weatherData ? +weatherData.hourly.relative_humidity_2m[0] : "-",
      unit: "%",
    },
    {
      key: "wind",
      label: "Wind",
      value: weatherData
        ? +Math.round(weatherData.hourly.wind_speed_10m[0])
        : "-",
      unit: " m/s",
    },
    {
      key: "precipitation",
      label: "Precipitation",
      value: weatherData
        ? +Math.round(weatherData.hourly.precipitation[0])
        : "-",
      unit: " mm",
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
