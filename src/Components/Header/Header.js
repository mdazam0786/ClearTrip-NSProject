


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Modal from "react-modal";
// import "./header.css";
// import Login from "../Login/Login";
// import SignupByEmail from "../Signup/SignupByEmail";
// import { useAuth } from "../../MyContext";

// export default function Header() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
//   const { user, setUser } = useAuth();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const name = localStorage.getItem("name");

//     if (token && name) {
//       setUser({ token, name });
//     }
//   }, [setUser]);

//   const closeSignupModal = () => {
//     setIsSignupModalOpen(false);
//     openModal();
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("name");
//     setUser(null);
//   };

//   const handleSignupSuccess = () => {
//     closeSignupModal();
//     openModal();
//   };

//   return (
//     <div className="header">
//       <div className="container">
//         <div className="logo">
//           <Link to="/flights">
//             <img
//               src="https://etimg.etb2bimg.com/photo/94049186.cms"
//               alt="pic"
//             />
//           </Link>
//         </div>
//         {!user ? (
//           <div className="login">
//             <button onClick={openModal}>Login / Sign up</button>
//             <Modal
//               isOpen={isModalOpen}
//               onRequestClose={closeModal}
//               contentLabel="Login Modal"
//               style={{
//                 overlay: { background: "rgba(0, 0, 0, 0.5)" },
//                 content: {
//                   width: "800px",
//                   height: "430px",
//                   margin: "auto",
//                   overflow: "hidden",
//                   borderRadius: "10px",
//                 },
//               }}
//             >
//               <Login closeModal={closeModal} />
//             </Modal>
//           </div>
//         ) : (
//           <div className="logout">
//             <Link to="/BookingHistory" className="logout1">{user?.name} |</Link>
//             <button className="logout" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//       {isSignupModalOpen && (
//         <SignupByEmail
//           closeModal={closeSignupModal}
//           onSignupSuccess={handleSignupSuccess}
//         />
//       )}
//     </div>
//   );
// }

// Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./header.css";
import Login from "../Login/Login";
import SignupByEmail from "../Signup/SignupByEmail";
import { useAuth } from "../../MyContext";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [passengers, setPassengers] = useState(1);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token && name) {
      setUser({ token, name });
    }
  }, [setUser]);

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
    setUser(null);
  };

  const handleSignupSuccess = () => {
    closeSignupModal();
    openModal();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement the logic to update the search results based on the new criteria
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
        {/* <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="date"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
          <input
            type="number"
            min="1"
            placeholder="Passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          />
          <button type="submit">Search</button>
        </form> */}
        {!user ? (
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
              <Login closeModal={closeModal} />
            </Modal>
          </div>
        ) : (
          <div className="logout">
            <Link to="/BookingHistory" className="logout1">{user?.name} |</Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      {isSignupModalOpen && (
        <SignupByEmail
          closeModal={closeSignupModal}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </div>
  );
}
