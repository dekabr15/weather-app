import { useState, useRef, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import iconUnits from "../assets/images/icon-units.svg";
import iconDropdown from "../assets/images/icon-dropdown.svg";
import DropDownHeader from "./DropDownHeader";

export default function Header({ lang, units, setUnits }) {
  const [isUnitsOpen, setIsUnitsOpen] = useState(false);
  const unitsRef = useRef(null);

  useEffect(() => {
    if (!isUnitsOpen) return;

    function handleClickOutside(e) {
      if (unitsRef.current && !unitsRef.current.contains(e.target)) {
        setIsUnitsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isUnitsOpen]);

  return (
    <section className="w-full flex flex-col md:w-[720px] lg:w-[1220px] lg:max-w-[98%] mx-auto px-2 md:px-0">
      <header className="mt-12 h-[43px] dmsans text-base font-medium flex justify-between items-center">
        <img
          src={logo}
          alt="logo-weather-app"
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none select-none no-drag"
        />

        <div className="relative" ref={unitsRef}>
          <button
            type="button"
            onClick={() => setIsUnitsOpen((prev) => !prev)}
            className="relative bg-[#262540] hover:bg-[#3C3B5E]
                   h-[43px] w-40 rounded-lg flex items-center
                   justify-start pl-10 pr-8"
          >
            <img
              src={iconUnits}
              alt="icon units logo"
              aria-hidden="true"
              draggable="false"
              className="pointer-events-none select-none absolute left-4 top-1/2 -translate-y-1/2"
            />

            <span className="dmsans font-medium">
              {lang === "en" ? "Units" : "Настройки"}
            </span>

            <img
              src={iconDropdown}
              alt="icon drop and down"
              aria-hidden="true"
              draggable="false"
              className={`pointer-events-none select-none absolute right-4 top-1/2 -translate-y-1/2 ${
                isUnitsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isUnitsOpen && (
            <DropDownHeader
              lang={lang}
              units={units}
              onChangeUnits={setUnits}
              className="absolute right-0 mt-2"
            />
          )}
        </div>
      </header>
    </section>
  );
}
