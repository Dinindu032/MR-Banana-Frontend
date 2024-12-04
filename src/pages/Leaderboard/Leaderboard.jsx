import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import "./Leaderboard.css";

const Leaderboard = ({ players = [] }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    await axios
      .get("http://localhost:3000/api/leaderboard")
      .then((response) => {
        if (response.data.status) {
          setLeaderboard(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const sortedLeaderboard = useMemo(
    () => leaderboard?.sort((a, b) => b.score - a.score) ?? [],
    [leaderboard]
  );

  return (
    <div className="leaderboard-container1">
      <h1 className="leaderboard-title">Leaderboard</h1>
      {leaderboard.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((player, index) => (
              <tr key={player.id || index} className={`rank-${index + 1}`}>
                <td>{index + 1}</td>
                <td>{player.username}</td>
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
