import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Login from "../Login/Login";
import "./header.css";
import SignupByEmail from "../Signup/SignupByEmail";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      const storedUserName = localStorage.getItem("name");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, []);

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setLoggedIn(false);
    setUserName("");
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
            <img
              src="https://etimg.etb2bimg.com/photo/94049186.cms"
              alt="pic"
            />
          </Link>
        </div>
        {!loggedIn ? (
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
              <Login closeModal={closeModal} setLoggedIn={setLoggedIn} />
            </Modal>
          </div>
        ) : (
          <div className="logout">
            <div className="logout1">{userName.charAt(0).toUpperCase() + userName.slice(1)}</div>
            <span style={{marginLeft: "10px"}}>|</span>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      {isSignupModalOpen && (
        <SignupByEmail
          closeModal={closeSignupModal}
          setLoggedIn={setLoggedIn}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </div>
  );
}
