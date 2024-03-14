import React, { useEffect, useState } from "react";
import moment from "moment";
import "./flightResultCart.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Login from "../../Login/Login";

export default function FlightResultCart(props) {
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleFlightDetails = () => {
    setShowFlightDetails(!showFlightDetails);
  };

  const handleBookFlight = () => {
    if (storedToken === undefined || storedToken === null) {
      setShowLoginModal(true);
      return;
    }
    navigate("/FlightBooking", { state: { flightDetails: { ...props } } });
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = () => {
    closeModal(); 
  };


  return (
    <div className="main-box">
      <div className="flight-result-card">
        {/* Flight details */}
        <div>
          <p>{props.FlightId.split("-")[0]}</p>
          <p className="flight-details" onClick={toggleFlightDetails}>
            Flight details
          </p>
        </div>

        {/* Departure time */}
        <p className="flight-result-Arival-time">{props.DepartureTime}</p>

        {/* Duration and Stops */}
        <div>
          <p style={{ marginBottom: "0", color: "grey" }}>
            {props.Duration}h 0min
          </p>
          <div className="arrow-line"></div>
          <div>
            {props.Stops === 0 ? (
              <p
                style={{
                  marginTop: "0",
                  textAlign: "center",
                  color: "grey",
                }}
              >
                Non-stop
              </p>
            ) : (
              <p
                style={{
                  marginTop: "0",
                  textAlign: "center",
                  color: "grey",
                }}
              >
                {props.Stops} stop
              </p>
            )}
          </div>
        </div>

        {/* Arrival time */}
        <p className="flight-result-Arival-time">{props.ArivalTime}</p>

        {/* Price */}
        <div>
          <h3 style={{ fontSize: "26px", fontWeight: "500" }}>
            ₹{props.Price}
          </h3>
        </div>

        {/* Book flight button */}
        <div className="book-flight-btn1">
          <button onClick={handleBookFlight}>Book</button>
        </div>
      </div>

      {/* Flight details box */}
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

      {/* Login Modal */}
      <Modal
        isOpen={showLoginModal}
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
        
        <Login closeModal={handleLoginSuccess}  />

      </Modal>
    </div>
  );
}
