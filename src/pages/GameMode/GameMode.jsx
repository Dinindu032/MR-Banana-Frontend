// import React from "react";
// import "./GameMode.css";
// import { Link } from "react-router-dom";

// // const levels = [
// //   { name: "Easy", time: "20s", color: "#5e3bc3", banana: bananaEasy },
// //   { name: "Medium", time: "15s", color: "#4a5246", banana: bananaMedium },
// //   { name: "Hard", time: "10s", color: "#8e334f", banana: bananaHard },
// //   { name: "Expert", time: "5s", color: "#a20d18", banana: bananaExpert }
// // ];

// const GameMode = () => {
//   return (
//     <div className="level-grid">
//       <div className="game-mode-container">
//         <h1 className="game-title">EASY MODE</h1>
//         <h1 className="game-title">50 Seconds</h1>
//         <Link to="/game-page" className="start-button">
//           PLAY
//         </Link>
//         <div className="game-mode-container1">
//           <h1 className="game-title">Medium MODE</h1>
//           <h1 className="game-title">45 Seconds</h1>
//           <Link to="/game-page" className="start-button">
//             PLAY
//           </Link>
//           <div className="game-mode-container2">
//             <h1 className="game-title">Difficult MODE</h1>
//             <h1 className="game-title">30 Seconds</h1>
//             <Link to="/game-page" className="start-button">
//               PLAY
//             </Link>
//             <div className="game-mode-container3">
//               <h1 className="game-title">Hard MODE</h1>
//               <h1 className="game-title">10 Seconds</h1>
//               <Link to="/game-page" className="start-button">
//                 PLAY
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameMode;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameMode.css";

const GameMode = () => {
  const navigate = useNavigate();

  const setMode = (mode) => {
    localStorage.setItem("mode", mode);
    navigate("/game-page");
  };

  return (
    <div className="level-grid1">
      {/* Easy Mode */}
      <div className="game-mode-container easy-mode">
        <h1 className="game-title">EASY MODE</h1>
        <h2 className="game-time">50 Seconds</h2>
        <div
          to="/game-page"
          className="start-button"
          onClick={() => setMode(50)}
        >
          PLAY
        </div>
      </div>

      {/* Medium Mode */}
      <div className="game-mode-container medium-mode">
        <h1 className="game-title">MEDIUM MODE</h1>
        <h2 className="game-time">45 Seconds</h2>
        <div
          to="/game-page"
          className="start-button"
          onClick={() => setMode(45)}
        >
          PLAY
        </div>
      </div>

      {/* Difficult Mode */}
      <div className="game-mode-container difficult-mode">
        <h1 className="game-title">DIFFICULT MODE</h1>
        <h2 className="game-time">30 Seconds</h2>
        <div
          to="/game-page"
          className="start-button"
          onClick={() => setMode(30)}
        >
          PLAY
        </div>
      </div>

      {/* Hard Mode */}
      <div className="game-mode-container hard-mode">
        <h1 className="game-title">HARD MODE</h1>
        <h2 className="game-time">10 Seconds</h2>
        <div
          to="/game-page"
          className="start-button"
          onClick={() => setMode(10)}
        >
          PLAY
        </div>
      </div>
    </div>
  );
};

export default GameMode;
