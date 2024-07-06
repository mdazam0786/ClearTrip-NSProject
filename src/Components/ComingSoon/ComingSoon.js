import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./comingSoon.css";
import { Link } from "react-router-dom";


export default function ComingSoon() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(true);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="coming-soon-section">
      <Navbar />
      <div className="coming-soon-content">
        <div className={`coming-soon ${showMessage ? "show-message" : ""}`}>
          <h1>Work in Progress</h1>
        </div>
      </div>
      <div className="footer-container2">
        <div className="logoand-more">
          <div className="logo-left-side">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmVTdFkJ3M8Nuy3umj8hSm0WmWhMscHHWxA&usqp=CAU"
              alt=""
              style={{ filter: "brightness(1) invert(0.1)" }}
            />
          </div>
          <div className="logo-right-side">
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>FAQs</li>
              <li>Support</li>
              <li>Collections</li>
              <li>Cleartrip for Business</li>
              <li>Gift Cards</li>
            </ul>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #b5b2b2",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        ></div>
        <h4 className="heading-flight-hotel">Popular Domestic Flight Routes</h4>
        <Link to="/comingSoon" className="nav-link">
          <p className="heading-flight-hotel">
            Delhi Goa flights Mumbai Delhi flights Delhi Kolkata flights Pune
            Delhi flights Bangalore Delhi flights Mumbai Bangalore flights
            Chennai Delhi flights Kolkata Delhi flights Delhi Mumbai flights
            Delhi Bangalore flights Mumbai Goa flights
          </p>
        </Link>
        <h4 className="heading-flight-hotel">
          Popular International Flight Routes
        </h4>
        <Link to="/comingSoon" className="nav-link">
          <p className="heading-flight-hotel">
            Delhi Singapore flights Delhi Bangkok flights Mumbai Dubai flights
            Delhi Dubai flights Delhi to London flights Delhi to Toronto flights
            Delhi to New york flights Bangalore to Singapore flights Delhi to
            Paris flights Mumbai to Paris flights Delhi to Hong Kong flights
          </p>
        </Link>
        <h4 className="heading-flight-hotel">Domestic Airlines</h4>
        <Link to="/comingSoon" className="nav-link">
          <p className="heading-flight-hotel">
            Air India Indigo Spicejet GoAir Air Aisa India Vistara Airlines
          </p>
        </Link>
        <h4 className="heading-flight-hotel">International Airlines</h4>
        <Link to="/comingSoon" className="nav-link">
          <p className="heading-flight-hotel">
            Emirates Airlines Singapore Airlines Thai Airways Qatar Airways
            Lufthansa Airlines Flydubai Airlines
          </p>
        </Link>
        <h4 className="heading-flight-hotel">Other Links</h4>
        <Link to="/comingSoon" className="nav-link">
          <p className="heading-flight-hotel">
            Cheap air tickets Flight tickets India Hotels Cheap Domestic Air
            Tickets Domestic Flights Domestic Airlines in India International
            Air Tickets International Flights International Airlines Holiday
            Packages
          </p>
        </Link>
        <h4 className="heading-flight-hotel">Useful Links</h4>
        <Link to="/comingSoon" className="nav-link">
          <p className="heading-flight-hotel">Myntra</p>
        </Link>
      </div>
    </div>
  );
}
