// // Login.js
// import React, { useState, useEffect } from "react";
// import "./login.css";
// import { RxCross1 } from "react-icons/rx";
// import { Link } from "react-router-dom";
// import SignupByEmail from "../Signup/SignupByEmail";
// import { useAuth } from "../../MyContext";

// export default function Login({ closeModal }) {
//   const { setUser } = useAuth();
//   const [slide1, setSlide1] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

//   const openSignupModal = () => {
//     setIsSignupModalOpen(true);
//   };

//   const changeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const changePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setSlide1((prevSlide) => !prevSlide);
//     }, 3000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleLoginSuccess = (token, name) => {
//     closeModal();
//     setUser({ token, name });
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validateForm = () => {
//     if (!validateEmail(email)) {
//       setError("Invalid email format");
//       return false;
//     }
//     if (!password) {
//       setError("Password cannot be empty");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handlEnterKeyPress = (e) => {
//     if (e.key === "Enter") {
//       Apicall();
//     }
//   };

//   async function Apicall() {
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const Url = `https://academics.newtonschool.co/api/v1/bookingportals/login`;

//       const response = await fetch(Url, {
//         method: "POST",
//         headers: {
//           projectId: "104bi07c490",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           appType: "bookingportals",
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("name", data.data.user.name);
//         handleLoginSuccess(data.token, data.data.user.name);
//       } else if (response.status === 401) {
//         const errorData = await response.json();
//         setError(errorData.message);
//       }
//     } catch (error) {
//       setError("Error fetching data: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="signup-main">
//       <div className="signup-left">
//         {slide1 ? (
//           <img
//             src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider2.png"
//             alt="Image1"
//           />
//         ) : (
//           <img
//             src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider3.png"
//             alt="Image1"
//           />
//         )}
//       </div>
//       <div className="signup-right">
//         <div className="signup-container">
//           <div className="close-button" onClick={closeModal}>
//             <RxCross1 />
//           </div>
//           <div className="signup-form">
//             <div className="signup-field">
//               <div className="signup-input-field">
//                 <input
//                   type="text"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={changeEmail}
//                 />
//               </div>
//               <div className="signup-input-field">
//                 <input
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={changePassword}
//                   onKeyDown={handlEnterKeyPress}
//                 />
//               </div>
//               {error && <div className="error-message">{error}</div>}
//               <button
//                 type="submit"
//                 className="signup-btn"
//                 onClick={Apicall}
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//               <Link className="btn-below-text" to="#" onClick={openSignupModal}>
//                 New User Please Signup Here
//               </Link>
//             </div>
//             <div className="signup-agreement">
//               <div className="bor-color"></div>
//               <div className="agreement-content">
//                 <span className="span-1">
//                   <span>By continuing, you agree to Cleartrip's </span>
//                   <a
//                     className="policy"
//                     href="https://www.cleartrip.com/privacy-policy/"
//                   >
//                     <span> privacy policy </span>
//                   </a>
//                   <span>&</span>
//                 </span>
//                 <a
//                   className="span-2"
//                   href="https://www.cleartrip.com/privacy-policy/"
//                 >
//                   <span>terms of use</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isSignupModalOpen && <SignupByEmail closeModal={closeModal} />}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import "./login.css";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import SignupByEmail from "../Signup/SignupByEmail";
import { useAuth } from "../../MyContext";

export default function Login({ closeModal}) {
  const {setUser } = useAuth();
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

  const handleLoginSuccess = (token, name) => {
    closeModal();
    setUser({token, name}); 
  };

  const handlEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      Apicall();
      }
  };

  async function Apicall() {
    setEmail("");
    setLoading(true);

    try {
      const Url = `https://academics.newtonschool.co/api/v1/bookingportals/login`;

      const response = await fetch(Url, {
        method: "POST",
        headers: {
          projectId: "104bi07c490",
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
        localStorage.setItem("name", data.data.user.name);
        handleLoginSuccess(data.token, data.data.user.name); 
      } else if (response.status === 401) {
        // const errorData = await response.json();
        setError("Wrong email or password");
      }
    } catch (error) {
      setError("Error fetching data: ", error.message);
    } finally {
      setLoading(false);
    }
  }

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
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={changePassword}
                  onKeyDown={handlEnterKeyPress}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button
                type="submit"
                className="signup-btn"
                onClick={Apicall}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
      {isSignupModalOpen && <SignupByEmail closeModal={closeModal} />}
    </div>
  );
}