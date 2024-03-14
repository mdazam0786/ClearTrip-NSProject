import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Login from "../Login/Login";
import "./header.css";
import SignupByEmail from "../Signup/SignupByEmail";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const userName = localStorage.getItem("name");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
    openModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleSignupSuccess = () => {
    closeSignupModal();
    openModal();
  };

  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <Link to="/flights">
            <img src="https://etimg.etb2bimg.com/photo/94049186.cms" alt="pic" />
          </Link>
        </div>
        {!isLoggedIn ? (
          <div className="login">
            <button onClick={openModal}>Login / Sign up</button>
            <Modal
              isOpen={isModalOpen}
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
              <Login closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} />
            </Modal>
          </div>
        ) : (
          <div className="logout">
            <div style={{marginRight: "10px"}}>{userName && userName.toUpperCase()}</div>
            <div > |</div>
            <button className="logout1" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      {isSignupModalOpen && (
        <SignupByEmail
          closeModal={closeSignupModal}
          setIsLoggedIn={setIsLoggedIn}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </div>
  );
}
