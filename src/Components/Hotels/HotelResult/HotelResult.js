import React, { useEffect, useState } from "react";
import HotelResultCart from "./HotelResultCart";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { LuBadgePercent } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import Modal from "react-modal";

export default function HotelResult(props) {
  const [hotelId, setHotelId] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const location = useLocation();
  const [hotelData1, setHotelData1] = useState(location.state?.hotelData11);
  const searchParameter = location.state?.loc;
  const selectedDay = location.state?.selectedDate;
  console.log(selectedDay);
  console.log(searchParameter);

  const [dropdownValue, setDropdownValue] = useState("");
  const [dropdownValueRating, setDropdownValueRating] = useState("");
  const [dropdownValuePrice, setDropdownValuePrice] = useState("");
  const [starRating, setStarRating] = useState(null);

  console.log(hotelData1);

  var readFromApi = 0;
  const handleChange = (event) => {
    setDropdownValue(event.target.value);
    console.log(event.target.value);
    console.log(dropdownValue);
    if (readFromApi === 1) {
      SortByPrice(event.target.value);
    } else {
      sortBasedOnPrice(event.target.value);
    }
  };

  const handleChangeRating = (event) => {
    setDropdownValueRating(event.target.value);
    setHotelData1(sortBasedOnRating(event.target.value));
  };

  const handleChangePrice = (event) => {
    setDropdownValuePrice(event.target.value);
    setHotelData1(filterBasedOnPrice(event.target.value));
  };

  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  const handleFiveStarRating = () => {
    setStarRating("5");
    var res = getMultipleRandom(hotelData1, 8);
    const res1 = [...new Set(res)];
    setHotelData1(res1);
  };
  const handleFourStarRating = () => {
    setStarRating("4");
    var res = getMultipleRandom(hotelData1, 10);
    const res1 = [...new Set(res)];
    setHotelData1(res1);
  };
  const handleThreeStarRating = () => {
    setStarRating("3");
    var res = getMultipleRandom(hotelData1, 15);
    const res1 = [...new Set(res)];
    setHotelData1(res1);
  };

  function handleRatingFourPointFiveandAbove() {
    console.log("Azam");
    setHotelData1(sortBasedOnRating("2"));
  }
  function handleRatingFourandAbove() {
    setHotelData1(sortBasedOnRating("3"));
  }
  function handleRatingThreePointFiveandAbove() {
    setHotelData1(sortBasedOnRating("4"));
  }
  function handleRatingThreeandAbove() {
    setHotelData1(sortBasedOnRating("5"));
  }

  // function sort () {
  //   products.sort((a, b) => (a.color > b.color ? 1 : -1));
  // }
  function filterBasedOnPrice(option) {
    var res;
    if (option === "1") {
      console.log(option);

      res = hotelData1.filter(
        (a) =>
          (a.rooms[0].costDetails.baseCost < a.rooms[0].costPerNight
            ? a.rooms[0].costDetails.baseCost
            : a.rooms[0].costPerNight) >= 1000 &&
          (a.rooms[0].costDetails.baseCost < a.rooms[0].costPerNight
            ? a.rooms[0].costDetails.baseCost
            : a.rooms[0].costPerNight) < 3000
      );

      console.log(res);
      // return res;
    } else if (option === "2") {
      res = hotelData1.filter(
        (a) =>
          (a.rooms[0].costDetails.baseCost < a.rooms[0].costPerNight
            ? a.rooms[0].costDetails.baseCost
            : a.rooms[0].costPerNight) >= 3000 &&
          (a.rooms[0].costDetails.baseCost < a.rooms[0].costPerNight
            ? a.rooms[0].costDetails.baseCost
            : a.rooms[0].costPerNight) < 5000
      );
    } else if (option === "3") {
      res = hotelData1.filter(
        (a) =>
          (a.rooms[0].costDetails.baseCost < a.rooms[0].costPerNight
            ? a.rooms[0].costDetails.baseCost
            : a.rooms[0].costPerNight) >= 5000 &&
          (a.rooms[0].costDetails.baseCost < a.rooms[0].costPerNight
            ? a.rooms[0].costDetails.baseCost
            : a.rooms[0].costPerNight) < 10000
      );
    }
    console.log(res);
    return res;
  }

  function sortBasedOnPrice(option) {
    console.log(option);
    if (option === "1") {
      console.log(option);
      return hotelData1;
    } else if (option === "2") {
      hotelData1.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    } else if (option === "3") {
      console.log(option);
      hotelData1.sort((a, b) =>
        (a.rooms[0].costDetails.baseCost < a.rooms[0].costPerNight
          ? a.rooms[0].costDetails.baseCost
          : a.rooms[0].costPerNight) <
        (b.rooms[0].costDetails.baseCost < b.rooms[0].costPerNight
          ? b.rooms[0].costDetails.baseCost
          : b.rooms[0].costPerNight)
          ? 1
          : -1
      );
    } else if (option === "4") {
      console.log(option);
      hotelData1.sort((a, b) =>
        (a.rooms[0].costDetails.baseCost < a.rooms[0].costPerNight
          ? a.rooms[0].costDetails.baseCost
          : a.rooms[0].costPerNight) >
        (b.rooms[0].costDetails.baseCost < b.rooms[0].costPerNight
          ? b.rooms[0].costDetails.baseCost
          : b.rooms[0].costPerNight)
          ? 1
          : -1
      );
    }
  }

  function sortBasedOnRating(option) {
    var res;
    if (option === "2") {
      console.log(option);

      res = hotelData1.filter((a) => a.rating >= 4.5);
    } else if (option === "3") {
      console.log(option);

      res = hotelData1.filter((a) => a.rating >= 4);
    } else if (option === "4") {
      console.log(option);

      res = hotelData1.filter((a) => a.rating >= 3.5);
    } else if (option === "5") {
      console.log(option);

      res = hotelData1.filter((a) => a.rating >= 3);
    }
    console.log(res);
    return res;
  }

  function change(event) {
    event.persist(); //THE MAIN LINE THAT WILL SET THE VALUE
    this.setState(event.target.value);
    sortBasedOnPrice(event.target.value);
  }

  // for show the discount percent
  function calculateDiscount(actualPrice, appliedPrice) {
    let per;
    if (actualPrice > appliedPrice) {
      per = (appliedPrice / actualPrice) * 100;
    } else {
      per = (actualPrice / appliedPrice) * 100;
    }
    return Math.ceil(100 - per);
  }

  async function Apicall(id) {
    console.log(id);
    setHotelId(id);

    console.log("getting hotels details");
    console.log(hotelId);

    const Url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`;

    console.log(Url);
    const response = await fetch(Url, {
      method: "GET",
      headers: { projectID: "f104bi07c490" },
    });
    const data = await response.json();
    console.log(response);
    console.log(data);
    console.log(data?.data);
    setHotelDetails(data?.data);
    // console.log(hotelData);

    navigate(`/hotelDescription`, {
      state: {
        hotelDetailsData1: data?.data,
        starRating: starRating,
        selectedDay: selectedDay,
      },
    });
  }

  // const [sortedHotelData, setSortedHotelData] = useState(null);

  async function SortByPrice(e) {
    console.log("getting hotels data low to high");
    var Url = null;
    console.log(e);
    if (e === "4") {
      Url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchParameter}"}&sort={"price":1}`;
    } else {
      Url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchParameter}"}&sort={"price":-1}`;
    }

    console.log(Url);
    const response = await fetch(Url, {
      method: "GET",
      headers: { projectID: "f104bi07c490" },
    });
    const data = await response.json();
    console.log(response);
    console.log(data);
    console.log(data?.data?.hotels);
    setHotelData1(data?.data?.hotels);
  }

  useEffect(() => {
    console.log("Azam");
    // console.log(hotelData1);
    // Apicall();
  }, [hotelData1]);

  return (
    <div className="main-result">
      <div className="result-section-container1">
        <div className="result-filter">
          <div className="filter-title">
            <div onClick={openModal}>All filters</div>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Login Modal"
              style={{
                overlay: { background: "rgba(0, 0, 0, 0.5)" },
                content: {
                  width: "600px",
                  height: "600px",
                  opacity: "1",
                  transform: "none",
                  top: "60px",
                  left: "36px",
                  borderRadius: "16px",
                  border: "0px solid rgb(231,231,231)",
                  // boxShadow: "unset",
                  background: "rgba(255,255,255)",
                  position: "absolute",
                  overflow: "hidden auto",
                  minWidth: "16px",
                  minHeight: "16px",
                  outline: "none",
                  zIndex: "1300",
                  marginTop: "12px",
                },
              }}
            >
              <div>
                <div id="modal-filter">
                  <div className="modal-head">
                    <h2>Filters</h2>
                    <div>Reset all</div>
                  </div>
                  <div className="modal-body">
                    <div className="modal-deals">
                      <h2>Deals</h2>
                      <div className="modal-deals-container">
                        <div>
                          <div className="modal-deal-check">
                            <input type="checkbox" />
                            <div>Jackpot deals</div>
                          </div>
                          <span>25% & above</span>
                        </div>
                        <div>
                          <div className="modal-deal-check">
                            <input type="checkbox" />
                            <div>Bestseller Hotels</div>
                          </div>
                          <span>10% - 25% off</span>
                        </div>
                        <div>
                          <div className="modal-deal-check">
                            <input type="checkbox" />
                            <div>Best Budget deals</div>
                          </div>
                          <span>Min 29% off</span>
                        </div>
                        <div>
                          <div className="modal-deal-check">
                            <input type="checkbox" />
                            <div>Premium Hotels</div>
                          </div>
                          <span>Min 10% off</span>
                        </div>
                        <div>
                          <div className="modal-deal-check">
                            <input type="checkbox" />
                            <div>Deals of the day</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-star-catogories">
                      <h3>Star category</h3>
                      <div className="modal-star-option">
                        <div onClick={handleFiveStarRating}>5-star</div>
                        <div onClick={handleFourStarRating}>4-star</div>
                        <div onClick={handleThreeStarRating}>3-star</div>
                      </div>
                    </div>
                    <div className="modal-price">
                      <h3>Price (per night)</h3>
                    </div>
                    <div className="modal-rating">
                      <h3>Guest rating</h3>
                      <div className="modal-deal-check">
                        <input
                          type="checkbox"
                          onChange={handleRatingFourPointFiveandAbove}
                        />
                        <div>4.5 & above</div>
                        <input
                          type="checkbox"
                          onChange={handleRatingFourandAbove}
                        />
                        <div>4 & above</div>
                        <input
                          type="checkbox"
                          onChange={handleRatingThreePointFiveandAbove}
                        />
                        <div>3.5 & above</div>
                        <input
                          type="checkbox"
                          onChange={handleRatingThreeandAbove}
                        />
                        <div>3 & above</div>
                      </div>
                    </div>
                    <div className="modal-location">
                      <h3>Locality</h3>
                      <div className="modal-location-check">
                        <div className="location-input">
                          <IoIosSearch className="location-modal-icon" />
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </div>
                    <div className="modal-amenities">
                      <h3>Amenities</h3>
                      <div className="amenities-input">
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Airport shuttle service</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Swimming Pool</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Business center</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>WiFi service</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Gym</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Parking</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Resturant</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Game room</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Children's play area</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Baby Sitting / Child Services</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>24-hour security</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Lift/Elevator</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Air conditioning</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Power back up</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Room service</div>
                        </div>
                        <div className="amenities-input-check">
                          <input type="checkbox" />
                          <div>Housekeeping services</div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-inclusion">
                      <h3>Inclusion</h3>
                      <div className="inclusion-content">
                        <div className="inclusion-content-inner">
                          <FaRegStar />
                          <div>Free breakfast</div>
                        </div>
                        <div className="inclusion-content-inner">
                          <FaRegStar />
                          <div>Free cancellation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>

          <div className="filter-content">
            <div className="content">
              <div>Sort by:</div>
              <select onChange={handleChange} value={dropdownValue}>
                <option value="1">Recommended</option>
                <option value="2">Top-rated</option>
                <option value="3">Price: High to Low</option>
                <option value="4">Price: Low to High</option>
              </select>
            </div>
            <div className="content">
              <LuBadgePercent />
              <select>
                <option value="1">Deals</option>
                <option value="2">Jackpot deals</option>
                <option value="3">Bestseller hotels</option>
                <option value="4">Best budget deals</option>
                <option value="5">Premium hotels</option>
                <option value="6">Deal of the day</option>
              </select>
            </div>
            <div className="content">
              <FaRegStar />
              <select>
                <option value="1">Star category</option>
                <option value="2">5-star</option>
                <option value="3">4-star</option>
                <option value="4">3-star</option>
              </select>
            </div>
            <div className="content">
              <FaRegStar />
              <select onChange={handleChangeRating} value={dropdownValueRating}>
                <option value="2">4.5 & above</option>
                <option value="3">4 & above</option>
                <option value="4">3.5 & above</option>
                <option value="5">3 & above</option>
              </select>
            </div>
            <div className="content">
              <GrLocation />
              <select>
                <option value="1">Locality</option>
                <option value="1"></option>
                <option value="1"></option>
                <option value="1"></option>
              </select>
            </div>
            <div className="content">
              <LuBadgePercent />
              <select onChange={handleChangePrice} value={dropdownValuePrice}>
                <option>Price</option>
                <option value="1">1000-3000</option>
                <option value="2">3000-5000</option>
                <option value="3">5000-10000</option>
              </select>
            </div>
          </div>
        </div>
        <div className="result-search">
          <IoIosSearch className="hotel-result-icon" />
          <input type="text" />
        </div>
      </div>
      <div className="Number-countOfResult">
        {hotelData1?.length}
        <span className="Number-countOfResultOfSpan">
          {" "}
          of {hotelData1?.length} hotels in {searchParameter}
        </span>
      </div>
      <div className="result-section-container2">
        {hotelData1.map((item) => (
          <div
            className="result-section"
            onClick={() => {
              Apicall(item._id);
            }}
          >
            <HotelResultCart
              image={item.images[0]}
              amenities={item.amenities}
              name={item.name}
              rating={item.rating}
              baseCost={
                item.rooms[0].costPerNight < item.rooms[0].costDetails.baseCost
                  ? item.rooms[0].costPerNight
                  : item.rooms[0].costDetails.baseCost
              }
              tax={item.rooms[0].costDetails.taxesAndFees}
              costPerNight={
                item.rooms[0].costDetails.baseCost > item.rooms[0].costPerNight
                  ? item.rooms[0].costDetails.baseCost
                  : item.rooms[0].costPerNight
              }
              discount={calculateDiscount(
                item.rooms[0].costPerNight,
                item.rooms[0].costDetails.baseCost
              )}
              selectedDate={selectedDay}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
