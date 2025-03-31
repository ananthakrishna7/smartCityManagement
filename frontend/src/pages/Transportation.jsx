import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, TrafficLayer } from "@react-google-maps/api";
import Navbar from "../compoents/ui/Navbar";
import "./transport.css";

const Transport = () => {
  const [schedules, setSchedules] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch transport data from backend
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch("http://localhost:9000/transport");
        const data = await res.json();
        setSchedules(data);
      } catch (error) {
        console.error("Failed to fetch transport data", error);
      }
    };

    fetchSchedules();
  }, []);

  // Google Maps setup
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const center = { lat: 10.89, lng: 76.9088 };

  // Search filtering
  const filteredSchedules = schedules.filter((schedule) =>
    Object.values(schedule).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="transport-container">
      <Navbar />
      <h2 className="transport-title">
        🚍 Real-Time Public Transport Schedule
      </h2>

      <input
        type="text"
        placeholder="Search Bus, Metro, Train, Time, Route..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Route</th>
            <th>Time</th>
            <th>Fare</th>
            <th>Stops</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.type}</td>
              <td>{schedule.route}</td>
              <td>{schedule.time}</td>
              <td>{schedule.fare}</td>
              <td>{schedule.stops}</td>
              <td
                className={
                  schedule.status === "Delayed"
                    ? "delayed"
                    : schedule.status === "Cancelled"
                    ? "cancelled"
                    : "on-time"
                }
              >
                {schedule.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="transport-title">🗺️ Live Traffic</h2>
      <section
        className="map-section"
        style={{ width: "100%", height: "90vh" }}
      >
        {isLoaded ? (
          <GoogleMap
            center={center}
            zoom={13}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            <TrafficLayer />
          </GoogleMap>
        ) : (
          <p>Loading traffic map...</p>
        )}
      </section>
      <div className="emptyy"></div>
    </div>
  );
};

export default Transport;
