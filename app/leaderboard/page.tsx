"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface LeaderboardEntry {
  rank: number;
  name: string;
  amount: number;
  level: string;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Close mobile menu when window is resized to >770px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 770 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
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
        <div className="nav-left">
          <div className="nav-brand">
            <h2>InternPortal</h2>
          </div>
          {/* Hamburger Icon */}
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </div>
        </div>

        <div className="nav-links">
          <Link
            href="/dashboard"
            className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            href="/leaderboard"
            className={`nav-link ${isActive("/leaderboard") ? "active" : ""}`}
          >
            Leaderboard
          </Link>
          <Link
            href="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
          >
            Logout
          </Link>
        </div>

        <div className={`mobile-menu-dropdown ${isOpen ? "show" : ""}`}>
          <Link
            href="/dashboard"
            className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/leaderboard"
            className={`menu-item ${isActive("/leaderboard") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Leaderboard
          </Link>
          <Link
            href="/"
            className={`menu-item ${isActive("/") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
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
                    ${entry.amount.toLocaleString()}
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
}
