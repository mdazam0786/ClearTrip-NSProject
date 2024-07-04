import React, { useEffect, useState } from "react";
import "./hotels.css";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { MdOutlineCalendarMonth } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { useAuth } from "../../../MyContext";
import Footer from "../../Footer/Footer";

export default function Hotels(props) {
  const [hotelData, setHotelData] = useState(null);
  const [searchParameter, setSearchParameter] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const navigate = useNavigate();

  const { numberOfRoom, setNumberOfRoom } = useAuth();
  const { numberOfGuest, setNumberOfGuest } = useAuth();

  const handleChangeRoom = (e) => {
    setNumberOfRoom(parseInt(e.target.value));
  };

  const handleChangeGuest = (e) => {
    setNumberOfGuest(parseInt(e.target.value));
  };

  const [offerImage, setOfferImage] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offerImage.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [offerImage.length]);

  const handleSearch = (e) => {
    console.log("Azam");
    console.log(e.target.value);
    setSearchParameter(e.target.value);
  };

  async function Apicall() {
    console.log("getting hotels");
    console.log(selectedDay);

    const formattedDay = selectedDay
      ? moment(selectedDay).format("dddd").substring(0, 3)
      : "";
    console.log(formattedDay);

    const limit = 100;

    const Url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchParameter}"}&day="${formattedDay}&limit=${limit}`;

    console.log(Url);
    const response = await fetch(Url, {
      method: "GET",
      headers: { projectID: "f104bi07c490" },
    });
    const data = await response.json();
    // console.log(response);
    // console.log(data);
    console.log(data?.data?.hotels);
    setHotelData(data?.data?.hotels);

    navigate("/hotelResult", {
      state: {
        hotelData11: data?.data?.hotels,
        loc: searchParameter,
        selectedDate: selectedDay,
      },
    });
  }

  async function OfferApi() {
    console.log("getting offers");

    const Url = `https://academics.newtonschool.co/api/v1/bookingportals/offers?limit=10`;

    console.log(Url);
    const response = await fetch(Url, {
      method: "GET",
      headers: { projectID: "f104bi07c490" },
    });
    const data = await response.json();
    // console.log(response);
    // console.log(data);
    console.log(data?.data?.offers);
    setOfferImage(data?.data?.offers);

    console.log(offerImage);
  }

  useEffect(() => {
    OfferApi();
  }, []);

  return (
    <div>
      <Navbar />

      {/* hotel-section  */}
      <div className="hotel-section">
        <div className="hotel-main-section">
          <div className="hotel-left">
            <h1>Search hotels</h1>
            <div>
              <p>Enjoy hassle free bookings with Cleartrip</p>
            </div>

            {/* hotel-search  */}
            <div className="hotel-search">
              {/* 1-> input-wrapper  */}
              <div className="input-wrapper">
                <CiLocationOn className="location-icon" />
                <input
                  type="text"
                  placeholder="Enter locality, landmark, city or hotel"
                  onChange={handleSearch}
                />
              </div>

              {/* 2-> select-option  */}
              <div className="select-option">
                <div className="calender">
                  <MdOutlineCalendarMonth className="hotel-icon" />
                  <DatePicker
                    className="date-option"
                    selected={selectedDay}
                    onChange={(date) => setSelectedDay(date)}
                    dateFormat="eee, MMM dd"
                    minDate={new Date()}
                  />
                </div>
                <div className="person">
                  <IoPersonOutline className="hotel-icon" />
                  <select
                    className="person-option"
                    value={numberOfRoom}
                    onChange={handleChangeRoom}
                  >
                    <option value={1}>1 Room</option>
                    <option value={2}>2 Room</option>
                    <option value={3}>3 Rooms</option>
                    <option value={4}>4 Rooms</option>
                    <option value={5}>5 Rooms</option>
                    <option value={6}>6 Rooms</option>
                  </select>
                  <select
                    className="person-option"
                    value={numberOfGuest}
                    onChange={handleChangeGuest}
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                </div>
              </div>

              {/* 3-> searct-button  */}
              <div className="search-button">
                <button onClick={Apicall}>Search Hotels</button>
              </div>
            </div>
            <div className="cancel-information">
              <img src="https://www.cleartrip.com/offermgmt/hotelsCommonImages/cfnr/cfnr-home-banner.jpeg" />
            </div>
          </div>
          <div className="hotel-offer-carousel">
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
                Get 4% additional cashback on all transections.
              </div>
              <div className="offers-hardcoded-3rd">Know more</div>
            </div>
          </div>
        </div>

        {/* bank-offer  */}
        <div className="bank-offer">
          <div>
            <img src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_ICICINB_H_1711.jpg" />
          </div>
          <div>
            <img src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_welcomheritage_H_1711.jpg" />
          </div>
          <div>
            <img src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_PNBCC_H_1711.jpg" />
          </div>
        </div>
        <div className="popular-destination">
          <h2>Popular destinations</h2>
          <div className="popular-destination-row">
            <div className="destination">
              <img
                src="https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/manali.jpg"
                alt="Destination 1"
              />
              <h2>Manali</h2>
            </div>
            <div className="destination">
              <img
                src="https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/goa.jpg"
                alt="Destination 2"
              />
              <h2>Goa</h2>
            </div>
            <div className="destination">
              <img
                src="https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/bangalore.jpg"
                alt="Destination 3"
              />
              <h2>Bangolare</h2>
            </div>
            <div className="destination">
              <img
                src="https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/jaipur.png"
                alt="Destination 4"
              />
              <h2>Jaipur</h2>
            </div>
            <div className="destination">
              <img
                src="https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/Pattaya.png"
                alt="Destination 5"
              />
              <h2>Pataya</h2>
            </div>
          </div>
        </div>
        
        <div className="why-cleartrip">
          <h3>Why book hotels online on Cleartrip?</h3>
          <p>
            Looking for online hotel booking sites? Your search ends here. From
            guest houses to resorts, from budget-friendly to luxury, whether for
            business or for leisure, Cleartrip is your go-to hotel booking app.
            Our curated, verified list of 400000+ hotels across 28000+ cities
            from around the globe ensures you have enough options to choose from
            and complete your online hotel booking at ease. Find a list of hotel
            chains such as oyo rooms, fabhotels, treebo hotels, etc. Seamlessly
            book hotels in Delhi, hotels in Mumbai, hotels in Bangalore, hotels
            in Goa and many more.
          </p>
          <p>
            With an array of filters and sorting options, you can simplify the
            search for your hotel room booking. It shows all the details of your
            preferred hotel, like description, highlights, photos, amenities,
            room types, rates all in one place. Additional features like
            pay-at-hotel, express checkout and free cancellations make the
            process of booking a hotel effortless.
          </p>
        </div>

        <div className="find-cheap-popular">
          <div className="popular">
            <h3>How to find and book hotels online on Cleartrip?</h3>
            <p>With Cleartrip, booking a hotel online doesn't get simpler.</p>
            <ul>
              <li>Click on the 'hotels' tab on the homepage</li>
              <li>
                Type in the city/ locality/ landmark/ hotel name in the search
                bar
              </li>
              <li>Fill in the check-in and check-out dates</li>
              <li>Choose the number of travellers and hit enter</li>
            </ul>
            <p>
              There you go! You can further narrow down your hotel booking
              search list by using filters like price, star rating, traveller
              rating, amenities and even preferences like hill-view or couple
              friendly hotels. For every kind of stay, Cleartrip has a hotel.
            </p>
          </div>
          <div className="cheap">
            <h3>How to Search for cheap hotels on Cleartrip?</h3>
            <p>Cleartrip offers never-seen-before discounts on hotels, making your luxurious stay pocket-friendly.</p>
            <ul>
              <li>Once you search for your preferred location or city, you can use an array of filters to refine your search.</li>
              <li>Enter the price range for your hotel room booking and get options accordingly.</li>
              <li>Compare, choose and complete your hotel booking by clicking on the 'Book Now' button.</li>

            </ul>
            <p>So go ahead and book that long-awaited staycation, friends' trip, family holiday, or just a much-needed weekend getaway! Cleartrip has got you covered.</p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
