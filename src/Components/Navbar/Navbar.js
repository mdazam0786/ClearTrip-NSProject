import React from "react";
import { MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import { TfiBag } from "react-icons/tfi";
import { IoMdStar } from "react-icons/io";

import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="left-navbar">
        <ul className="left-ul">
          <li className="custom-element">
            <Link to="/flights" className="nav-link">
              <MdOutlineFlight
                style={{
                  transform: "rotate(45deg)",
                  marginRight: "10px",
                }}
              />
              <div>Flights</div>
            </Link>
          </li>
          <li className="custom-element">
            <Link to="/hotels" className="nav-link">
              <RiHotelLine
                style={{
                  marginRight: "10px",
                }}
              />
              <div>Hotels</div>
            </Link>
          </li>
          <li className="custom-element">
            <Link to="/comingSoon" className="nav-link">
              <MdOutlineDirectionsBus
                style={{
                  marginRight: "10px",
                }}
              />
              <div>Bus</div>

              <img
                src="https://fastui.cltpstatic.com/image/upload/q_100/resources/images/bus/BusNew.png"
                alt="pic"
              />
            </Link>
          </li>
          <li className="custom-element">
            <Link to="/comingSoon" className="nav-link">
              <BiSolidOffer
                style={{
                  marginRight: "10px",
                }}
              />
              <div>Offers</div>
            </Link>
          </li>
          <li className="custom-element">
            <Link to="/comingSoon" className="nav-link">
              <TfiBag
                style={{
                  marginRight: "10px",
                }}
              />
              <div>My trips</div>
            </Link>
          </li>
          <li className="custom-element">
            <Link to="/comingSoon" className="nav-link">
              <IoMdStar
                style={{
                  marginRight: "10px",
                }}
              />
              <div>Cleartrip for Business</div>
            </Link>
          </li>
          <li className="custom-element">
            <Link to="/comingSoon" className="nav-link">
              <BiSupport
                style={{
                  marginRight: "10px",
                }}
              />
              <div>Support</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
