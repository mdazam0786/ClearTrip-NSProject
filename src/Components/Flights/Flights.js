import React, { useEffect, useState } from "react";
import "./flight.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdPersonOutline } from "react-icons/md";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { RiFlightLandFill } from "react-icons/ri";
import { BsArrowLeftRight } from "react-icons/bs";
import Navbar from "../Navbar/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { MdOutlineCalendarMonth } from "react-icons/md";
import FlightResult from "./FlightResult";
import { useNavigate } from "react-router-dom";

export default function Flights() {
  const [flightData, setFlightData] = useState(null);
  const [searchSource, setSearchSource] = useState(null);
  const [searchDestination, setSearchDestination] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    console.log("Azam");
    console.log(e.target.value);
    setSearchSource(e.target.value);
  };

  const handleSearchDestination = (e) => {
    console.log(e.target.value);
    setSearchDestination(e.target.value);
  }

  async function Apicall() {
    console.log("getting hotels");
    console.log(selectedDay);
    const formattedDay = selectedDay
      ? moment(selectedDay).format("dddd").substring(0, 3)
      : "";
    console.log(formattedDay);

    const Url = `https://academics.newtonschool.co/api/v1/bookingportals/flight/?search={"source":"${searchSource}","destination":"${searchDestination}"}&day="${formattedDay}`;

    console.log(Url);
    const response = await fetch(Url, {
      method: "GET",
      headers: { projectID: "f104bi07c490" },
    });
    const data = await response.json();
    // console.log(response);
    // console.log(data);
    console.log(data?.data?.flights);
    setFlightData(data?.data?.flights);

    navigate("/flightResult", {state: {flightData11: data?.data?.flights}})
  }

  // useEffect(() => {
  //   Apicall();
  // }, []);

  return (
    <div>
      <Navbar />

      {/* flight-section  */}
      <div className="flight-section">
        <div className="flight-left">
          <div className="left-wrapper">
            <h1>Search flights</h1>
            <div>
              <p>Enjoy hassle free bookings with Cleartrip</p>
            </div>

            {/* flight-search  */}
            <div className="flight-search">
              {/* 1-> select-way  */}
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

              {/* 2-> select-catogories  */}
              <div className="select-catogories">
                <div>Regular fare</div>
                <div>Student fare</div>
                <div>Senior citizen fare</div>
                <div>Armed forces fare</div>
              </div>

              {/* 3-> select-search-fields  */}
              <div className="select-search-fiels">
                <div className="select-where-to">
                  <RiFlightTakeoffFill className="flight-icon" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    onChange={handleSearch}
                  />
                </div>
                <div className="select-control">
                  <BsArrowLeftRight className="flight-icon2" />
                </div>
                <div className="select-where-to">
                  <RiFlightLandFill className="flight-icon" />
                  <input type="text" placeholder="Where to?" 
                  onChange={handleSearchDestination}/>
                </div>
              </div>

              {/* 4->select-option  */}
              <div className="select-option1">
                <div className="calender1">
                  <MdOutlineCalendarMonth className="hotel-icon" />
                  <DatePicker
                    className="date-option"
                    selected={selectedDay}
                    onChange={(date) => setSelectedDay(date)}
                  />
                </div>
                <div className="flight-search-button">
                  <button onClick={Apicall}>Search flights</button>
                </div>
              </div>
            </div>
            <div className="cancel-information">
              <img src="https://www.cleartrip.com/offermgmt/hotelsCommonImages/cfnr/cfnr-home-banner.jpeg" />
            </div>
          </div>
        </div>
        <div className="flight-right"></div>
        <div className="bank-offer">
          <div>
            <img src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_SBI_F_1811.jpg" />
          </div>
          <div>
            <img src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_SBI2_F_1811.jpg" />
          </div>
          <div>
            <img src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_ONECARD_F_1811.jpg" />
          </div>
        </div>
      </div>
      {/* {flightData && <FlightResult flResult={flightData} />} */}
    </div>
  );
}
