import React, { useState, useEffect } from "react";
import FlightResultCart from "./FlightResultCart";
import { useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./flightResult.css";
// import "./flightResultCart.css";

export default function FlightResult(props) {
  const location = useLocation();
  const searchSource = location.state?.loc;
  const searchDestination = location.state?.loc2;

  const [flightDataResult, setFlightDataResult] = useState(
    location.state?.flightDataSearch
  );

  const minPrice = 5202;
  const maxPrice = 63536;

  const minTime = 1;
  const maxTime = 27;

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
  }, [isNonStopChecked, isOneStopChecked, isTwoStopChecked, location.state?.flightDataSearch]);
  


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
  };

  const handleTimeChange = (event) => {
    setHour(parseInt(event.target.value));
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

      const sort = sortOrder === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=Fri&sort={"ticketPrice":${sort}}`;

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

      const sort = sortDuration === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=Fri&sort={"duration":${sort}}`;

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

      const sort = DepartureTime === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=Fri&sort={"departureTime":${sort}}`;

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

      const sort = ArivalTime === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=Fri&sort={"arrivalTime":${sort}}`;

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

      const sort = sortSmart === "asc" ? 1 : -1;
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=Fri&sort={"duration":${sort},"ticketPrice":${sort}}`;
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

      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=Fri&&filter={"stops":"${stop}"}`;
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
            <div>
              {flightDataResult.length} of {flightDataResult.length} flights
            </div>
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
                    name="one-stop"
                  />
                  <div className="label-container">
                    <label htmlFor="one-stop" className="dropdown-value">
                      Morning
                    </label>
                    <label htmlFor="non-stop" className="dropdown-value">
                      8 am-Noon
                    </label>
                  </div>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="one-stop"
                  />
                  <div className="label-container">
                    <label htmlFor="one-stop" className="dropdown-value">
                      Afternoon
                    </label>
                    <label htmlFor="non-stop" className="dropdown-value">
                      Noon-4 pm
                    </label>
                  </div>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="one-stop"
                  />
                  <div className="label-container">
                    <label htmlFor="one-stop" className="dropdown-value">
                      Evening
                    </label>
                    <label htmlFor="non-stop" className="dropdown-value">
                      Noon-4 pm-8pm
                    </label>
                  </div>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="one-stop"
                  />
                  <div className="label-container">
                    <label htmlFor="one-stop" className="dropdown-value">
                      Night
                    </label>
                    <label
                      htmlFor="non-stop"
                      className="dropdown-value right-align"
                    >
                      8-pm Midnight
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
                    <p>{minTime}hour</p>
                    <p>{hour} hour</p>
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
            <p>Airlines</p>
            <p onClick={sortFlightByDeparture}>Departure</p>
            <p onClick={sortFlightByDuration}>Duration</p>
            <p onClick={sortFlightByArival}>Arrival</p>
            <p onClick={sortFlightByPrice}>Price</p>
            <p onClick={smartSort}>Smart sort</p>
          </div>
          {flightDataResult.map((item) => (
            <div className="flight-result-page">
              <FlightResultCart
                FlightId={item.flightID}
                DepartureTime={item.departureTime}
                Duration={item.duration}
                Stops={item.stops}
                ArivalTime={item.arrivalTime}
                Price={item.ticketPrice}
                AvailableSeats={item.availableSeats}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
