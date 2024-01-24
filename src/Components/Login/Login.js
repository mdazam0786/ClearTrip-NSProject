import React, { useEffect, useState } from "react";
import "./login.css";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import SignupByEmail from "../Signup/SignupByEmail";

export default function Login({ closeModal, setLoggedIn }) {
  // const navigate = useNavigate();

  const [slide1, setSlide1] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlide1((prevSlide) => !prevSlide);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  async function Apicall() {
    console.log("Signup called");
    setEmail("");
    setLoading(true);

    try {
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/login`;

      console.log(Url);
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          projectId: "f104bi07c490",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
          appType: "bookingportals",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log(response);
        console.log(data);
        setLoggedIn(true);
        closeModal();
        // navigate("/flights");
        console.log("success");
      } else if (response.status === 400) {
        console.log(response.status);
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
      setError("Error fetching data: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   Apicall();
  // }, []);

  return (
    <div className="signup-main">
      <div className="signup-left">
        {slide1 ? (
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
        <div className="signup-container">
          <div className="close-button" onClick={closeModal}>
            <RxCross1 />
          </div>
          <div className="signup-form">
            <div className="signup-field">
              <div className="signup-input-field">
                <input
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={changeEmail}
                />
              </div>
              <div className="signup-input-field">
                <input
                  type="text"
                  placeholder="Enter password"
                  value={password}
                  onChange={changePassword}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button
                type="submit"
                className="signup-btn"
                onClick={Apicall}
                disabled={loading}
              >
                Login
              </button>
              <Link className="btn-below-text" to="#" onClick={openSignupModal}>
                <div>New User Please Signup Here</div>
              </Link>
            </div>
            <div className="signup-agreement">
              <div className="bor-color"></div>
              <div className="agreement-content">
                <span className="span-1">
                  <span>By continuing, you agree to Cleartrip's </span>
                  <a
                    className="policy"
                    href="https://www.cleartrip.com/privacy-policy/"
                  >
                    <span> privacy policy </span>
                  </a>
                  <span>&</span>
                </span>
                <a
                  className="span-2"
                  href="https://www.cleartrip.com/privacy-policy/"
                >
                  <span>terms of use</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSignupModalOpen && <SignupByEmail closeModal={closeModal} setLoggedIn={setLoggedIn }/>}
    </div>
  );
}
