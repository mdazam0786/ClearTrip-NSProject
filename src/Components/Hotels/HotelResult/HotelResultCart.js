import React, { useEffect } from "react";
import "./hotelResult.css";
import "./hotelResultCart.css";
import { FaTripadvisor } from "react-icons/fa";

export default function HotelResultCart(props) {
  useEffect(() => {
    // console.log(props.name);
    // console.log(props.rating);
    // console.log(props.image);
    // console.log(props.amenities);
    // console.log(props.costPerNight);
    // console.log(props.tax);
    // console.log(props.caseCost);
    // console.log(props.discount);
    // console.log(props.selectedDate);

  }, []);

  return (
    <div className="hotel-cart">
      <div className="hotel-cart-image">
        <img src={props.image} alt="hotel-cart-image" />
      </div>
      <div className="hotel-cart-content">
        {/* <h3 className="hotel-cart-amenities">{props.selectedDate.toLocaleDateString()}</h3> */}
        <h4 className="hotel-cart-name">{props.name}</h4>
        <h4 className="hotel-cart-rating">
          <FaTripadvisor style={{cursor: 'pointer', paddingRight:'5px', width:'20px', height:'20px'}}/> 
          {props.rating}/5</h4>
      </div>
      <div className="hotel-cart-content2">
        <h4>&#8377; {props.baseCost}</h4>
        <p>+ &#8377;{props.tax} tax / night</p>
      </div>
      <div className="hotel-cart-content3">
        <p>&#8377;{props.costPerNight} </p>
        <p className="percent">&#8377;{props.discount}% off</p>
        <p>+ Additional bank discounts</p>

      </div>
    </div>
  );
}