import React, { useEffect, useState } from "react";
import "./hotels.css";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import Navbar from "../Navbar/Navbar";
import DatePicker from "react-datepicker";
import { MdOutlineCalendarMonth } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
// import HotelResult from "./HotelResult";
import { useNavigate } from "react-router-dom";

export default function Hotels(props) {
  const [hotelData, setHotelData] = useState(null);
  const [searchParameter, setSearchParameter] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const navigate = useNavigate();

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

    const limit= 100;

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
    // console.log(hotelData);

    // Pass the hotelData to the HotelResult component
    navigate("/hotelResult", { state: { hotelData11: data?.data?.hotels } });
  }

  // useEffect(() => {
  //   Apicall();
  // }, [selectedDay]);

  return (
    <div>
      <Navbar />

      {/* hotel-section  */}
      <div className="hotel-section">
        <div className="hotel-left">
          <div className="left-wrapper">
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
                  />
                </div>
                <div className="person">
                  <IoPersonOutline className="hotel-icon" />
                  <select className="person-option">
                    <option value="1">1 Room, 1 Adults</option>
                    <option value="2">1 Room, 2 Adults</option>
                    <option value="3">2 Rooms, 4 Adults</option>
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
        </div>
        <div className="hotel-right"></div>

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
      </div>
    
      
    </div>
  );
}
