import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logoand-more">
        <div className="logo-left-side">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmVTdFkJ3M8Nuy3umj8hSm0WmWhMscHHWxA&usqp=CAU"
            alt=""
            style={{ filter: " brightness(1) invert(0.1)" }}
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
      <div style={{borderTop: "1px solid #b5b2b2",marginLeft: "50px", marginRight: "50px"}}></div>
    <h4>
    Popular Domestic Flight Routes
    </h4>
    <p>    Delhi Goa flights
    Mumbai Delhi flights
    Delhi Kolkata flights
    Pune Delhi flights
    Bangalore Delhi flights
    Mumbai Bangalore flights
    Chennai Delhi flights
    Kolkata Delhi flights
    Delhi Mumbai flights
    Delhi Bangalore flights
    Mumbai Goa flights</p>
    </div>
  );
}
