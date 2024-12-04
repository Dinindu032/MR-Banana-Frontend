import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import sound from "./assets/hip-hop-202127.mp3"; // Adjusted the path to match typical folder structures.
import GamePage from "./pages/GamePage/GamePage";
import GameStartPage from "./pages/GameStartPage/GameStartPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
// import cursor from "./assets/banana1.png";
import "./App.css";
import GameMode from "./pages/GameMode/GameMode";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import TicTacToe from "./pages/TicTacToe/TicTactoe";

const App = () => {
  const [cursor, setCursor] = useState("default"); // State for cursor style

  // Function to play the sound
  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  // Function to change the cursor style
  const changeCursor = () => {
    setCursor(
      cursor === "default" ? "url(src/assets/banana1.png), auto" : "default"
    );
  };

  return (
    <div className="App" style={{ cursor }}>
      {/* Button to trigger the sound */}
      <button onClick={playSound} className="play-sound-button">
        Play Sound 🎵
      </button>

      {/* Button to change the cursor */}
      <button onClick={changeCursor} className="change-cursor-button">
        Change Cursor
      </button>

      {/* Router Configuration */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/game-start" element={<GameStartPage />} />
          <Route path="/game-page" element={<GamePage />} />
          <Route path="/game-mode" element={<GameMode />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
