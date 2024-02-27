import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./hotelDescription.css";
import RoomDetail from "../Rooms/RoomDetail";
import { FaTripadvisor } from "react-icons/fa";
import PoolIcon from "@mui/icons-material/Pool";
import { MdOutlineRestaurant } from "react-icons/md";
import FitnessCenterSharpIcon from "@mui/icons-material/FitnessCenterSharp";
import { MdLocalBar } from "react-icons/md";
import { FaSpa, FaWifi } from "react-icons/fa";

export default function HotelDesription(props) {
  const location = useLocation();
  const detailsData = location.state?.hotelDetailsData1 || [];
  const starRating = location.state?.starRating || undefined;

  // console.log(calDiscount);

  const amenityIcons = {
    Gym: <FitnessCenterSharpIcon />,
    "Swimming Pool": <PoolIcon />,
    Spa: <FaSpa />,
    Bar: <MdLocalBar />,
    Restaurant: <MdOutlineRestaurant />,
    "Free WiFi": <FaWifi />,
  };

  const getRandom = (min, max) => {
    min = Math.min(min);
    max = Math.max(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const random = getRandom(3, 5);

  function calDiscount(actualPrice, appliedPrice) {
    let per;
    if (actualPrice > appliedPrice) {
      per = (appliedPrice / actualPrice) * 100;
    } else {
      per = (actualPrice / appliedPrice) * 100;
    }
    return Math.ceil(100 - per);
  }

  useEffect(() => {
    console.log(detailsData);
    console.log("Naiyer Azam");
  }, [detailsData]);

  return (
    <div className="main-desc">
      <div className="description-heading">
        <Link to="/General">
          <div className="description-heading-content">General</div>
        </Link>
        <Link to="/General">
          <div className="description-heading-content">Amenities</div>
        </Link>
        <Link to="/General">
          <div className="description-heading-content">Rules</div>
        </Link>
        <Link to="/General">
          <div className="description-heading-content">About</div>
        </Link>
        <Link to="/General">
          <div className="description-heading-content">Location</div>
        </Link>
        <Link to="/General">
          <div className="description-heading-content">Review</div>
        </Link>
        <Link to="/General">
          <div className="description-heading-content">Rooms</div>
        </Link>
      </div>
      <div className="hotel-desc-border"></div>
      <div className="hotel-desc">
        <div className="hotel-desc-left">
          <h1>{detailsData.name}</h1>
          <duv className="hotel-rating">
            <p>
              {starRating !== undefined ? starRating : random}-star Hotel .{" "}
            </p>
            <p>{detailsData.location}</p>
          </duv>
          <div className="rating-logo">
            <h4>{detailsData.rating}/5</h4>
            <div>
              <FaTripadvisor
                style={{
                  cursor: "pointer",
                  paddingRight: "5px",
                  width: "25px",
                  height: "25px",
                }}
              />
              <svg height="16" width="16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#00AA6c" />
              </svg>
              <svg height="16" width="16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#00AA6c" />
              </svg>
              <svg height="16" width="16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#00AA6c" />
              </svg>

              {detailsData.rating === 3.5 ? (
                <div>
                  <svg height="16" width="16" fill="none">
                    <circle cx="8" cy="8" r="7.5" stroke="#00AA6c" />
                    <path fill="#00AA6C" d="M8 0a8 8 0 000 16V0z"></path>
                  </svg>

                  <svg height="16" width="16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="7.5"
                      fill="none"
                      stroke="#00AA6c"
                    />
                  </svg>
                </div>
              ) : null}

              {detailsData.rating === 4 ? (
                <div>
                  <svg height="16" width="16" fill="none">
                    <circle cx="8" cy="8" r="7.5" fill="#00AA6c" />
                  </svg>
                  <svg height="16" width="16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="7.5"
                      fill="none"
                      stroke="#00AA6c"
                    />
                  </svg>
                </div>
              ) : null}

              {detailsData.rating == 4.5 ? (
                <div>
                  <svg height="16" width="16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#00AA6c" />
                  </svg>

                  <svg height="16" width="16" fill="none">
                    <circle cx="8" cy="8" r="8" stroke="#00AA6c" />
                    <path fill="#00AA6C" d="M8 0a8 8 0 000 16V0z"></path>
                  </svg>
                </div>
              ) : null}

              {detailsData.rating == 5 ? (
                <div>
                  <svg height="16" width="16" fill="none">
                    <circle cx="8" cy="8" r="7.5" fill="#00AA6c" />
                  </svg>

                  <svg height="16" width="16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#00AA6c" />
                  </svg>
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <h2>Amenities</h2>
            <div className="amenities-data">
              {detailsData.amenities.map((item, index) => (
                <div key={index} className="amenity-item">
                  {amenityIcons[item]}{" "}
                  <span className="amenity-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hotel-desc-right">
          <div className="hotel-desc-img">
            <img
              src={detailsData.images}
              alt={detailsData.name}
              className="description-image"
            />
          </div>
          <div className="hotel-desc-price">
            <div className="hotel-desc-detailsPrice">
              <strong>
                &#8377;
                {detailsData?.rooms[0].costPerNight <
                detailsData?.rooms[0].costDetails.baseCost
                  ? detailsData?.rooms[0].costPerNight
                  : detailsData?.rooms[0].costDetails.baseCost}
              </strong>
              <span>
                {" "}
                + &#8377;{detailsData.rooms[0].costDetails.taxesAndFees} tax /
                night
              </span>

              <div className="hotel-cart-content3">
                <p>
                  &#8377;
                  {detailsData.rooms[0].costDetails.baseCost >
                  detailsData.rooms[0].costPerNight
                    ? detailsData.rooms[0].costDetails.baseCost
                    : detailsData.rooms[0].costPerNight}
                </p>
                <p className="percent">
                  {calDiscount(
                    detailsData.rooms[0].costPerNight,
                    detailsData.rooms[0].costDetails.baseCost
                  )}
                </p>
                <p>% off </p>
              </div>
            </div>
            <div>
              <button className="select-room">Select room</button>
            </div>
          </div>
        </div>
      </div>
      {/* {detailsData.rooms.map((room, index) => (
        <RoomDetail roomDetail={room} />
        
      ))} */}
      <div >
        {detailsData.rooms.map((room, index) => (
          <div key={index}>
            <h2>Room {room.roomNumber}</h2>
            <p>Room Type: {room.roomType}</p>
            <p>Bed Detail: {room.bedDetail}</p>
            <p>Cost Per Night: {room.costPerNight}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
