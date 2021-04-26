import { useState } from "react";
import "./App.css";
import { Nav, Stay, SearchBar } from "./components";
import stays from "./stays.json";

function App() {
  //state
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState({ adults: 0, children: 0 });
  const [currentStay, setCurrentStay] = useState(stays);
  const [isOpen, setIsOpen] = useState(false);

  const staysLength = currentStay.length;
  const mapStays = currentStay.map((stays, index) => (
    <Stay stay={stays} key={index} />
  ));

  const openSearchBar = () => setIsOpen(!isOpen);

  const totalGuest = guests.adults + guests.children;

  const fetchCity = stays.map((stay) => stay.city.toLowerCase());

  const getCity = city.split(",")[0] || "";

  const onSearch = () => {
    if (getCity) {
      setCurrentStay(stays.filter((stay) => stay.city === getCity));
    } else if (totalGuest) {
      setCurrentStay(stays.filter((stay) => stay.maxGuests === totalGuest));
    } else if (getCity && totalGuest) {
      setCurrentStay(
        stays.filter(
          (stay) => stay.city === getCity && stay.maxGuests === totalGuest
        )
      );
    } else {
      setCurrentStay(stays);
    }
    openSearchBar(!isOpen);
  };

  return (
    <div className="py-2 px-4 sm:py-4 sm:px-12 relative -z-10">
      <Nav
        guests={guests}
        city={city}
        openSearchBar={openSearchBar}
        totalGuest={totalGuest}
        setCurrentStay={setCurrentStay}
        stays={stays}
        onSearch={onSearch}
      />
      <SearchBar
        isOpen={isOpen}
        city={city}
        stayCity={fetchCity}
        guests={guests}
        setCity={setCity}
        setGuests={setGuests}
        totalGuest={totalGuest}
        openSearchBar={openSearchBar}
        onSearch={onSearch}
      />
      <div className="mt-11 flex justify-between">
        <h3 className="font-montserrat font-bold text-2xl">Stays in Finland</h3>
        <span className="text-sm font-montserrat">{staysLength}+ stays</span>
      </div>
      <div className="flex flex-wrap">{mapStays}</div>
      <div className="flex justify-center mt-4 text-secondary">
        <span>
          created by
          <span className="font-montserrat font-bold"> Muhammad Kevin</span>-
          devChallenges.io
        </span>
      </div>
    </div>
  );
}

export default App;
