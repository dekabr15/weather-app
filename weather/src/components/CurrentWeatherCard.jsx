import Cards from "./Cards";

export default function CurrentWeatherCard() {
  return (
    <>
      <Cards
        className="h-[286px] bg-cover bg-no-repeat bg-center  border-none bg-[url('/src/assets/images/bg-today-small.svg')]
        md:bg-[url('/src/assets/images/bg-today-large.svg')]"
      >
        <p>CurrentWeatherCard</p>
      </Cards>
    </>
  );
}
