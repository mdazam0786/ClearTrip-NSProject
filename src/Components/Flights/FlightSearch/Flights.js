import React, { useEffect, useState } from "react";
import "./flights.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdPersonOutline } from "react-icons/md";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { RiFlightLandFill } from "react-icons/ri";
import { BsArrowLeftRight } from "react-icons/bs";
import Navbar from "../../Navbar/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { MdOutlineCalendarMonth } from "react-icons/md";
import FlightResult from "../FlightResult/FlightResult";
import { useNavigate } from "react-router-dom";

export default function Flights() {
  const [flightData, setFlightData] = useState(null);
  const [Airports, setAirports] = useState([]);
  const [searchSource, setSearchSource] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const navigate = useNavigate();

  const [offerImage, setOfferImage] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offerImage.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [offerImage.length]);

  const handleSearch = (e) => {
    setSearchSource(e.target.value);
    setShowDropdown(true);
  };

  const handleSearchDestination = (e) => {
    setSearchDestination(e.target.value);
    setShowDropdown2(true);
  };

  const handleAirportSelection = (airport) => {
    setSearchSource(`${airport.iata_code} - ${airport.name}`);
    setShowDropdown(false);
  };

  const handleAirportSelection2 = (airport) => {
    setSearchDestination(`${airport.iata_code} - ${airport.name}`);
    setShowDropdown2(false);
  };

  useEffect(() => {
    async function fetchAirports() {
      try {
        const url = `https://academics.newtonschool.co/api/v1/bookingportals/airport`;
        const response = await fetch(url, {
          method: "GET",
          headers: { projectID: "f104bi07c490" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch airports");
        }
        const data = await response.json();
        console.log(data?.data?.airports);
        if (data && data.data && Array.isArray(data.data.airports)) {
          setAirports(data.data.airports);
        }
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    }
    fetchAirports();
  }, []);

  async function Apicall() {
    try {
      console.log("Getting flights");

      const formattedDay = selectedDay
        ? moment(selectedDay).format("dddd").substring(0, 3)
        : "";
      console.log(formattedDay);

      const limit = 100;

      const url = `https://academics.newtonschool.co/api/v1/bookingportals/flight/?search={"source":"${searchSource}","destination":"${searchDestination}"}&day=${formattedDay}&limit=${limit}`;

      console.log(url);

      const response = await fetch(url, {
        method: "GET",
        headers: { projectID: "wan6hnsnhwfn" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      console.log(data?.data?.flights);

      setFlightData(data?.data?.flights);

      // Redirect to flight result page with search parameters
      navigate("/flightResult", {
        state: {
          flightDataSearch: data?.data?.flights,
          loc: searchSource,
          loc2: searchDestination,
        },
      });
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  }

  async function OfferApi() {
    try {
      console.log("getting offers");

      const limit = 100;

      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/offers?limit=10`;

      console.log(Url);
      const response = await fetch(Url, {
        method: "GET",
        headers: { projectID: "f104bi07c490" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data?.data?.offers);
      setOfferImage(data?.data?.offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  useEffect(() => {
    OfferApi();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flight-section">
        <div className="flight-main-section">
          <div className="flight-left">
            <h1>Search flights</h1>
            <div>
              <p>Enjoy hassle free bookings with Cleartrip</p>
            </div>

            <div className="flight-search">
              <div className="select-way">
                <div className="icon-select-wrapper">
                  <IoIosArrowRoundForward className="icon" />
                  <select className="select-way-inner">
                    <option value="1">One way</option>
                    <option value="2">Round trip</option>
                  </select>
                </div>
                <div className="icon-select-wrapper2">
                  <MdPersonOutline className="icon" />
                  <select className="select-way-inner2">
                    <option value="1">1 Adult, Economy</option>
                    <option value="2">1 Adult, Business class</option>
                    <option value="3">1 Adult, First class</option>
                    <option value="4">1 Adult, Premium economy</option>
                  </select>
                </div>
              </div>

              <div className="select-catogories">
                <div>Regular fare</div>
                <div>Student fare</div>
                <div>Senior citizen fare</div>
                <div>Armed forces fare</div>
              </div>

              <div className="select-search-fiels">
                <div className="select-where-to">
                  <RiFlightTakeoffFill className="flight-icon" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    list="airportsList"
                    value={searchSource}
                    onChange={handleSearch}
                    onClick={() => setShowDropdown(true)}
                  />
                  {showDropdown && (
                  <datalist id="airportsList">
                    {Airports.map((airport, index) => (
                      <option
                        key={index}
                        value={`${airport.iata_code} - ${airport.name}`}
                        onClick={() => handleAirportSelection(airport)}
                      >
                        {`${airport.iata_code} - ${airport.name}`}
                      </option>
                    ))}
                  </datalist>
                  )}
                </div>
                <div className="select-control">
                  <BsArrowLeftRight className="flight-icon2" />
                </div>
                <div className="select-where-to">
                  <RiFlightLandFill className="flight-icon" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={searchDestination}
                    onChange={handleSearchDestination}
                    onClick={() => setShowDropdown2(true)}
                  />
                  {showDropdown2 && (
                    <div className="airport-dropdown">
                      {Airports.map((airport, index) => (
                        <option
                          key={index}
                          className="airport-option"
                          onClick={() => handleAirportSelection2(airport)}
                        >
                          {airport.city}
                        </option>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="select-option1">
                <div className="calender1">
                  <MdOutlineCalendarMonth className="hotel-icon" />
                  <DatePicker
                    className="date-option"
                    selected={selectedDay}
                    onChange={(date) => setSelectedDay(date)}
                    dateFormat="eee, MMM dd"
                  />
                </div>
                <div className="flight-search-button">
                  <button onClick={Apicall}>Search flights</button>
                </div>
              </div>
            </div>
            <div className="cancel-information">
              <img
                src="https://www.cleartrip.com/offermgmt/hotelsCommonImages/cfnr/cfnr-home-banner.jpeg"
                alt="Offer Banner"
              />
            </div>
          </div>
          <div className="flight-offer-carousel">
            <div className="offer-carousel">
              {offerImage.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: index === currentOfferIndex ? "block" : "none",
                  }}
                >
                  <img src={item.heroUrl} alt={`Offer Image ${index + 1}`} />
                  <div className="text-indide-image">{item.pTl}</div>
                </div>
              ))}
            </div>
            <div className="More-offers">
              <h3>More Offers</h3>
              <div>View all</div>
            </div>
            <div className="offers-hardcoded">
              <div className="offers-hardcoded-1st">
                Extra saving with Flipkart Axis bank cards!
              </div>
              <div className="offers-hardcoded-2nd">
                Get 4% additional cashback on all transactions.
              </div>
              <div className="offers-hardcoded-3rd">Know more</div>
            </div>
          </div>
        </div>
        <div className="bank-offer">
          <div>
            <img
              src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_SBI_F_1811.jpg"
              alt="Bank Offer 1"
            />
          </div>
          <div>
            <img
              src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_SBI2_F_1811.jpg"
              alt="Bank Offer 2"
            />
          </div>
          <div>
            <img
              src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_ONECARD_F_1811.jpg"
              alt="Bank Offer 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
