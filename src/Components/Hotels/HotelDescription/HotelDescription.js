import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./hotelDescription.css";
import { FaTripadvisor } from "react-icons/fa";
import PoolIcon from "@mui/icons-material/Pool";
import { MdOutlineRestaurant } from "react-icons/md";
import FitnessCenterSharpIcon from "@mui/icons-material/FitnessCenterSharp";
import { MdLocalBar } from "react-icons/md";
import { FaSpa, FaWifi } from "react-icons/fa";
import Modal from "react-modal";
import Login from "../../Login/Login";
import SignupByEmail from "../../Signup/SignupByEmail";
import { useAuth } from "../../../MyContext";


export default function HotelDesription(props) {
  const location = useLocation();
  const detailsData = location.state?.hotelDetailsData1 || [];
  const starRating = location.state?.starRating || undefined;
  const selectedDate = location.state?.selectedDay;
  const descriptionRef = useRef(null);
  const navigate = useNavigate();
  const {user} = useAuth();
  
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  console.log(selectedDate);

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

  const handleSelectRoom = () => {
    // Scroll to the description section
    descriptionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookHotel = () => {
    if(!user)
    {  
        setShowLogin(true);
        return;
    }
    
    navigate("/HotelBooking", {
      state: {
        detailsData: detailsData,
        starRating: starRating,
        selectedDate: selectedDate,
      },
    });    
  }

  const closeModal = () => {
    setShowLogin(false);
  };

  const toggleSignupModal = () => {
    setShowSignup(!showSignup);
  };
  
  

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
              <button className="select-room" onClick={handleSelectRoom}>
                Select room
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hotel-rooms" ref={descriptionRef}>
        {detailsData.rooms.map((room, index) => (
          <div className="hotel-rooms-list" key={index}>
            <div className="hotel-room-title">
              <h1>Room {room.roomType}</h1>
            </div>
            <div className="hotel-room-details">
              <div className="room-bed">Bed: {room.bedDetail}</div>
              <div className="room-area">{room.roomSize} sqft</div>
              <div className="room-cancellation">{room.cancellationPolicy}</div>
            </div>
            <div className="hotel-room-price">
              &#8377; {room.costDetails.baseCost}{" "}
              <span>+ &#8377; {room.costDetails.taxesAndFees} tax/night</span>
            </div>
            <div onClick={handleBookHotel} className="hotel-room-book-btn">
              Book
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={showLogin}
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
        
        <Login closeModal={closeModal}  openSignupModal={toggleSignupModal}/>

      </Modal>
      <Modal
        isOpen={showSignup}
        onRequestClose={toggleSignupModal}
        contentLabel="Signup Modal"
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
        <SignupByEmail closeModal={toggleSignupModal} />
      </Modal>
    </div>
  );
}
