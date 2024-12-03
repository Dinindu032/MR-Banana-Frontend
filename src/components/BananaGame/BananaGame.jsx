import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./BananaGame.css";
import axios from "axios";

const BananaGame = () => {
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for visibility of popup
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false); // State to track if the answer is correct

  const navigate = useNavigate(); // Initialize navigate function

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/question");
      const { question, solution } = response.data;

      setQuestion(question);
      setSolution(solution);
      console.log("Solution:", solution);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(userAnswer) === solution) {
      setPopupMessage("The entered answer is correct!"); // Set correct message
      setIsCorrectAnswer(true); // Mark answer as correct
      setIsPopupVisible(true); // Show popup
    } else {
      setPopupMessage("The entered answer is wrong! Try again."); // Set incorrect message
      setIsCorrectAnswer(false); // Mark answer as incorrect
      setIsPopupVisible(true); // Show popup
    }
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
    if (isCorrectAnswer) {
      navigate("/tictactoe"); // Redirect to TicTacToe page if the answer is correct
    }
  };

  return (
    <div className="banana-game-container">
      <img src={question} alt="question" className="banana-image" />
      <input
        type="text"
        placeholder="Enter your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="answer-placeholder"
      />
      <button onClick={handleSubmit} className="next-button">
        Submit
      </button>

      {/* Popup for correct or incorrect answer */}
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-message">
            <h2>{popupMessage}</h2>
            <button onClick={handlePopupClose} className="popup-close-button">
              {isCorrectAnswer ? "Play TicTacToe" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BananaGame;
