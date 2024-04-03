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

export default function Hotels(props) {
  const [hotelData, setHotelData] = useState(null);
  const [searchParameter, setSearchParameter] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const navigate = useNavigate();

  const { numberOfRoom, setNumberOfRoom} = useAuth();
  const {numberOfGuest, setNumberOfGuest } = useAuth();

  const handleChangeRoom = (e) => {
    setNumberOfRoom(parseInt(e.target.value));
  }

  const handleChangeGuest = (e) => {
    setNumberOfGuest(parseInt(e.target.value));
  }

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
      state: { hotelData11: data?.data?.hotels, loc: searchParameter, selectedDate: selectedDay },
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
                  <select className="person-option" value={numberOfRoom} onChange={handleChangeRoom}>
                    <option value={1}>1 Room</option>
                    <option value={2}>2 Room</option>
                    <option value={3}>3 Rooms</option>
                    <option value={4}>4 Rooms</option>
                    <option value={5}>5 Rooms</option>
                    <option value={6}>6 Rooms</option>
                  
                  </select>
                  <select className="person-option" value={numberOfGuest} onChange={handleChangeGuest}>
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
      </div>
    </div>
  );
}
