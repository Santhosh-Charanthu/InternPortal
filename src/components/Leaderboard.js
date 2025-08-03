"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockApiService } from "../services/mockApi";
import "../styles/Dashboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await mockApiService.getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>InternPortal</h2>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/leaderboard" className="nav-link active">
            Leaderboard
          </Link>
          <Link to="/" className="nav-link">
            Logout
          </Link>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h1>🏆 Fundraising Leaderboard</h1>
          <p>See how you stack up against other interns!</p>
        </div>

        <div className="leaderboard-container">
          <div className="leaderboard-header">
            <h3>Top Fundraisers</h3>
            <div className="leaderboard-stats">
              <span>Total Participants: {leaderboard.length}</span>
            </div>
          </div>

          <div className="leaderboard-list">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`leaderboard-item ${
                  entry.isCurrentUser ? "current-user" : ""
                } ${entry.rank <= 3 ? "top-three" : ""}`}
              >
                <div className="rank-section">
                  <span className="rank-icon">{getRankIcon(entry.rank)}</span>
                </div>

                <div className="user-info">
                  <h4>
                    {entry.name} {entry.isCurrentUser && "(You)"}
                  </h4>
                  <span className="user-level">{entry.level}</span>
                </div>

                <div className="amount-section">
                  <span className="amount">
                    {entry.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="leaderboard-footer">
            <p>
              Rankings update every hour. Keep fundraising to climb higher! 🚀
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
