import { AuthProvider } from "./MyContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import SignupByEmail from "./Components/Signup/SignupByEmail";
import Login from "./Components/Login/Login";
import Hotels from "./Components/Hotels/HotelSearch/Hotels";
import HotelResult from "./Components/Hotels/HotelResult/HotelResult";
import HotelDesription from "./Components/Hotels/HotelDescription/HotelDescription";
import FlightResult from "./Components/Flights/FlightResult/FlightResult";
import Flights from "./Components/Flights/FlightSearch/Flights";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import FlightBooking from "./Components/Flights/FlightBooking/FlightBooking";
import HotelBooking from "./Components/Hotels/HotelBooking/HotelBooking";
import Payment from "./Components/Payment/Payment";
import BookingHistory from "./Components/BookingHistory/BookingHistory";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Flights />} />
            <Route exact path="/flights" element={<Flights />} />
            <Route exact path="/comingSoon" element={<ComingSoon />} />
            <Route exact path="/flightResult" element={<FlightResult />} />
            <Route exact path="/hotels" element={<Hotels />} />
            <Route exact path="/hotelResult" element={<HotelResult />} />
            <Route path="/hotelDescription" element={<HotelDesription />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignupByEmail />} />
            <Route exact path="/flightBooking" element={<FlightBooking />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/hotelBooking" element={<HotelBooking />} />
            <Route exact path="/bookingHistory" element={<BookingHistory />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
