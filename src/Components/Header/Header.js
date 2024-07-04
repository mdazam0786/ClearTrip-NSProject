import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./header.css";
import Login from "../Login/Login";
import SignupByEmail from "../Signup/SignupByEmail";
import { useAuth } from "../../MyContext";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'login' or 'signup'
  const { user, setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token && name) {
      setUser({ token, name });
    }
  }, [setUser]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUser(null);
  };

  const handleSignupSuccess = () => {
    closeModal();
    openModal('login');
  };

  const switchToLogin = () => {
    openModal('login');
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
        {!user ? (
          <div className="login">
            <button onClick={() => openModal('login')}>Login / Sign up</button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Authentication Modal"
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
              {modalType === 'login' ? (
                <Login closeModal={closeModal} />
              ) : (
                <SignupByEmail closeModal={closeModal} onSignupSuccess={handleSignupSuccess} switchToLogin={switchToLogin} />
              )}
            </Modal>
          </div>
        ) : (
          <div className="logout">
            <Link to="/BookingHistory" className="logout1">{user.name} |</Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
