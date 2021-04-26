import React from "react";
import logo from "../logo.svg";
import { MdSearch } from "react-icons/md";

function Nav(props) {
  const { city, openSearchBar, totalGuest, onSearch } = props;

  return (
    <div className="flex justify-between flex-wrap">
      <img src={logo} alt="windbnb" className="mb-6"/>
      <div className="search-container flex items-center font-mulish font-normal">
        <div className={`p-4 border-right pointer${!city && " text-gray-400"}`} onClick={() => openSearchBar()}>
          {city ? city : "Change Location"}
        </div>
        <div className={`p-4 border-right pointer${!totalGuest && " text-gray-400"}`} onClick={() => openSearchBar()}>
          {totalGuest > 0 ? `${totalGuest} Guests` : "Add Guests"}
        </div>
        <div className="p-4 text-xl text-red-400 pointer">
          <MdSearch onClick={() => onSearch()} />
        </div>
      </div>
    </div>
  );
}

export default Nav;
