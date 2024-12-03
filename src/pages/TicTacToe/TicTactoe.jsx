import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TicTacToe.css";
import banana_icon from "../../assets/Banana.jpg";
import tomato_icon from "../../assets/Tomato.jpg";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [lock, setLock] = useState(false);
  const [bananaScore, setBananaScore] = useState(0);
  const [tomatoScore, setTomatoScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [result, setResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // For time-up popup

  const navigate = useNavigate();

  const playerMove = (index) => {
    if (lock || timer === 0 || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = "x";
    setBoard(newBoard);

    checkWinner(newBoard);

    if (!lock && newBoard.includes("")) {
      setTimeout(() => computerMove(newBoard), 500);
    }
  };

  const computerMove = (newBoard) => {
    const emptyIndices = newBoard
      .map((value, index) => (value === "" ? index : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return;

    const computerIndex = emptyIndices[0];
    newBoard[computerIndex] = "o";
    setBoard(newBoard);

    checkWinner(newBoard);
  };

  const checkWinner = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setLock(true);
        if (newBoard[a] === "x") {
          const newScore = bananaScore + 1;
          setBananaScore(newScore);
          setResult("banana");
          saveBananaScore(newScore); // Save the score to the backend
        } else {
          setTomatoScore((prevScore) => prevScore + 1);
          setResult("tomato");
        }
        return;
      }
    }

    if (!newBoard.includes("")) {
      setLock(true);
      setResult("draw");
    }
  };

  const saveBananaScore = async (score) => {
    try {
      const response = await fetch("http://localhost:3000/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
        },
        body: JSON.stringify({ bananaScore: score }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save score to the backend:", errorData.error);
      } else {
        console.log("Banana score saved successfully!");
      }
    } catch (error) {
      console.error("Error saving banana score to the backend:", error);
    }
  };

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }

    if (timer === 0) {
      setIsTimerRunning(false);
      setLock(true);
      setShowPopup(true); // Show popup when time is over
    }
  }, [timer, isTimerRunning]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setLock(false);
    setResult(null);
  };

  const navigateToLeaderboard = () => {
    setShowPopup(false);
    navigate("/leaderboard");
  };

  const Scoreboard = ({ bananaScore, tomatoScore }) => (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <p>Banana: {bananaScore}</p>
      <p>Tomato: {tomatoScore}</p>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">
        MR.BANANA <span>VS</span>
        <span>MR.TOMATO</span>
      </h1>
      <Scoreboard bananaScore={bananaScore} tomatoScore={tomatoScore} />
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={() => playerMove(index)}
                >
                  {board[index] === "x" && (
                    <img src={banana_icon} alt="Banana" />
                  )}
                  {board[index] === "o" && (
                    <img src={tomato_icon} alt="Tomato" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {result && (
        <div className="result-modal">
          <div className="modal-content">
            {result === "banana" && <h1>🎉 Banana Wins!</h1>}
            {result === "tomato" && <h1>🎉 Tomato Wins!</h1>}
            {result === "draw" && <h1>🤝 It's a Draw!</h1>}
            <button className="continue" onClick={resetGame}>
              Continue
            </button>
          </div>
        </div>
      )}
      <div className="timer-box">
        <p>Time Remaining: {timer}s</p>
      </div>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>⏰ Time is Over!</h2>
            <p>View the Leaderboard to see the results.</p>
            <button
              className="view-leaderboard-btn"
              onClick={navigateToLeaderboard}
            >
              View Leaderboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
