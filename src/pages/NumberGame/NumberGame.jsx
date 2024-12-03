import React, { useState, useEffect } from "react";
import "./NumberGame.css";

const NumberMatchGame = () => {
  const [board, setBoard] = useState([]);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(30); // 30 seconds timer

  // Generate random numbers for the board
  useEffect(() => {
    const numbers = Array(10)
      .fill()
      .flatMap((_, i) => [i + 1, i + 1]); // Create pairs of numbers
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5); // Shuffle the numbers
    setBoard(shuffledNumbers);
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      alert("Time's up! Game Over.");
      resetGame();
    }
  }, [timer]);

  const handleClick = (index) => {
    if (firstSelection === null) {
      setFirstSelection(index);
    } else if (secondSelection === null && index !== firstSelection) {
      setSecondSelection(index);
    }
  };

  useEffect(() => {
    if (firstSelection !== null && secondSelection !== null) {
      const firstNumber = board[firstSelection];
      const secondNumber = board[secondSelection];

      if (firstNumber === secondNumber) {
        // If numbers match
        const newBoard = [...board];
        newBoard[firstSelection] = null;
        newBoard[secondSelection] = null;
        setBoard(newBoard);
        setScore((prev) => prev + 100);
      } else {
        // If numbers don't match, decrease lives
        setLives((prev) => prev - 1);
        if (lives - 1 <= 0) {
          alert("No lives left! Game Over.");
          resetGame();
        }
      }

      // Reset selections after a short delay
      setTimeout(() => {
        setFirstSelection(null);
        setSecondSelection(null);
      }, 500);
    }
  }, [firstSelection, secondSelection]);

  const resetGame = () => {
    const numbers = Array(10)
      .fill()
      .flatMap((_, i) => [i + 1, i + 1]);
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
    setBoard(shuffledNumbers);
    setScore(0);
    setLives(3);
    setTimer(30);
    setFirstSelection(null);
    setSecondSelection(null);
  };

  return (
    <div className="game-container">
      <div className="header">
        <div className="timer">Timer: {timer}</div>
        <div className="score">
          Score: {score}
          <div className="lives">
            <img src="https://via.placeholder.com/50" alt="tomato-icon" />
            {lives} Lives
          </div>
        </div>
      </div>
      <div className="board">
        {board.map((number, index) => (
          <div
            key={index}
            className={`tile ${
              index === firstSelection || index === secondSelection
                ? "selected"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {number !== null && number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberMatchGame;
