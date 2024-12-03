import React, { useEffect } from "react";
import BananaGame from "../../components/BananaGame/BananaGame";
import "./GamePage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const GamePage = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/tictactoe");
  // }, []);

  return (
    <div>
      <Link to="/tictactoe" className="start-button">
        PLAY
      </Link>
      <BananaGame />
    </div>
  );
};

export default GamePage;
