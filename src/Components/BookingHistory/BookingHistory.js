import React, { useEffect, useState } from "react";
import "./bookingHistory.css";
import Navbar from "../Navbar/Navbar";
import moment from "moment";

export default function BookingHistory() {
  const [bookingData, setBookingData] = useState([]);
  const [isData, setIsData] = useState(false);

  async function bookingSummary() {
    console.log("history");
    const Url = `https://academics.newtonschool.co/api/v1/bookingportals/booking`;
    console.log(Url);
    try {
      const response = await fetch(Url, {
        method: "GET",
        headers: {
          projectId: "f104bi07c490",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIsData(true);
        setBookingData(data?.data);
        console.log(data?.data);
      }
    } catch (error) {
      console.log("Error fetching booking data:", error);
    }
  }

  useEffect(() => {
    bookingSummary();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="BookingSummeryChild">
        <div className="BookingSummeryChild_dataDiv">
          <div className="BookingSummeryChild_dataDiv_Bookings">
            <div className="BookingSummeryChild_dataDiv_Bookings_imgDiv">
              <img
                className="BookingSummeryChild_dataDiv_Bookings_img"
                src="https://imgak.mmtcdn.com/mima/images/Desktop/mytripSprite.png"
                alt="Bookings"
              />
            </div>
            <h4>Bookings</h4>
          </div>
          <div className="BookingSummeryChild_dataDiv_NoBookings">
            {isData ? (
              bookingData.map((bookingdetail, id) => (
                <div
                  key={id}
                  className="BookingSummeryChild_dataDiv_Bookingsdata"
                >
                  <div className="BookingSummeryChild_dataDiv_Bookingsdata_left">
                    <h4>
                      Booking Type :{" "}
                      <span style={{ fontSize: "14px" }}>
                        {bookingdetail.booking_type}
                      </span>
                    </h4>
                    <small>{bookingdetail.user.name} was Travelling</small>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>
                        {moment(bookingdetail.start_date).format(
                          "ddd, DD MMM YYYY"
                        )}
                      </h3>
                      <h3>
                        {moment(bookingdetail.end_date).format(
                          "ddd, DD MMM YYYY"
                        )}
                      </h3>
                    </div>
                    <h4>{bookingdetail?.hotel?.name}</h4>
                    <h4 style={{ marginTop: "20px" }}>
                      Booking Status :{" "}
                      <span
                        style={{
                          fontSize: "14px",
                          color: "white",
                          backgroundColor: "green",
                        }}
                      >
                        Confirmed
                      </span>
                    </h4>
                  </div>
                  <h4>
                    Trip Id :{" "}
                    <span style={{ fontSize: "14px" }}>
                      {bookingdetail._id}
                    </span>
                  </h4>
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "310px",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://imgak.mmtcdn.com/mima/images/Desktop/upcoming-empty.png"
                  alt="Empty"
                />
                <div>
                  <h3>Looks empty, you've no upcoming bookings.</h3>
                  <small>
                    When you book a trip, you will see your itinerary here.
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
