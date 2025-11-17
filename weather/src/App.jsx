import logo from ".//assets/images/logo.svg";
import iconUnits from "./assets/images/icon-units.svg";
import iconDropdown from "./assets/images/icon-dropdown.svg";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import HourlyCard from "./components/HourlyCard";
import DetailsCards from "./components/DetailsCards";
import DailyCard from "./components/DailyCard";

function App() {
  return (
    <>
      <div className=" min-h-screen bg-[#02012C] text-slate-100 flex justify-center">
        <section className="w-[1216px] flex flex-col">
          <header className="mt-12    h-[43px]  dmsans text-base font-medium flex justify-between">
            <img
              src={logo}
              alt="logo-weather-app"
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none select-none no-drag"
            />
            <button className="bg-[#262540] w-[119px] rounded-lg flex items-center justify-center gap-2.5">
              <img
                src={iconUnits}
                alt="icon units logo"
                aria-hidden="true"
                draggable="false"
                className="pointer-events-none select-none"
              />
              Units
              <img
                src={iconDropdown}
                alt="icon drop and down"
                aria-hidden="true"
                draggable="false"
                className="pointer-events-none select-none"
              />
            </button>
          </header>

          <div className="mt-16 ">
            <div>
              <h1 className="bricolage flex justify-center font-bold text-[52px]">
                How’s the sky looking today?
              </h1>
              <div className="flex justify-center mt-16">
                <SearchBar />
              </div>
            </div>

            <div className="flex justify-between  mt-12">
              <div className="w-[800px]  ">
                <CurrentWeatherCard />

                <div className="flex justify-between">
                  <DetailsCards />
                  <DetailsCards />
                  <DetailsCards />
                  <DetailsCards />
                </div>

                <div className=" flex flex-col mt-12 h-[209px]  ">
                  <div>
                    <p className="dmsans text-xl font-semibold  ">
                      Daily forecast
                    </p>
                  </div>
                  <div className="flex justify-between mt-3">
                    <DailyCard />
                    <DailyCard />
                    <DailyCard />
                    <DailyCard />
                    <DailyCard />
                    <DailyCard />
                    <DailyCard />
                  </div>
                </div>
              </div>

              <div className="w-[384px]  bg-white/10">
                <HourlyCard />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
