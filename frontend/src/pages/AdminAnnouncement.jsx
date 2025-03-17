import React, { useState } from "react";
import "./Announcement.css"; // Using the same styles as Announcement.jsx

const AdminAnnouncement = () => {
  // Initial Announcements (Same as Announcement.jsx)
  const [announcements, setAnnouncements] = useState([
    {
      title: "Water Supply Maintenance",
      description:
        "Scheduled maintenance on 25th Feb from 10 AM to 4 PM. Please store water accordingly.",
      date: "Feb 25, 2024",
      type: "alert",
    },
    {
      title: "Traffic Diversion",
      description:
        "Temporary diversion due to metro construction near main junction. Expected duration: 2 weeks.",
      date: "Feb 23, 2024",
      type: "info",
    },
    {
      title: "Public Meeting",
      description:
        "Join us for a public meeting to discuss and provide feedback on community facilities improvements.",
      date: "Mar 1, 2024",
      type: "success",
    },
  ]);

  // Function to add a new announcement
  const addAnnouncement = () => {
    const title = prompt("Enter Announcement Title:");
    const description = prompt("Enter Description:");
    const date = prompt("Enter Date (e.g., Mar 10, 2024):");
    const color = prompt(
      "Enter Background Color (alert=red, info=blue, success=green):"
    );

    // Validate Inputs
    if (!title || !description || !date) {
      alert("All fields are required!");
      return;
    }

    // Determine Type Based on Color
    let type;
    if (color.toLowerCase() === "red") type = "alert";
    else if (color.toLowerCase() === "blue") type = "info";
    else if (color.toLowerCase() === "green") type = "success";
    else {
      alert("Invalid color! Choose red, blue, or green.");
      return;
    }

    // Add new announcement to the list
    setAnnouncements([...announcements, { title, description, date, type }]);
  };

  return (
    <div className="announcement-container">
      <h1 className="announcement-title">🔔 Admin Announcements</h1>
      <p className="announcement-subtitle">
        Manage announcements and keep your city informed.
      </p>

      <div className="announcement-grid">
        {announcements.map((item, index) => (
          <div key={index} className={`announcement-card ${item.type}`}>
            <h3 className="announcement-card-title">{item.title}</h3>
            <p className="announcement-card-description">{item.description}</p>
            <p className="announcement-card-date">📅 {item.date}</p>
          </div>
        ))}
      </div>

      {/* Plus Button to Add Announcement */}
      <button className="plus-button" onClick={addAnnouncement}>
            <i className="fas fa-plus"></i>
    </button>

    </div>
  );
};

export default AdminAnnouncement;
