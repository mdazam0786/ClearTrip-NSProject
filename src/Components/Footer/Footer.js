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
          <div>hi</div>

        </div>
      </div>
    </div>
  );
}
