import React, { useState } from "react";
import "./AdminTransportation.css";

const AdminTransportation = () => {
  const [transportationData, setTransportationData] = useState([
    { id: 1, route: "Bus 101 - Downtown", status: "On Time" },
    { id: 2, route: "Train 5 - Central Line", status: "Delayed 10 min" },
    { id: 3, route: "Metro Green - City Square", status: "On Time" },
  ]);

  // Function to Modify Transportation Data
  const modifyStatus = (id) => {
    const newStatus = prompt("Enter new status (e.g., Delayed 15 min, On Time):");
    if (newStatus) {
      setTransportationData(
        transportationData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    }
  };

  return (
    <div className="transportation-container">
      <h1 className="transportation-title">🚍 Admin Transportation</h1>
      <p className="transportation-subtitle">
        Manage transportation schedules and update delays.
      </p>

      <table className="transportation-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Status</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {transportationData.map((item) => (
            <tr key={item.id}>
              <td>{item.route}</td>
              <td>{item.status}</td>
              <td>
                <button className="modify-btn" onClick={() => modifyStatus(item.id)}>
                  Modify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransportation;
