import React, { useState, useEffect } from "react";
import FlightResultCart from "./FlightResultCart";
import { useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./flightResult.css";

export default function FlightResult(props) {
  const location = useLocation();
  const flightDataResult = location.state?.flightDataSearch || [];

  const [price, setPrice] = useState(50); // Initial price value
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleDropdown2 = () => {
    setIsDropdownVisible2(!isDropdownVisible2);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  useEffect(() => {
    console.log("Gazala");
    console.log(flightDataResult);
  }, [FlightResultCart]);

  return (
    <main className="resultPage-main-div">
      <div className="row">
        <div className="column1">
          <aside className="aside-left">
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
                  />
                  <label htmlFor="one-stop" className="dropdown-value">
                    1 stop
                  </label>
                </div>
                <div className="dropdown-content-box">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    name="one-stop"
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
                    name="non-stop"
                  />
                  <div className="label-container">
                    <label htmlFor="one-stop" className="dropdown-value">
                      Morning
                    </label>
                    <label
                      htmlFor="non-stop"
                      className="dropdown-value right-align"
                    >
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

            <div>
              <label htmlFor="priceRange">Price Range:</label>
              <input
                type="range"
                id="priceRange"
                name="priceRange"
                min="0"
                max="100"
                value={price}
                onChange={handlePriceChange}
              />
              <p>Selected Price: ${price}</p>
            </div>
          </aside>
        </div>
        <div className="column2"></div>
      </div>
    </main>
  );
}
