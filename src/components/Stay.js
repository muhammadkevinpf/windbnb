import React from "react";
import { MdStar } from "react-icons/md";

function Stay(props) {
  const { stay, key } = props;

  return (
    <div className="w-full md:w-3/6 lg:w-2/6 p-3" key={key}>
      <img
        src={stay.photo}
        alt={stay.title}
        className="w-full h-80 rounded-2xl"
      />
      <div className="flex justify-between mt-2">
        <div className="flex items-center font-montserrat">
          {stay.superHost && (
            <span className="text-xs font-bold p-2 pt-1 pb-1 mr-2 text-main border-gray">
              SUPER HOST
            </span>
          )}
          <span className="text-sm pr-2 text-secondary">{stay.type}</span>
          {stay.beds && (
            <span className="text-sm text-secondary">{stay.beds} beds</span>
          )}
        </div>
        <div className="flex items-center">
          <MdStar className="text-red-400" />
          <span className="text-sm text-secondary">{stay.rating}</span>
        </div>
      </div>
      <span className="font-montserrat font-semibold mt-2 text-main">
        {stay.title}
      </span>
    </div>
  );
}

export default Stay;
