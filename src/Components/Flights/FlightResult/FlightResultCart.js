import React, { useEffect, useState } from "react";
import moment from "moment";
import "./flightResultCart.css";
import { useNavigate } from "react-router-dom";

export default function FlightResultCart(props) {

  const storedToken = localStorage.getItem("token");


  useEffect(() => {
    // console.log(props.FlightId);
    // console.log(props.ArivalTime);
    // console.log(props.Duration);
    // console.log(props.Stops);
    // console.log(props.DepartureTime);
    // console.log(props.Price);
    // console.log(props.AvailableSeats);
    // console.log(props.Id);
    // console.log(props.selectedDate);
  }, [props]);

  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const navigate = useNavigate();

  const toggleFlightDetails = () => {
    setShowFlightDetails(!showFlightDetails);
    console.log(props);
  };

  
  const handleBookFlight = () => {
    if(storedToken === undefined || storedToken === null)
    {
      navigate("/Login");
      return;
    }
    navigate("/FlightBooking", { state: { flightDetails: { ...props } } });
  };
  

  return (
    <div className="main-box">
      <div className="flight-result-card">
        <div>
          <p>{props.FlightId.split("-")[0]}</p>
          <p className="flight-details" onClick={toggleFlightDetails}>
            Flight details
          </p>
        </div>

        <p className="flight-result-Arival-time">{props.DepartureTime}</p>
        <div>
          <p style={{ marginBottom: "0", color: "grey" }}>
            {props.Duration}h 0min
          </p>
          <div className="arrow-line"></div>
          <div>
            {props.Stops === 0 ? (
              <p style={{ marginTop: "0", textAlign: "center", color: "grey" }}>
                Non-stop
              </p>
            ) : (
              <p style={{ marginTop: "0", textAlign: "center", color: "grey" }}>
                {props.Stops} stop
              </p>
            )}
          </div>
        </div>

        <p className="flight-result-Arival-time">{props.ArivalTime}</p>
        <div>
          <h3 style={{ fontSize: "26px", fontWeight: "500" }}>
            ₹{props.Price}
          </h3>
        </div>
        <div className="book-flight-btn1">
          <button onClick={handleBookFlight}>Book</button>
        </div>
      </div>
      {showFlightDetails && (
        <div className="flight-details-box">
          <div>{props.FlightId.split("-")[0]}</div>
          <div>
            <div className="departure-box">
              <p>{props.source}</p>
              <h2>{props.DepartureTime}</h2>
            </div>

            <p>{moment(props.selectedDate).format("ddd, DD MMM YYYY")}</p>
          </div>
          <div>{props.Duration}h 0min</div>
          <div>
            <div className="departure-box">
              <p>{props.destination}</p>
              <h2>{props.ArivalTime}</h2>
            </div>
            <p>{moment(props.selectedDate).format("ddd, DD MMM YYYY")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
