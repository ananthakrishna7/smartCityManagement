// Announcement.jsx
import React from "react";
import "./Announcement.css";

const announcements = [
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
  {
    title: "Park Renovation",
    description:
      "Central Park renovation begins next week. New features include fitness zones and children's play area.",
    date: "Feb 28, 2024",
    type: "info",
  },
  {
    title: "Waste Collection Update",
    description:
      "New weekend waste collection schedule: Dry waste - Saturday, Wet waste - Sunday.",
    date: "Feb 22, 2024",
    type: "success",
  },
  {
    title: "Water Supply Alert",
    description:
      "Water supply issue in sector 3 has been resolved. Normal supply resumed.",
    date: "Feb 21, 2024",
    type: "alert",
  },
];

const Announcement = () => {
  return (
    <div className="announcement-container">
      <h1 className="announcement-title">🔔 City Announcements</h1>
      <p className="announcement-subtitle">
        Stay informed about important updates and announcements from your city
        administration.
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
    </div>
  );
};

export default Announcement;
