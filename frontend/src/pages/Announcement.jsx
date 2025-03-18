import React, { useEffect, useState } from "react";
import "./Announcement.css";
import Navbar from "../compoents/ui/Navbar";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9000/announcements")
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading announcements...</p>;

  return (
    <div className="announcement-container">
      <Navbar />
      <h1 className="announcement-title">🔔 City Announcements</h1>
      <p className="announcement-subtitle">
        Stay informed about important updates and announcements from your city
        administration.
      </p>

      <div className="announcement-grid">
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          announcements.map((item, index) => (
            <div key={index} className={`announcement-card ${item.type}`}>
              <h3 className="announcement-card-title">{item.title}</h3>
              <p className="announcement-card-description">
                {item.description}
              </p>
              <p className="announcement-card-date">
                📅 {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcement;
