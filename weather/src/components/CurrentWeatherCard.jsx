import Cards from "./Cards";
import bgLargeLogo from "../assets/images/bg-today-large.svg";
import bgSmallLogo from "../assets/images/bg-today-small.svg";

export default function CurrentWeatherCard() {
  return (
    <>
      <Cards
        className="h-[286px] bg-cover bg-no-repeat bg-center bg-[url(bgLargeLogo)] border-none"
        style={{ backgroundImage: `url(${bgLargeLogo})` }}
      >
        <p>CurrentWeatherCard</p>
      </Cards>
    </>
  );
}
