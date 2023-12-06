import React, { useEffect, useState } from "react";

import "./signup.css";
import { RxCross1 } from "react-icons/rx";



export default function Signup({closeModal}) {
  // for carousel of left side
  const [slide, setSlide] = useState(false);

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlide((prevSlide) => !prevSlide);
    }, 3000);
    return () => clearInterval(intervalId);

  }, []);

  async function Apicall() {
    console.log("Signup called");

    const Url = `https://academics.newtonschool.co/api/v1/bookingportals/signup`;

    console.log(Url);
    const response = await fetch(Url, {
      method: "POST",
      headers: {
        projectId: "f104bi07c490",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: "Naiyer",
        email: "mdnaiyer97@gmail.com",
        password: "123456",
        appType: "bookingportals",
      }),
    });
    const data = await response.json();
    console.log(response);
    console.log(data);
  }

  useEffect(() => {
    Apicall();
  }, []);



  return (
    <div className="signup-main">
      <div className="signup-left">
        {slide ? (
          <img
            src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider2.png"
            alt="Image1"
          />
        ) : (
          <img
            src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider3.png"
            alt="Image1"
          />
        )}
      </div>
      <div className="signup-right">
        <div className="close-button" onClick={closeModal}>
          <RxCross1 />
        </div>
        <div className="signup-form">
          <div className="signup-field">
            <div className="signup-input">
              <select>
                <option value="India(+91)">+91</option>
                <option value="+91">India(+91)</option>
              </select>
              <div className="signup-input-filled">
                <input type="text" placeholder="Enter mobile number" />
              </div>
            </div>
            <button type="submit" className="btn-otp">
              Get OTP
            </button>
            <div className="btn-below-text">We no more support email based login. You can now login via mobile number & link email to access your account.</div>
          </div>
          <div className="signup-agreement">
            <div className="bor-color"></div>
            <div className="agreement-content">
              <span className="span-1">
                <span>By continuing, you agree to Cleartrip's </span>
                <a className="policy" href="https://www.cleartrip.com/privacy-policy/"><span> privacy policy </span></a>
                <span>&</span>
              </span>
              <a className="span-2" href="https://www.cleartrip.com/privacy-policy/"><span >terms of use</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
