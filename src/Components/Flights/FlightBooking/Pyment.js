import React from "react";
import Navbar from "../../Navbar/Navbar";
import "./pyment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Pyment() {
  const location = useLocation();
  const totalPrice = location.state && location.state.totalPrice;
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState("");
  const [inputError, setInputError] = useState(false);


  const handlePayNow = () => {
    if (!upiId.trim()) {
        setInputError(true);
        return;
      }
    const confirmed = window.confirm(
      "Are you sure you want to proceed with payment?"
    );
    if (confirmed) {
      navigate("/");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="pyment_section">
        <div className="pyment_title">Pay to complete your booking</div>
        <div className="pyment_content">
          <div className="pyment_mode">
            <div id="pyment_mode_upi" className="active_div">
              UPI
            </div>
            <div id="pyment_mode_upi">Debit/Credit Card</div>
          </div>
          <div className="pyment_details_box">
            <label htmlFor="upi_id">Enter UPI ID</label>
            <input
              type="text"
              className={`upi_id ${inputError ? 'input-error' : ''}`}
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => {
                setUpiId(e.target.value);
                setInputError(false); 
              }}
            />
            {inputError && <p className="error-message">Please enter your UPI ID</p>}
         
          </div>
        </div>
        <div className="pay_now_box">
          <div className="pay_now_price">Rs {totalPrice}</div>
          <div className="pyment-btn" onClick={handlePayNow}>
            Pay now
          </div>
        </div>
      </div>
    </div>
  );
}
