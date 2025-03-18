import React, { useEffect, useState } from "react";
import "./AdminGrievanceDashboard.css"; // Import the CSS file

const AdminGrievanceDashboard = () => {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    const fetchGrievances = async () => {
      const response = await fetch("http://localhost:9000/grievances");
      const data = await response.json();
      setGrievances(data);
    };

    fetchGrievances();
  }, []);

  const handleResolve = async (id) => {
    const response = await fetch(
      `http://localhost:9000/grievances/resolve/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolved" }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      alert("Grievance resolved");
      setGrievances(
        grievances.map((g) => (g._id === id ? data.updatedGrievance : g))
      );
    } else {
      alert("Failed to resolve grievance");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Grievance Dashboard</h1>
      <div className="table-container">
        <table className="grievance-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance) => (
              <tr key={grievance._id}>
                <td>{grievance.title}</td>
                <td>{grievance.description}</td>
                <td>
                  <span
                    className={`severity-badge ${grievance.severity.toLowerCase()}`}
                  >
                    {grievance.severity}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${grievance.status.toLowerCase()}`}
                  >
                    {grievance.status}
                  </span>
                </td>
                <td>
                  {grievance.status !== "Resolved" && (
                    <button
                      className="resolve-button"
                      onClick={() => handleResolve(grievance._id)}
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGrievanceDashboard;
