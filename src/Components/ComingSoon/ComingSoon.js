import React from "react";
import { useState, useEffect } from 'react'
import Navbar from "../Navbar/Navbar";
import "./comingSoon.css";

export default function ComingSoon() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(true);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className={`coming-soon ${showMessage ? "show-message" : ""}`}>
        <h1>Work in Progress</h1>
      </div>
    </div>
  );
}
