import { useRef, useState, useEffect } from "react";
import Cards from "./Cards";
import searchLogo from "../assets/images/icon-search.svg";

export default function SearchBar({
  setInputCity,
  geoCodeData,
  selectedCity,
  setSelectedCity,
  onSearch,
}) {
  const inputSityValue = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleInputChange() {
    setSelectedCity(null);

    if (!inputSityValue.current) return;

    const value = inputSityValue.current.value;
    setInputCity(value);

    const trimmed = value.trim();
    if (trimmed.length >= 3) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }

  function handleSitySearch() {
    if (selectedCity && onSearch) {
      onSearch(selectedCity);
    } else if (inputSityValue.current) {
      setInputCity(inputSityValue.current.value);
    }
    setIsDropdownOpen(false);
  }

  function handleSelectCity(item) {
    setSelectedCity(item);
    console.log("Выбрали город: ", item);
    if (inputSityValue.current) {
      inputSityValue.current.value = `${item.name}, ${item.country ?? ""}`;
    }
    setIsDropdownOpen(false);
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[640px] flex flex-col md:flex-row items-center gap-3">
        <div className="w-full md:flex-1">
          <div className="relative">
            <img
              src={searchLogo}
              alt="search button logo"
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none select-none absolute inset-y-0 left-6 my-auto"
            />

            <input
              type="text"
              ref={inputSityValue}
              onChange={handleInputChange}
              className="w-full h-14 bg-[#262540] hover:bg-[#3C3B5E]  rounded-lg pl-15 dmsans font-medium text-xl placeholder:text-[#D4D3D9] outline-none cursor-pointer"
              placeholder="Search for a place..."
            />

            {isDropdownOpen && geoCodeData?.results?.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 z-30">
                <Cards className="w-full gap-3.5 p-4 pl-5 rounded-xl">
                  {geoCodeData.results.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectCity(item)}
                      className="
                        block w-full text-left rounded-lg p-2
                        border border-transparent
                        hover:bg-[#3C3B5E]
                        hover:border-[#7c7c7c]
                      "
                    >
                      {item.name}, {item.country}
                    </button>
                  ))}
                </Cards>
              </div>
            )}
          </div>
        </div>

        <button
          className="bg-[#4658D9] w-full md:w-[114px] h-14 rounded-xl dmsans font-medium text-xl cursor-pointer hover:bg-[#2B1B9C]"
          onClick={handleSitySearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
