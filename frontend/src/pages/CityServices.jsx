import React, { useState, useEffect } from "react";
import Navbar from "../compoents/ui/Navbar";
import "./CityServices.css";

const UserGrievanceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [message, setMessage] = useState("");
  const [grievances, setGrievances] = useState([]);

  // Retrieve the userId from localStorage (or from auth context if applicable)
  const userId = localStorage.getItem("userId"); // Ensure the userId is saved in localStorage when the user logs in

  // Fetch grievances for the logged-in user
  const fetchGrievances = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/grievances/user/${userId}`
      );
      const data = await response.json();
      if (response.ok) {
        setGrievances(data);
      } else {
        setMessage("Error fetching grievances. Please try again.");
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    }
  };

  // Fetch grievances when the component mounts
  useEffect(() => {
    if (userId) {
      fetchGrievances();
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if userId is available (this ensures the user is logged in)
    if (!userId) {
      setMessage("You must be logged in to submit a grievance.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/grievances/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title, description, severity }),
      });
      const data = await response.json();

      if (response.status === 201) {
        setMessage("Grievance submitted successfully!");
        setTitle("");
        setDescription("");
        setSeverity("Low");
        fetchGrievances(); // Refresh the list of grievances
      } else {
        setMessage(data.message || "Error submitting grievance.");
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="user-grievance-form">
      <Navbar></Navbar>
      <h1>Report a Grievance</h1>
      <div className="grievance-description">
        <p>
          Welcome to the Grievance Reporting System! This platform allows you to
          report issues or concerns related to city services, infrastructure, or
          any other matters that need attention. By submitting a grievance, you
          help us identify and resolve problems faster, ensuring a better
          quality of life for everyone in the community.
        </p>
        <p>
          Your feedback is valuable to us. Please provide as much detail as
          possible so that we can address your concern effectively. Thank you
          for helping us make our city a better place!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grievance-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          required
        />
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="form-select"
          required
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="form-button">
          Submit Grievance
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}

      {/* Display Submitted Grievances */}
      <div className="grievance-list">
        <h2>Your Submitted Grievances</h2>
        {grievances.length > 0 ? (
          <ul>
            {grievances.map((grievance) => (
              <li key={grievance._id} className="grievance-item">
                <div className="grievance-header">
                  <h3>{grievance.title}</h3>
                  <span className={`status ${grievance.status.toLowerCase()}`}>
                    {grievance.status}
                  </span>
                </div>
                <p>{grievance.description}</p>
                <div className="grievance-footer">
                  <span>Severity: {grievance.severity}</span>
                  <span>
                    Submitted on:{" "}
                    {new Date(grievance.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No grievances submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserGrievanceForm;
