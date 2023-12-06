// for context 
import { MyContext } from "./MyContext";
import { useState, React } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header/Header";
import Hotels from "./Components/Hotels/Hotels";
import Flights from "./Components/Flights/Flights";
import HotelResult from "./Components/Hotels/HotelResult";
import HotelDesription from "./Components/Hotels/HotelDesription";
import SignupByEmail from "./Components/Signup/SignupByEmail";
import Login from "./Components/Login/Login";

function App() {
  const [token, setToken] = useState("");
  return (
    <MyContext.Provider value={{token, setToken}}>
    <Router>
      {/* <Login /> */}
      
      <Header />
      <Routes>
        <Route exact path="/" element={<Flights/>} />
        <Route exact path="/flights" element={<Flights/>} />
        <Route exact path="/hotels" element={<Hotels />} />
        <Route exact path="/hotelResult" element={<HotelResult/>} />
        <Route path="/hotelDescription" element={<HotelDesription/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<SignupByEmail/>} />
        {/* <Route exact path="/signupByEmail" element={<SignupByEmail/>} /> */}
        
      </Routes>
    </Router>
    </MyContext.Provider>
   
  );
}

export default App;
