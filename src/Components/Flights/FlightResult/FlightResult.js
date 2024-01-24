import React, { useEffect } from "react";
import FlightResultCart from "./FlightResultCart";
import { useLocation } from "react-router-dom";


export default function FlightResult(props) {
  const location = useLocation();
  const flightDataResult = location.state?.flightDataSearch || [];

  useEffect(() => {
    console.log("Gazala");
    console.log(flightDataResult);
  }, [FlightResultCart])
  return (
    <div>
      
    </div>
  );
}
