"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserData {
  name: string;
  referralCode: string;
  totalDonations: number;
  level: string;
  nextReward: string;
  progress: number;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    fetchUserData();
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

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (userData) {
      navigator.clipboard.writeText(userData.referralCode);
      alert("Referral code copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
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
          <h1>Welcome back, {userData?.name}! 👋</h1>
          <p>{"Here's your fundraising progress"}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Raised</h3>
              <p className="stat-value">
                ${userData?.totalDonations.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Current Level</h3>
              <p className="stat-value">{userData?.level}</p>
            </div>
          </div>

          <div className="stat-card tertiary">
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <h3>Referral Code</h3>
              <p className="stat-value">{userData?.referralCode}</p>
              <button onClick={copyReferralCode} className="copy-btn">
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="progress-card">
            <h3>Progress to Next Reward</h3>
            <div className="progress-info">
              <span>Next: {userData?.nextReward}</span>
              <span>{userData?.progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${userData?.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="rewards-card">
            <h3>🏆 Rewards & Unlockables</h3>
            <div className="rewards-list">
              <div className="reward-item unlocked">
                <div className="reward-icon">🥉</div>
                <div className="reward-content">
                  <h4>Bronze Fundraiser</h4>
                  <p>Raised $500+ - Unlocked!</p>
                </div>
              </div>

              <div className="reward-item unlocked">
                <div className="reward-icon">🥈</div>
                <div className="reward-content">
                  <h4>Silver Fundraiser</h4>
                  <p>Raised $1,000+ - Unlocked!</p>
                </div>
              </div>

              <div className="reward-item locked">
                <div className="reward-icon">🥇</div>
                <div className="reward-content">
                  <h4>Gold Fundraiser</h4>
                  <p>Raise $2,500+ to unlock</p>
                </div>
              </div>

              <div className="reward-item locked">
                <div className="reward-icon">💎</div>
                <div className="reward-content">
                  <h4>Diamond Elite</h4>
                  <p>Raise $5,000+ to unlock</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-cards">
          <div className="action-card">
            <h3>Share Your Code</h3>
            <p>
              Invite friends and earn bonus points for every successful
              referral!
            </p>
            <button className="action-btn primary">Share Now</button>
          </div>

          <div className="action-card">
            <h3>View Analytics</h3>
            <p>Track your fundraising performance and see detailed insights.</p>
            <button className="action-btn secondary">View Stats</button>
          </div>
        </div>
      </main>
    </div>
  );
}
