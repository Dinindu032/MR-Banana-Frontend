import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadingPage.css";

const LoadingPage = () => {
  const [loading, setLoading] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading < 100) {
      const timer = setInterval(() => {
        setLoading((prevLoading) => prevLoading + 1);
      }, 60);
      return () => clearInterval(timer);
    } else {
      navigate("/game-start");
    }
  }, [loading, navigate]);

  return (
    <div className="loading-page-screen">
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${loading}%` }}></div>
      </div>
      <h1 className="loading-title">Loading...</h1>
    </div>
  );
};

export default LoadingPage;
