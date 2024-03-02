import React, { useEffect } from "react";
import "./flightResultCart.css";

export default function FlightResultCart(props) {
  useEffect(() => {
    console.log(props.FlightId);
    console.log(props.ArivalTime);
    console.log(props.Duration);
    console.log(props.Stops);
    console.log(props.DepartureTime);
    console.log(props.Price);
    console.log(props.AvailableSeats);
  }, [props]);

  return (
    <div className="main-box">
      <div className="flight-result-card">
        <div>
          <p>
            {props.FlightId}
          </p>
          <p className="flight-details">
            Flight details
          </p>
        </div>

        <p className="flight-result-Arival-time">{props.ArivalTime}</p>
        <div>
          <p style={{ marginBottom: "0" }}>{props.Duration}h</p>
          <div className="arrow-line"></div>
          <p style={{ marginTop: "0" }}>{props.Stops} stop</p>
        </div>

        <p className="flight-result-Arival-time">{props.DepartureTime}</p>
        <div>
          <h3 style={{ marginBottom: "0" }}>₹{props.Price}</h3>
          <p style={{ marginTop: "0" }}>{props.AvailableSeats} Seats left</p>
        </div>
        <div className="book-flight-btn1">
          <button>Book</button>
        </div>
      </div>
    </div>
  );
}
