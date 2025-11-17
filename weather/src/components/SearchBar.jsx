import searchLogo from "../assets/images/icon-search.svg";

export default function SearchBar() {
  return (
    <>
      <div className="w-[656px] h-14 flex justify-between  ">
        <div>
          <div className="relative ">
            <img
              src={searchLogo}
              alt="search button logo"
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none select-none absolute inset-y-0 left-6 my-auto"
            />

            <input
              type="text"
              className="w-[526px] h-14 bg-[#262540]  rounded-lg pl-15 dmsans font-medium text-xl placeholder:text-[#D4D3D9] outline-none    cursor-pointer"
              placeholder="Search for a place..."
            />
          </div>
        </div>
        <div>
          <button className="bg-[#4658D9] w-[114px] h-14 rounded-xl dmsans font-medium text-xl cursor-pointer hover:bg-[#2B1B9C]">
            Search
          </button>
        </div>
      </div>
    </>
  );
}
