import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Login from "../Login/Login";
import SignupByEmail from "../Signup/SignupByEmail";
import "./header.css";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    // You can optionally perform additional logout actions here
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
            <button className="logout" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
