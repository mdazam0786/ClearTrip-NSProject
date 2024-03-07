import React, { useState, useEffect } from "react";
import "./flightBooking.css";
import { useLocation } from "react-router-dom";

export default function FlightBooking() {
  const location = useLocation();
  const flightDetails = location.state && location.state.flightDetails;

console.log(flightDetails);

  return (
    <div className="BookingPageFlight_parent">
      <div className="BookingPageFlight_Child_data">
        <div className="BookingPageFlight_Child_data_left">
          <div className="BookingPageFlight_Child_data_left_data1">
            <h3 style={{ fontSize: "24px" }}>Complete Your Booking </h3>
            <div className="BookingPageFlight_Child_data_left_data_from_to_div">
              <div className="BookingPageFlight_Child_data_left_data_from_to">
                <h3>{flightDetails?.FlightId}</h3>
                <h3>→</h3>
              </div>
              <div
                style={{
                  color: "white",
                  backgroundImage: "linear-gradient(93deg, #53b2fe, #065af3)",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                }}
              >
                <p style={{ fontSize: "11px", fontWeight: "bold" }}>
                  CANCELLATION FEES APPLY
                </p>
              </div>
            </div>
            <h4 style={{ fontSize: "14px" }}>{/* Aircraft model */}</h4>
            <div
              style={{
                backgroundColor: "#f4f4f4",
                width: "100%",
                height: "150px",
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
                {/* Departure time */}
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
                {/* Duration */}
              </p>
              <h3
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                {/* Arrival time */}
              </h3>
            </div>
          </div>
          <div className="BookingPageFlight_Child_data_left_data2">
            <h3>Add Contact Details</h3>
            <div className="BookingPageFlight_Child_data_left_data2_contactDetail">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Mobile No</label>
                <input type="number" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Email Address</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="BookingPageFlight_Child_data_left_data3">
            <h3>Add Traveller Details</h3>
            <div className="BookingPageFlight_Child_data_left_data2_traveller_Detail">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "70px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>First Name</label>
                  <input type="text" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>Last Name</label>
                  <input type="text" />
                </div>
              </div>
              <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginTop: "10px" }}>Age</label>
                  <input style={{ width: "80px" }} type="number" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginTop: "10px" }}>Gender</label>
                  <select id="gender" name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="BookingPageFlight_Child_data_right">
          <div>
            <h3>Fare Summery</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                paddingTop: "15px",
              }}
            >
              <h4>Base Fare</h4>
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
            </div>
          </div>
          <button className="FlightBooingpageBtn">Continue</button>
        </div>
      </div>
    </div>
  );
}
