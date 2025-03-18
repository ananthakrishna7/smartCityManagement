import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="admin-home-container">
      <h1 className="admin-home-title">🏛️ Admin Dashboard</h1>
      <p className="admin-home-subtitle">
        Welcome to the Admin Panel. Here you can manage the city's important
        information, announcements, and services.
      </p>

      <div className="admin-actions">
        <button
          className="admin-btn"
          onClick={() => navigate("/adminannouncement")}
        >
          📢 Manage Announcements
        </button>
        <button
          className="admin-btn"
          onClick={() => navigate("/admingrievance")}
        >
          🏙️ Manage City Services
        </button>
        <button
          className="admin-btn"
          onClick={() => navigate("/adminresource-management")}
        >
          📊 Manage Resources
        </button>
        <button
          className="admin-btn"
          onClick={() => navigate("/admintransportation")}
        >
          🚍 Manage Transportation
        </button>
      </div>

      {/* 🔒 Logout Button */}
      <button className="admin-btn logout-btn" onClick={handleLogout}>
        🔓 Log Out
      </button>
    </div>
  );
};

export default AdminHome;
