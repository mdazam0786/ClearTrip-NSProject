import React, { useState, useEffect, useMemo } from "react";
import "./flightBooking.css";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../MyContext";

export default function FlightBooking() {
  const location = useLocation();
  const flightDetails = location.state && location.state.flightDetails;
  const selectedDate = flightDetails && flightDetails.selectedDate.toString();
  const [showError, setShowError] = useState(false);
  const { numberOfAdults } = useAuth();
  const [travelers, setTravelers] = useState([]);

  const taxes = useMemo(() => Math.floor(Math.random() * 1000) + 1, []);

  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [showInputError, setShowInputError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newTravelers = [];
    for (let i = 0; i < numberOfAdults; i++) {
      newTravelers.push({
        firstName: "",
        lastName: "",
        age: "",
        gender: "male",
      });
    }
    setTravelers(newTravelers);
  }, [numberOfAdults]);

  const handleContinue = async () => {
    const isEmptyMobileNo = mobileNo.trim() === "";
    const isEmptyEmail = email.trim() === "";
    const isEmptyTravelers = travelers.some(
      (traveler) =>
        traveler.firstName.trim() === "" ||
        traveler.lastName.trim() === "" ||
        traveler.age.trim() === ""
    );

    const isEmptyFirstName = travelers.some(
      (traveler) => traveler.firstName.trim() === ""
    );
    const isEmptyLastName = travelers.some(
      (traveler) => traveler.lastName.trim() === ""
    );
    const isEmptyAge = travelers.some((traveler) => traveler.age.trim() === "");

    if (
      isEmptyMobileNo ||
      isEmptyEmail ||
      isEmptyTravelers ||
      isEmptyFirstName ||
      isEmptyLastName ||
      isEmptyAge
    ) {
      setShowInputError(true);
    } else {
      await FlightBook().catch((error) => {
        console.error("Booking failed:", error);
        setShowError(true);
      });
    }
  };

  const handleFirstNameChange = (index, newValue) => {
    setTravelers((prevTravelers) => {
      const updatedTravelers = [...prevTravelers];
      updatedTravelers[index].firstName = newValue;
      return updatedTravelers;
    });
  };

  const handleLastNameChange = (index, newValue) => {
    setTravelers((prevTravelers) => {
      const updatedTravelers = [...prevTravelers];
      updatedTravelers[index].lastName = newValue;
      return updatedTravelers;
    });
  };

  const handleAgeChange = (index, newValue) => {
    setTravelers((prevTravelers) => {
      const updatedTravelers = [...prevTravelers];
      updatedTravelers[index].age = newValue;
      return updatedTravelers;
    });
  };

  const handleGenderChange = (index, newValue) => {
    setTravelers((prevTravelers) => {
      const updatedTravelers = [...prevTravelers];
      updatedTravelers[index].gender = newValue;
      return updatedTravelers;
    });
  };

  async function FlightBook() {
    console.log("FlightBook");
    // console.log(localStorage.getItem("token"));

    const Url = `https://academics.newtonschool.co/api/v1/bookingportals/booking`;

    console.log(Url);
    // console.log(pid);
    const response = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectId: "f104bi07c490",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        bookingType: "flight",
        bookingDetails: {
          flightId: flightDetails?.Id.toString(),
          startDate: moment(selectedDate).toISOString(),
          endDate: moment(selectedDate).add(1, "days").toISOString(),
        },
        numberOfAdults: numberOfAdults,
      }),
    });
    const data = await response.json();
    console.log(response);
    console.log(data);

    navigate("/Payment", {
      state: {
        totalPrice:
          flightDetails?.Price * numberOfAdults + taxes * numberOfAdults,
      },
    });
  }

  // console.log(flightDetails);

  return (
    <div className="BookingPageFlight_parent">
      <div className="BookingPageFlight_Childdata">
        <div className="BookingPageFlight_Childleft">
          <div className="BookingPageFlight_Childleftdata1">
            <h3 style={{ fontSize: "24px" }}>Complete Your Booking </h3>
            <div className="BookingPageFlight_Child_data_left_data_from_to_div">
              <div className="BookingPageFlight_Child_data_left_data_from_to">
                <h3>{flightDetails?.source}</h3>
                <h3>→</h3>
                <h3>{flightDetails?.destination}</h3>
              </div>
              <p>{moment(selectedDate).format("ddd, DD MMM YYYY")}</p>
            </div>
            <p style={{ marginTop: "0px", marginBottom: "0px" }}>
              {flightDetails?.Stops}
            </p>
            <h4 style={{ fontSize: "14px", marginTop: "0px" }}>
              {flightDetails?.FlightId}
            </h4>
            <div
              style={{
                backgroundColor: "#f4f4f4",
                marginTop: "10px",
                padding: "20px",
              }}
            >
              <h3
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                {flightDetails?.DepartureTime}
                <div
                  style={{
                    border: "1px solid gray",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                ></div>
                {flightDetails?.source}
              </h3>
              <p
                style={{
                  marginLeft: "50px",
                  borderLeft: "1px dotted gray",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "20px",
                }}
              >
                {flightDetails?.Duration}h m
              </p>
              <h3
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                {flightDetails?.ArivalTime}
                <div
                  style={{
                    border: "1px solid gray",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                ></div>
                {flightDetails?.destination}
              </h3>
            </div>
          </div>
          <div className="BookingPageFlight_Child_data_left_data2">
            <h3>Add Contact Details</h3>
            <div className="BookingPageFlight_Child_data_left_data2_contactDetail">
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Mobile No</label>
                <input
                  type="number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </div>
              {showInputError && mobileNo.trim() === "" && (
                <p
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "86%",
                    left: "4%",
                  }}
                >
                  Mobile number is required.
                </p>
              )}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Email Address</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {showInputError && email.trim() === "" && (
                <p
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "86%",
                    left: "34%",
                  }}
                >
                  Email Address is required.
                </p>
              )}
            </div>
          </div>
          <div className="BookingPageFlight_Child_data_left_data3">
            <h3>Add Traveller Details</h3>
            {travelers.map((traveler, index) => (
              <div
                key={index}
                id={`NumberOfAdults-flight-${index}`}
                className="BookingPageFlight_Child_data_left_data2_traveller_Detail"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "70px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label>First Name</label>
                    <input
                      type="text"
                      value={traveler.firstName}
                      onChange={(e) =>
                        handleFirstNameChange(index, e.target.value)
                      }
                    />
                  </div>
                  {showInputError && traveler.firstName.trim() === "" && (
                    <p
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "13%",
                        left: "3%",
                        transform: "translateY(10px)",
                      }}
                    >
                      First Name is required.
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={traveler.lastName}
                      onChange={(e) =>
                        handleLastNameChange(index, e.target.value)
                      }
                    />
                  </div>
                  {showInputError && traveler.lastName.trim() === "" && (
                    <p
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "13%",
                        left: "60%",
                        transform: "translateY(10px)",
                      }}
                    >
                      Last Name is required.
                    </p>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "30px",
                    marginTop: "20px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ marginTop: "10px" }}>Age</label>
                    <input
                      style={{ width: "80px" }}
                      type="number"
                      value={traveler.age}
                      onChange={(e) => handleAgeChange(index, e.target.value)}
                    />
                  </div>
                  {showInputError && traveler.age.trim() === "" && (
                    <p
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "25%",
                        left: "3%",
                        transform: "translateY(10px)",
                      }}
                    >
                      Age.
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ marginTop: "10px" }}>Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={traveler.gender}
                      onChange={(e) => handleGenderChange(index, e.target.value)}
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
          <div>
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
              <p>Rs {flightDetails?.Price * numberOfAdults}</p>
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
              <p>Rs {taxes * numberOfAdults}</p>
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
              <h3>
                Rs{" "}
                {flightDetails?.Price * numberOfAdults + taxes * numberOfAdults}
              </h3>
            </div>
          </div>
          <button className="FlightBooingpageBtn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
