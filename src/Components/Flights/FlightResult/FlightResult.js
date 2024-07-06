import React, { useState, useEffect } from "react";
import FlightResultCart from "./FlightResultCart";
import { useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./flightResult.css";
import { useAuth } from "../../../MyContext";
import Footer from "../../Footer/Footer";


export default function FlightResult(props) {
  const location = useLocation();
  const searchSource = location.state?.loc;
  const searchDestination = location.state?.loc2;
  const formattedDay = location.state?.day;
  const selectedDay = location.state?.selectedDate;
  const {numberOfAdults} = useAuth();
  // console.log(selectedDay);

  const [flightDataResult, setFlightDataResult] = useState(
    location.state?.flightDataSearch
  );
  const totalFlights = flightDataResult.length;

  const [filteredFlightsCount, setFilteredFlightsCount] = useState(totalFlights);

  
  useEffect(() => {
    setFilteredFlightsCount(flightDataResult.length);
  }, [flightDataResult]);


  const minPrice = 2000;
  const maxPrice = 2500;

  const minTime = 1;
  const maxTime = 9;

  const [price, setPrice] = useState(maxPrice);
  const [hour, setHour] = useState(maxTime);
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(true);
  const [isDropdownVisible3, setIsDropdownVisible3] = useState(true);
  const [isDropdownVisible4, setIsDropdownVisible4] = useState(true);

  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedStop, setSelectedStop] = useState(null);

  const [isNonStopChecked, setIsNonStopChecked] = useState(false);
  const [isOneStopChecked, setIsOneStopChecked] = useState(false);
  const [isTwoStopChecked, setIsTwoStopChecked] = useState(false);

  useEffect(() => {
    if (!isNonStopChecked && !isOneStopChecked && !isTwoStopChecked) {
      setFlightDataResult(location.state?.flightDataSearch);
    }
  }, [
    isNonStopChecked,
    isOneStopChecked,
    isTwoStopChecked,
    location.state?.flightDataSearch,
  ]);

  const [selectedTime, setSelectedTime] = useState(null);
  const [isMorningChecked, setIsMorningChecked] = useState(false);
  const [isAfternoonChecked, setIsAfternoonChecked] = useState(false);
  const [isEveningChecked, setIsEveningChecked] = useState(false);
  const [isNightChecked, setIsNightChecked] = useState(false);

  useEffect(() => {
    if (!isMorningChecked && !isAfternoonChecked && !isEveningChecked && !isNightChecked) {
      setFlightDataResult(location.state?.flightDataSearch);
    }
  }, [
    isMorningChecked, 
    isAfternoonChecked, 
    isEveningChecked, 
    isNightChecked,
    location.state?.flightDataSearch,
  ]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleDropdown2 = () => {
    setIsDropdownVisible2(!isDropdownVisible2);
  };

  const toggleDropdown3 = () => {
    setIsDropdownVisible3(!isDropdownVisible3);
  };

  const toggleDropdown4 = () => {
    setIsDropdownVisible4(!isDropdownVisible4);
  };

  const handlePriceChange = (event) => {
    setPrice(parseInt(event.target.value));
    console.log("azam");
    filterByPrice();
  };

  const handleTimeChange = (event) => {
    setHour(parseInt(event.target.value));
    console.log("time");
    filterByDuration();
  };

  
  

  const sortFlightByPrice = () => {
    console.log("price");
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    SortPrice(newSortOrder);
  };

  const sortFlightByDuration = () => {
    console.log("time");

    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    SortByDuration(newSortOrder);
  };

  const sortFlightByDeparture = () => {
    console.log("departure");

    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    SortByDepartureTime(newSortOrder);
  };

  const sortFlightByArival = () => {
    console.log("arival");

    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    SortByArivalTime(newSortOrder);
  };

  const smartSort = () => {
    console.log("smartSort");

    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    SmartSort(newSortOrder);
  };

  async function SortPrice(sortOrder) {
    try {
      console.log("getting sorted Price");
      console.log(formattedDay);

      const sort = sortOrder === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&sort={"ticketPrice":${sort}}`;

      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  async function SortByDuration(sortDuration) {
    try {
      console.log("getting sorted time");
      console.log(formattedDay);

      const sort = sortDuration === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&sort={"duration":${sort}}`;

      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  async function SortByDepartureTime(DepartureTime) {
    try {
      console.log("getting sorted Departure");
      console.log(formattedDay);

      const sort = DepartureTime === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&sort={"departureTime":${sort}}`;

      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  async function SortByArivalTime(ArivalTime) {
    try {
      console.log("getting sorted ArivalTime");
      console.log(formattedDay);

      const sort = ArivalTime === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&sort={"arrivalTime":${sort}}`;

      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  async function SmartSort(sortSmart) {
    try {
      console.log("smartsort");
      console.log(formattedDay);

      const sort = sortSmart === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&sort={"duration":${sort},"ticketPrice":${sort}}`;
      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  const toggleNonStop = () => {
    setIsNonStopChecked(!isNonStopChecked);
    if (!isNonStopChecked) {
      setSelectedStop(0);
      setIsOneStopChecked(false);
      setIsTwoStopChecked(false);
      filterByStop(0);
    }
  };

  const toggleOneStop = () => {
    setIsOneStopChecked(!isOneStopChecked);
    if (!isOneStopChecked) {
      setSelectedStop(1);
      setIsNonStopChecked(false);
      setIsTwoStopChecked(false);
      filterByStop(1);
    }
  };

  const toggleTwoStop = () => {
    setIsTwoStopChecked(!isTwoStopChecked);
    if (!isTwoStopChecked) {
      setSelectedStop(2);
      setIsNonStopChecked(false);
      setIsOneStopChecked(false);
      filterByStop(2);
    }
  };

  async function filterByStop(stop) {
    try {
      console.log("stops");
      console.log(formattedDay);

      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&filter={"stops":"${stop}"}`;
      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  async function filterByPrice() {
    try {
      console.log("filterByPrice");
      console.log(formattedDay);

      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&filter={"ticketPrice":{"$lte":${price},"$gte":${minPrice}}}`;

      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  async function filterByDuration() {
    try {
      console.log("filterByDuration");
      console.log(formattedDay);

      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&filter={"duration":{"$lte":${hour},"$gte":${minTime}}}`;

      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }


  
  const handleMorningChange = (t) => {
    setIsMorningChecked(!isMorningChecked);
    if (!isMorningChecked) {
      setSelectedTime(8, 12);
      setIsAfternoonChecked(false); 
      setIsEveningChecked(false); 
      setIsNightChecked(false);
      filterByDepartureTime(8, 12);
    }
  };

  
  const handleAfternoonChange = () => {
    setIsAfternoonChecked(!isAfternoonChecked);
    if (!isAfternoonChecked) {
      setSelectedTime(12, 16);
      setIsMorningChecked(false); 
      setIsEveningChecked(false); 
      setIsNightChecked(false);
      filterByDepartureTime(12, 16);
    }
  };

  
  const handleEveningChange = () => {
    setIsEveningChecked(!isEveningChecked);
    if (!isEveningChecked) {
      setSelectedTime(16, 20);
      setIsMorningChecked(false); 
      setIsAfternoonChecked(false); 
      setIsNightChecked(false);
      filterByDepartureTime(16, 20);
    }
  };

  
  const handleNightChange = () => {
    setIsNightChecked(!isNightChecked);
    if(!isNightChecked) {
      setSelectedTime(20, 24);
      setIsMorningChecked(false); 
      setIsAfternoonChecked(false); 
      setIsEveningChecked(false); 
      filterByDepartureTime(20,24);
    }
  };

  async function filterByDepartureTime(maxHour, minHour) {
    try {
      console.log("Filter by Departure Time");
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&filter={"departureTime":{"$gte":${maxHour},"$lt":${minHour}}}`;
  
      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.flights);
      setFlightDataResult(data?.data?.flights);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }
  

  

  return (
    <main className="resultPage-main-div">
      <div className="row">
        <div className="column1">
          <aside className="aside-left">
          {/* <p>Number of Adults: {numberOfAdults}</p> */}
            <div
              className={`custom-dropdown ${isDropdownVisible ? "active" : ""}`}
            >
              <div className="dropdown-header" onClick={toggleDropdown}>
                <h4>Stops</h4>
                <KeyboardArrowUpIcon />
              </div>
              <div className="dropdown-content">
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="non-stop"
                    checked={isNonStopChecked}
                    onChange={toggleNonStop}
                  />
                  <label htmlFor="non-stop" className="dropdown-value">
                    Non-stop
                  </label>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="one-stop"
                    checked={isOneStopChecked}
                    onChange={toggleOneStop}
                  />
                  <label htmlFor="one-stop" className="dropdown-value">
                    1 stop
                  </label>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="two-stop"
                    checked={isTwoStopChecked}
                    onChange={toggleTwoStop}
                  />
                  <label htmlFor="one-stop" className="dropdown-value">
                    2 stop
                  </label>
                </div>
              </div>
            </div>
            <div
              className={`custom-dropdown ${
                isDropdownVisible2 ? "active" : ""
              }`}
            >
              <div className="dropdown-header" onClick={toggleDropdown2}>
                <h4>Departure time</h4>
                <KeyboardArrowUpIcon />
              </div>
              <div className="dropdown-content">
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="morning"
                    checked={isMorningChecked}
                    onChange={handleMorningChange}
                  />
                  <div className="label-container">
                    <label htmlFor="morning" className="dropdown-value">
                      Morning
                    </label>
                    <label htmlFor="morning" className="dropdown-value">
                      8 am-Noon
                    </label>
                  </div>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="afternoon"
                    checked={isAfternoonChecked}
                    onChange={handleAfternoonChange}
                  />
                  <div className="label-container">
                    <label htmlFor="afternoon" className="dropdown-value">
                      Afternoon
                    </label>
                    <label htmlFor="afternoon" className="dropdown-value">
                      Noon-4 pm
                    </label>
                  </div>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="evening"
                    checked={isEveningChecked}
                    onChange={handleEveningChange}
                  />
                  <div className="label-container">
                    <label htmlFor="evening" className="dropdown-value">
                      Evening
                    </label>
                    <label htmlFor="evening" className="dropdown-value">
                      4 pm-8 pm
                    </label>
                  </div>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    checked={isNightChecked}
                    onChange={handleNightChange}
                  />
                  <div className="label-container">
                    <label htmlFor="night" className="dropdown-value">
                      Night
                    </label>
                    <label
                      htmlFor="night"
                      className="dropdown-value right-align"
                    >
                      8 pm-Midnight
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`custom-dropdown ${
                isDropdownVisible3 ? "active" : ""
              }`}
            >
              <div className="dropdown-header" onClick={toggleDropdown3}>
                <h4>One-wap price</h4>
                <KeyboardArrowUpIcon />
              </div>
              <div className="dropdown-content">
                <div className="dropdown-content-box2">
                  <p>Up to &#8377;{price}</p>
                  <input
                    type="range"
                    id="priceRange"
                    name="priceRange"
                    min={minPrice}
                    max={maxPrice}
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
            </div>
            <div
              className={`custom-dropdown ${
                isDropdownVisible4 ? "active" : ""
              }`}
            >
              <div className="dropdown-header" onClick={toggleDropdown4}>
                <h4>Trip duration</h4>
                <KeyboardArrowUpIcon />
              </div>
              <div className="dropdown-content">
                <div className="dropdown-content-box2">
                  <div className="min-max-labels">
                    <p>{minTime} hours</p>
                    <p>{hour} hours</p>
                  </div>
                  <input
                    type="range"
                    id="priceRange"
                    name="priceRange"
                    min={minTime}
                    max={maxTime}
                    value={hour}
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="column2">
          <div className="flight-result-top">
            <p style={{cursor:"default"}}>Airlines</p>
            <p onClick={sortFlightByDeparture}>Departure</p>
            <p onClick={sortFlightByDuration}>Duration</p>
            <p onClick={sortFlightByArival}>Arrival</p>
            <p onClick={sortFlightByPrice}>Price</p>
            <p onClick={smartSort}>Smart sort</p>
          </div>
          {flightDataResult && flightDataResult.map((item) => (
            <div className="flight-result-page">
              <FlightResultCart
                FlightId={item.flightID}
                Id={item._id}
                DepartureTime={item.departureTime}
                Duration={item.duration}
                Stops={item.stops}
                ArivalTime={item.arrivalTime}
                Price={item.ticketPrice}
                AvailableSeats={item.availableSeats}
                formattedDay={formattedDay}
                selectedDate={selectedDay}
                source={item.source}
                destination={item.destination}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
