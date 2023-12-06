import React, { useEffect } from "react";
import FlightResultCart from "./FlightResultCart";
import { useLocation } from "react-router-dom";

export default function FlightResult(props) {
  const location = useLocation();
  const fliData = location.state?.flightData11 || [];
  useEffect(() => {
    console.log("Gazala");
    console.log(fliData);
  }, [fliData]);
  return (
    <div>
      
      {fliData.map((item) => (
        <div className="result-section">
          <FlightResultCart
            image={item.images[1]}
            name={item.name}
            rating={item.rating}
          />
        </div>
      ))}
    </div>
  );
}
