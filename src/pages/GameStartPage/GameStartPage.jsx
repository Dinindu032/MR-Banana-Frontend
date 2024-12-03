import React from "react";
import "./GameStartPage.css";
import { Link } from "react-router-dom";

const GameStartPage = () => {
  return (
    <div className="game-start-container">
      <h1 className="game-title">ARE YOU READY FOR THE CHALLANGE?</h1>
      <Link to="/game-mode" className="start-button">
        BEGIN
      </Link>
    </div>
  );
};

export default GameStartPage;
