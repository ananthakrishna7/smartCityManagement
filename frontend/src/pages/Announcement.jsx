import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"
import "./Announcement.css";

const announcementsData = [
  {
    id: 1,
    title: "Water Supply Maintenance",
    description: "Scheduled maintenance on 25th Feb from 10 AM to 4 PM.",
  },
  {
    id: 2,
    title: "Traffic Diversion",
    description: "Diversion due to metro construction near main junction.",
  },
  {
    id: 3,
    title: "Public Meeting",
    description: "Public meeting for feedback on community facilities.",
  },
  {
    id: 4,
    title: "Park Renovation",
    description: "Renovation work in Central Park starts next week.",
  },
  {
    id: 5,
    title: "Waste Collection Update",
    description: "New waste collection schedule for weekends.",
  },
  {
    id: 6,
    title: "Water Supply Alert",
    description: "Water supply issue resolved in sector 3.",
  },
];

const Announcements = () => {
  return (
    <div className="container-fluid p-5 bg-light">
      <h1 className="text-center mb-5">City Announcements</h1>
      <div className="row">
        {announcementsData.map((announcement) => (
          <div key={announcement.id} className="col-md-4 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  {announcement.title}
                </h5>
                <p className="card-text">{announcement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
