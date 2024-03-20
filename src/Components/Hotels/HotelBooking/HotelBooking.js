import React, { useState, useEffect, useMemo } from "react";
import "./hotelBooking.css";
import { FaTripadvisor } from "react-icons/fa";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../MyContext";

export default function HotelBooking() {
  const location = useLocation();
  const detailsData = location.state?.detailsData || [];
  const starRating = location.state?.starRating || undefined;
  const selectedDay = location.state?.selectedDay;
  console.log(detailsData);

  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showError, setShowError] = useState(false);
  const {numberOfRoom, numberOfGuest} = useAuth();
  const [travelers, setTravelers] = useState([]);

  useEffect(() => {
    const newTravelers = [];
    for (let i = 0; i < numberOfGuest; i++) {
      newTravelers.push({
        firstName: "",
        lastName: "",
        age: "",
        gender: "male",
      });
    }
    setTravelers(newTravelers);
  }, [numberOfGuest]);


  const navigate = useNavigate();

  const getRandom = (min, max) => {
    min = Math.min(min);
    max = Math.max(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const random = getRandom(3, 5);

  const handleContinue = async () => {
    try {
      
      if (
        mobileNo === "" ||
        email === "" ||
        firstName === "" ||
        lastName === "" ||
        age === ""
      ) {
        setShowError(true);
        return;
      }

      await HotelBook();
    } catch (error) {
      console.error("Booking failed:", error);
      setShowError(true);
    }
  };


          

  async function HotelBook() {
    const Url = `https://academics.newtonschool.co/api/v1/bookingportals/booking`;
    console.log(Url);

    const response = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectId: "f104bi07c490",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        bookingType: "hotel",
        bookingDetails: {
          hotelId: detailsData?._id,
          startDate: moment(selectedDay).toISOString(),
          endDate: moment(selectedDay).add(1, 'days').toISOString(),
          
        },
      }),
    });
    const data = await response.json();
    console.log(response);
    console.log(data);

    const totalPrice = detailsData.rooms[0]?.costDetails?.baseCost + detailsData.rooms[0]?.costDetails?.taxesAndFees;

    navigate("/Pyment", {
      state: {
        totalPrice: totalPrice * numberOfRoom,
      },
    });
  }

  const isContinueButtonDisabled = () => {
    return (
      mobileNo === "" ||
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      age === ""
    );
  };

  return (
    <div className="BookingPageFlight_parent">
      <div className="BookingPageFlight_Childdata">
        <div className="BookingPageFlight_Childleft">
          <h3 style={{ fontSize: "24px" }}>Complete Your Booking </h3>

          <div className="BookingPageFlight_Childleftdata1">
            <div className="BookingPageFlight_Child_data_left_data_from_to_div">
              <div className="BookingPageFlight_Child_data_left_data_from_to">
                <p>
                  {starRating !== undefined ? starRating : random}-star Hotel in{" "}
                </p>

                <p>{detailsData?.location}</p>
              </div>
            </div>
            <h2>{detailsData?.name}</h2>
            <div className="rating-logo">
              <div>
                <FaTripadvisor
                  style={{
                    cursor: "pointer",
                    paddingRight: "5px",
                    width: "25px",
                    height: "25px",
                  }}
                />
                <svg height="16" width="16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#00AA6c" />
                </svg>
                <svg height="16" width="16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#00AA6c" />
                </svg>
                <svg height="16" width="16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#00AA6c" />
                </svg>

                {detailsData.rating === 3.5 ? (
                  <div>
                    <svg height="16" width="16" fill="none">
                      <circle cx="8" cy="8" r="7.5" stroke="#00AA6c" />
                      <path fill="#00AA6C" d="M8 0a8 8 0 000 16V0z"></path>
                    </svg>

                    <svg height="16" width="16" fill="none">
                      <circle
                        cx="8"
                        cy="8"
                        r="7.5"
                        fill="none"
                        stroke="#00AA6c"
                      />
                    </svg>
                  </div>
                ) : null}

                {detailsData.rating === 4 ? (
                  <div>
                    <svg height="16" width="16" fill="none">
                      <circle cx="8" cy="8" r="7.5" fill="#00AA6c" />
                    </svg>
                    <svg height="16" width="16" fill="none">
                      <circle
                        cx="8"
                        cy="8"
                        r="7.5"
                        fill="none"
                        stroke="#00AA6c"
                      />
                    </svg>
                  </div>
                ) : null}

                {detailsData.rating == 4.5 ? (
                  <div>
                    <svg height="16" width="16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#00AA6c" />
                    </svg>

                    <svg height="16" width="16" fill="none">
                      <circle cx="8" cy="8" r="8" stroke="#00AA6c" />
                      <path fill="#00AA6C" d="M8 0a8 8 0 000 16V0z"></path>
                    </svg>
                  </div>
                ) : null}

                {detailsData.rating == 5 ? (
                  <div>
                    <svg height="16" width="16" fill="none">
                      <circle cx="8" cy="8" r="7.5" fill="#00AA6c" />
                    </svg>

                    <svg height="16" width="16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#00AA6c" />
                    </svg>
                  </div>
                ) : null}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 30px",
              }}
            >
              <div>
                <p>Check in</p>
                <h3 className="date-month">
                  {moment(selectedDay).format("DD MMM")}
                </h3>

                <div>{moment(selectedDay).format("ddd hh:mm A")}</div>
              </div>
              <div>
                <p>Check out</p>
                <h3 className="date-month">
                  {moment(selectedDay).add(1, "days").format("DD MMM")}
                </h3>
                <div>
                  {moment(selectedDay).add(1, "day").format("ddd hh:mm A")}
                </div>
              </div>
              <div>
                <p>Room & Guests</p>
                <h3>{numberOfRoom} Rooms, {numberOfGuest} Guests</h3>
                <div>{numberOfGuest} Adults</div>
              </div>
            </div>
          </div>
          <div className="BookingPageFlight_Child_data_left_data2">
            <h3>Add Contact Details</h3>
            <div className="BookingPageFlight_Child_data_left_data2_contactDetail">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Mobile No</label>
                <input
                  type="number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Email Address</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="BookingPageFlight_Child_data_left_data3">
            <h3>Add Traveller Details</h3>
            {travelers.map((traveler, index) => (
            <div key={index}
                id={`NumberOfAdults-flight-${index}`} className="BookingPageFlight_Child_data_left_data2_traveller_Detail">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "70px",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>First Name</label>
                  <input
                    type="text"
                    value={traveler.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={traveler.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginTop: "10px" }}>Age</label>
                  <input
                    style={{ width: "80px" }}
                    type="number"
                    value={traveler.age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginTop: "10px" }}>Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={traveler.gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
        <div className="BookingPageFlight_Child_data_right">
          <div >
            <h3>Fare Summary</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                paddingTop: "15px",
              }}
            >
              <h4>Base Fare</h4>
              <p>Rs {detailsData.rooms[0]?.costDetails?.baseCost * numberOfRoom}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
                borderTop: "1px solid lightgray",
                paddingTop: "15px",
              }}
            >
              <h4>Taxes and Surcharges</h4>
              <p>&#8377; {detailsData.rooms[0]?.costDetails?.taxesAndFees * numberOfRoom} </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
                borderTop: "1px solid gray",
                paddingTop: "10px",
              }}
            >
              <h2>Total Amount</h2>
              <h3>Rs {detailsData.rooms[0]?.costDetails?.baseCost  * numberOfRoom + detailsData.rooms[0]?.costDetails?.taxesAndFees * numberOfRoom}</h3>
            </div>
          </div>

          <button
            className="FlightBooingpageBtn"
            onClick={handleContinue}
            disabled={isContinueButtonDisabled()}
          >
            Continue
          </button>
          
        </div>
      </div>
    </div>
  );
}
