import React, { useEffect, useState } from "react";
import { MdClose, MdLocationCity, MdSearch } from "react-icons/md";

function SearchBar(props) {
  const {
    isOpen,
    city,
    guests,
    stayCity,
    openSearchBar,
    setGuests,
    setCity,
    totalGuest,
    onSearch,
  } = props;

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (isOpen && e.code === "Escape") openSearchBar();
    });
  }, [openSearchBar, isOpen]);

  const [showFilter, setShowFilter] = useState({
    location: false,
    guests: false,
  });

  const addAdultGuest = () =>
    setGuests({ ...guests, adults: (guests.adults += 1) });

  const addChildrenGuest = () =>
    setGuests({ ...guests, children: (guests.children += 1) });

  const minAdultGuest = () =>
    guests.adults > 0 && setGuests({ ...guests, adults: (guests.adults -= 1) });

  const minChildrenGuest = () =>
    guests.children > 0 &&
    setGuests({ ...guests, children: (guests.children -= 1) });

  const openLocation = () => setShowFilter({ location: true, guests: false });

  const openGuest = () => setShowFilter({ location: false, guests: true });

  const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  const onChangeCity = (val) => setCity(val);

  const arrCity = [...new Set(stayCity)];

  const filterCity = arrCity.filter((cities) =>
    cities.includes(city.toLowerCase())
  );

  const cityMarkUp = (arrOfCity) =>
    arrOfCity.map((cities, index) => (
      <div
        className="flex items-center p-2 text-secondary"
        onClick={() => onChangeCity(capitalizeWord(cities) + ", Finland")}
        key={index}
      >
        <MdLocationCity className="mr-2" />
        <span>{capitalizeWord(cities)}, Finland</span>
      </div>
    ));

  const guestMarkUp = (category) => (
    <div className={category === "children" && "mt-6"}>
      <p className="font-bold">{capitalizeWord(category)}</p>
      <p className="text-secondary">
        {category === "adults" ? "Ages 13 or above" : "Ages 2-12"}
      </p>
      <div className="flex align-center mt-2">
        <button
          type="button"
          className="px-2 pb-1 border-2 rounded"
          onClick={() =>
            category === "adults" ? minAdultGuest() : minChildrenGuest()
          }
        >
          {" "}
          -{" "}
        </button>
        <span className="px-2 font-bold font-mulish text-lg">
          {category === "adults" ? guests.adults : guests.children}
        </span>
        <button
          type="button"
          className="px-2 pb-1 border-2 rounded"
          onClick={() =>
            category === "adults" ? addAdultGuest() : addChildrenGuest()
          }
        >
          {" "}
          +{" "}
        </button>
      </div>
    </div>
  );

  const searchButton = (
    <React.Fragment>
      <button
        type="button"
        className="flex items-center bg-red-500 py-4 px-6 rounded"
        onClick={() => onSearch()}
      >
        <MdSearch className="mr-1" /> <span className="text-sm">Search</span>
      </button>
    </React.Fragment>
  );

  return (
    <div
      className={`fixed top-0 left-0 overlay w-full h-full ${
        !isOpen && "hidden"
      }`}
    >
      <div className="bg-white w-full py-2 px-4 sm:py-4 sm:px-12 h-2/3 sm:h-2/4 relative">
        <div className="flex items-center justify-between mb-4 font-mulish font-bold sm:hidden">
          <span>Edit your search</span>
          <MdClose className="text-lg" onClick={() => openSearchBar()}/> 
        </div>
        <div className="flex flex-wrap">
          <div className="relative search-container w-full sm:w-2/6 p-4 border-right location-rounded">
            <input
              type="text"
              value={city}
              placeholder="Add Location"
              className="w-full focus:outline-none"
              onChange={(e) => onChangeCity(e.target.value)}
              onFocus={() => openLocation()}
            />
            <label className="font-mulish font-extrabold text-xxs absolute top-1 left-4">
              LOCATION
            </label>
          </div>
          <div className="relative search-container w-full sm:w-2/6 p-4 border-right guest-rounded">
            <input
              type="text"
              value={totalGuest ? `${totalGuest} guest(s)` : ""}
              placeholder="Add Guests"
              className="w-full guests-input cursor-pointer focus:outline-none"
              onClick={() => openGuest()}
              readOnly
            />
            <label className="font-mulish font-extrabold text-xxs absolute top-1 left-4">
              GUESTS
            </label>
          </div>
          <div className="hidden md:flex justify-center search-container w-2/6 search-rounded text-white">
            {searchButton}
          </div>
        </div>
        <div className="flex relative">
          <div
            className={`w-full md:w-2/6 lg:w-2/6 mt-4 ${
              !showFilter.location && "hidden"
            }`}
          >
            {city ? cityMarkUp(filterCity) : cityMarkUp(arrCity)}
          </div>
          <div
            className={`w-full md:w-2/6 lg:w-2/6 mt-4 sm:absolute left-1/3 ml-4 ${
              !showFilter.guests && "hidden"
            }`}
          >
            {guestMarkUp("adults")}
            {guestMarkUp("children")}
          </div>
        </div>
        <div className="absolute bottom-6 left-1/3 text-white sm:hidden">{searchButton}</div>
      </div>
    </div>
  );
}

export default SearchBar;
