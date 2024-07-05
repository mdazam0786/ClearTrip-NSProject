import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import "./flights.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdPersonOutline } from "react-icons/md";
import { RiFlightTakeoffFill } from "react-icons/ri";
import Navbar from "../../Navbar/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../MyContext";
import Footer from "../../Footer/Footer";

export default function Flights() {
  const [flightData, setFlightData] = useState(null);
  const [Airports, setAirports] = useState([]);
  const [searchSource, setSearchSource] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [selectedFare, setSelectedFare] = useState("Regular fare"); // State to manage selected fare type

  const navigate = useNavigate();

  const [offerImage, setOfferImage] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { numberOfAdults, setNumberOfAdults } = useAuth();

  const handleAdultsChange = (e) => {
    setNumberOfAdults(parseInt(e.target.value));
  };

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
    setSearchSource(`${airport.iata_code}`);
    setShowDropdown(false);
  };

  const handleAirportSelection2 = (airport) => {
    setSearchDestination(`${airport.iata_code}`);
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
      <ToastContainer />
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
              </div>

              {/* <div className="select-catogories">
                <div>Regular fare</div>
                <div>Student fare</div>
                <div>Senior citizen fare</div>
                <div>Armed forces fare</div>
              </div> */}
              <div className="select-catogories">
                <div
                  className={`fare-option ${
                    selectedFare === "Regular fare" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFare("Regular fare")}
                >
                  Regular fare
                </div>
                <div
                  className={`fare-option ${
                    selectedFare === "Student fare" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFare("Student fare")}
                >
                  Student fare
                </div>
                <div
                  className={`fare-option ${
                    selectedFare === "Senior citizen fare" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFare("Senior citizen fare")}
                >
                  Senior citizen fare
                </div>
                <div
                  className={`fare-option ${
                    selectedFare === "Armed forces fare" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFare("Armed forces fare")}
                >
                  Armed forces fare
                </div>
              </div>

              <div className="select-search-fiels">
                <div className="select-where-to">
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
                <div className="select-where-to">
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
              </div>

              <div className="select-option1">
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
                <div className="flight-search-button">
                  <button onClick={Apicall}>Search flights</button>
                </div>
              </div>
            </div>
            <Link to="/comingSoon" className="cancel-information">
              <img
                src="https://www.cleartrip.com/offermgmt/hotelsCommonImages/cfnr/cfnr-home-banner.jpeg"
                alt="Offer Banner"
              />
            </Link>
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
                  <div className="text-inside-image">{item.pTl}</div>
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
            <Link to="/comingSoon">
              <img
                src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_SBI_F_1811.jpg"
                alt="Bank Offer 1"
              />
            </Link>
          </div>
          <div>
            <Link to="/comingSoon">
              {" "}
              <img
                src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_SBI2_F_1811.jpg"
                alt="Bank Offer 2"
              />
            </Link>
          </div>
          <div>
            <Link to="/comingSoon">
              <img
                src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_ONECARD_F_1811.jpg"
                alt="Bank Offer 3"
              />
            </Link>
          </div>
        </div>
        <div className="playstore-link">
          <img
            src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_983,h_247,dpr_2/offermgmt/images/qrCode_7.png"
            alt="playStore"
            useMap="#playStoreMap"
            style={{ width: "100%" }}
          />
          <map name="playStoreMap">
            {/* <area
              shape="rect"
              coords="45,195,230,255"
              href="https://play.google.com/store/apps/details?id=com.cleartrip.android&hl=en_IN&gl=US&_branch_match_id=1260972785907223363&utm_source=Web%20QR&utm_campaign=Web%20QR&utm_medium=inapp&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT85JTSwqKcos0EssKNDLyczL1jeJSvNzy8pMtyxLAgAL8QsvJgAAAA%3D%3D"
              alt="Area 1"
            /> */}
            <area
              shape="rect"
              coords="245,195,435,255"
              href="https://apps.apple.com/in/app/cleartrip-flights-hotels-bus/id531324961?_branch_match_id=1260972785907223363&utm_source=Web%20QR&utm_campaign=Web%20QR&utm_medium=inapp&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT85JTSwqKcos0EssKNDLyczL1i%2BtNE8xcEwszShPAgCrFe7NJgAAAA%3D%3D"
              alt="Right Bottom"
            />
          </map>
        </div>

        <div className="why-cleartrip">
          <h3>Why Cleartrip?</h3>
          <p>
            It is no longer an uphill battle to get the lowest airfare and book
            tickets online. Cleartrip is all about making travel{" "}
            <span>easy, affordable </span> and <span>simple.</span> From{" "}
            <span>international</span> flights to <span>domestic</span>
            flights; from early morning flights to late night flights, from
            cheap flights to luxurious ones. Cleartrip helps you complete your
            flight booking in just a few clicks. Your online flight booking
            experience is seamless with our features like:
          </p>
          <p>
            <span>ClearChoice Max: </span> Free cancellation or rescheduling for
            domestic (up to 24 hrs before departure) & international flights (up
            to 72 hrs before departure).
          </p>
          <p>
            <span>ClearChoice Plus:</span> Free date change or airline change up
            to 12 hrs (up to 24 hours for Air India*& Vistara*) before
            departure.
          </p>
          <p>
            <span>Medi-cancel refund:</span> Cancel your domestic flight booking
            easily on valid medical grounds and get up to ₹3500 against airline
            cancellation charges per passenger per segment.
          </p>
          <p>
            <span>International travel insurance:</span> Get stress-free
            coverage against a vast range of uncertainties for all international
            destinations at only ₹89 per user per day.
          </p>
          <p>
            And with our <span>round-the-clock customer service,</span> we
            ensure no queries or concerns regarding your flight tickets are left
            unresolved.
          </p>
          <h3>How to make flexible flight bookings with changeable dates?</h3>
          <p>
            While making your flight booking, make sure to select the
            ‘ClearChoice Plus’ or ‘ClearChoice Max’ option before you confirm
            the air ticket. At a minimal cost, this allows you to modify your
            flight booking dates and airlines. So in case of any change in
            plans, Cleartrip has got you covered!
          </p>
          <h3>
            What are the benefits of booking flights online with Cleartrip?
          </h3>
          <p>
            Get the best flight fares with exciting flight offers on your air
            ticket when you book with Cleartrip. Unmissable sales and deals like
            Travel Max Sale, Big Travel Sale, Cleartrip Tatkaal, etc. offer
            never-seen-before discounts that help you book flights at affordable
            rates. Best flight discounts await you when you book with bank cards
            like ICICI, Bank of Baroda, HDFC, Axis, Kotak etc.
          </p>
          <h3>What’s more?</h3>
          <p>
            Flight ticket booking or planning your travel is made simpler with
            our round trip and multicity options. When you hit enter, your
            search list page shows the results for both onward and return in a
            split screen format letting you choose flights in one go for a round
            trip. The multicity search page shows a list of complete itineraries
            that removes the hassle of you calculating time, transfers and
            layovers letting you finish your online flight booking. To ensure
            you get the best price we highlight offers, sales and other
            promotions on the checkout page. Post booking, our portal allows for
            easy cancellations or amendments without having to make calls to the
            airlines.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
