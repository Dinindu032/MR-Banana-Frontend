// import React, { useState } from "react";
// import Profiles from "./profiles";
// import { Leaderboard } from "./database";

// export default function Board() {
//   const [period, setPeriod] = useState(0);

//   const handleClick = (e) => {
//     setPeriod(e.target.dataset.id);
//   };

//   return (
//     <div className="board">
//       <h1 className="leaderboard">Leaderboard</h1>

//       <div className="duration">
//         <button onClick={handleClick} data-id="7">
//           7 Days
//         </button>
//         <button onClick={handleClick} data-id="30">
//           30 Days
//         </button>
//         <button onClick={handleClick} data-id="0">
//           All-Time
//         </button>
//       </div>

//       <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
//     </div>
//   );
// }

// function between(data, between) {
//   const today = new Date();
//   const previous = new Date(today);
//   previous.setDate(previous.getDate() - (between + 1));

//   let filter = data.filter((val) => {
//     let userDate = new Date(val.dt);
//     if (between == 0) return val;
//     return previous <= userDate && today >= userDate;
//   });

//   // sort with asending order
//   return filter.sort((a, b) => {
//     if (a.score === b.score) {
//       return b.score - a.score;
//     } else {
//       return b.score - a.score;
//     }
//   });
// }
import React from "react";
import "./Leaderboard.css";

const Leaderboard = ({ players = [] }) => {
  // Ensure players is always an array
  const sortedPlayers = players.length
    ? [...players].sort((a, b) => b.score - a.score)
    : [];

  return (
    <div className="leaderboard-container1">
      <h1 className="leaderboard-title">Leaderboard</h1>
      {sortedPlayers.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr key={player.id || index} className={`rank-${index + 1}`}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-players-message">No players available to display.</p>
      )}
    </div>
  );
};

export default Leaderboard;
