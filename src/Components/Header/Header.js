import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./header.css";
import Login from "../Login/Login";
import SignupByEmail from "../Signup/SignupByEmail";
import { RiFlightTakeoffFill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../MyContext";
import { MdPersonOutline, MdOutlineCalendarMonth } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [flightData, setFlightData] = useState(null);

  const [Airports, setAirports] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [searchSource, setSearchSource] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const { numberOfAdults, setNumberOfAdults } = useAuth();

  const handleAdultsChange = (e) => {
    setNumberOfAdults(parseInt(e.target.value));
  };
  const { user, setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token && name) {
      setUser({ token, name });
    }
  }, [setUser]);

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUser(null);
  };

  const handleSignupSuccess = () => {
    closeSignupModal();
    openModal();
  };

  const handleSearch = (e) => {
    setSearchSource(e.target.value);
    setShowDropdown(true);
  };

  const handleSearchDestination = (e) => {
    setSearchDestination(e.target.value);
    setShowDropdown2(true);
  };

  const handleAirportSelection = (airport) => {
    setSearchSource(`${airport.iata_code}`);
    setShowDropdown(false);
  };

  const handleAirportSelection2 = (airport) => {
    setSearchDestination(`${airport.iata_code}`);
    setShowDropdown2(false);
  };

  async function Apicall() {
    if (!searchSource || !searchDestination || !selectedDay) {
      toast.error("Please fill in all fields");
      return;
    }

    if (searchSource === searchDestination) {
      toast.error("Source and destination cannot be the same");
      return;
    }

    const today = new Date();
    if (selectedDay < today) {
      toast.error("Please select a valid date");
      return;
    }

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
        headers: { projectID: "f104bi07c490" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();

      setFlightData(data?.data?.flights);
      console.log(data?.data?.flights);

      // Redirect to flight result page with search parameters
      navigate("/flightResult", {
        state: {
          flightDataSearch: data?.data?.flights,
          loc: searchSource,
          loc2: searchDestination,
          day: formattedDay,
          selectedDate: selectedDay,
          numberOfAdults: numberOfAdults,
        },
      });
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  }
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

  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <Link to="/flights">
            <img
              src="https://etimg.etb2bimg.com/photo/94049186.cms"
              alt="pic"
            />
          </Link>
        </div>
        
        {location.pathname === "/flightResult" && (
          <div className="select-search-fields2">
          <div className="select-where-to2">
            <RiFlightTakeoffFill className="flight-icon" />
            <input
              type="text"
              placeholder="where from ?"
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
                    value={`${airport.iata_code}`}
                    onClick={() => handleAirportSelection(airport)}
                  >
                    {`${airport.iata_code} - ${airport.name}`}
                  </option>
                ))}
              </datalist>
            )}
          </div>
          <div className="select-where-to2">
            <RiFlightTakeoffFill className="flight-icon" />
            <input
              type="text"
              placeholder="where to ?"
              list="airportsList"
              value={searchDestination}
              onChange={handleSearchDestination}
              onClick={() => setShowDropdown2(true)}
            />
            {showDropdown2 && (
              <datalist id="airportsList">
                {Airports.map((airport, index) => (
                  <option
                    key={index}
                    value={`${airport.iata_code}`}
                    onClick={() => handleAirportSelection2(airport)}
                  >
                    {`${airport.iata_code} - ${airport.name}`}
                  </option>
                ))}
              </datalist>
            )}
          </div>
          <div className="select-option2">
            <div className="calender1">
              <MdOutlineCalendarMonth className="hotel-icon" />
              <DatePicker
                className="date-option"
                selected={selectedDay}
                onChange={(date) => setSelectedDay(date)}
                dateFormat="eee, MMM dd"
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="icon-select-wrapper2">
            <MdPersonOutline className="icon" />
            <select
              className="select-way-inner2"
              value={numberOfAdults}
              onChange={handleAdultsChange}
            >
              <option value={1}>1 Adult, Economy</option>
              <option value={2}>2 Adults, Economy</option>
              <option value={3}>3 Adults, Economy</option>
              <option value={4}>4 Adults, Economy</option>
            </select>
          </div>
          <div className="flight-search-button2">
            <button onClick={Apicall}>Search flights</button>
          </div>
        </div>
        
        )}
        {!user ? (
          <div className="login">
            <button onClick={openModal}>Login / Sign up</button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Login Modal"
              style={{
                overlay: { background: "rgba(0, 0, 0, 0.5)" },
                content: {
                  width: "800px",
                  height: "430px",
                  margin: "auto",
                  overflow: "hidden",
                  borderRadius: "10px",
                },
              }}
            >
              <Login closeModal={closeModal} />
            </Modal>
          </div>
        ) : (
          <div className="logout">
            <Link to="/BookingHistory" className="logout1">
              {user?.name} |
            </Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      {isSignupModalOpen && (
        <SignupByEmail
          closeModal={closeSignupModal}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </div>
  );
}
