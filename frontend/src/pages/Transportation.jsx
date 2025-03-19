import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, TrafficLayer } from "@react-google-maps/api";
import Navbar from "../compoents/ui/Navbar";
import "./transport.css";

const Transport = () => {
  const [schedules, setSchedules] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      const mockData = [
        { id: 1, type: "Bus", route: "Bus 101", time: "10:30 AM", fare: "₹20", stops: "Stop A, Stop B, Stop C", status: "On Time" },
        { id: 2, type: "Bus", route: "Bus 102", time: "11:00 AM", fare: "₹25", stops: "Stop A, Stop D, Stop E", status: "Delayed" },
        { id: 3, type: "Bus", route: "Bus 103", time: "12:15 PM", fare: "₹30", stops: "Stop F, Stop G, Stop H", status: "On Time" },
        { id: 4, type: "Bus", route: "Bus 104", time: "1:00 PM", fare: "₹35", stops: "Stop I, Stop J, Stop K", status: "On Time" },
        { id: 5, type: "Bus", route: "Bus 105", time: "2:30 PM", fare: "₹40", stops: "Stop L, Stop M, Stop N", status: "Delayed" },
        { id: 6, type: "Bus", route: "Bus 106", time: "3:45 PM", fare: "₹45", stops: "Stop O, Stop P, Stop Q", status: "On Time" },
        { id: 7, type: "Bus", route: "Bus 107", time: "5:00 PM", fare: "₹50", stops: "Stop R, Stop S, Stop T", status: "On Time" },
        { id: 8, type: "Metro", route: "Metro Blue Line", time: "10:45 AM", fare: "₹40", stops: "Station 1, Station 2, Station 3", status: "Delayed" },
        { id: 9, type: "Metro", route: "Metro Red Line", time: "11:30 AM", fare: "₹50", stops: "Station A, Station B, Station C", status: "On Time" },
        { id: 10, type: "Metro", route: "Metro Green Line", time: "12:15 PM", fare: "₹55", stops: "Station D, Station E, Station F", status: "On Time" },
        { id: 11, type: "Metro", route: "Metro Yellow Line", time: "1:45 PM", fare: "₹60", stops: "Station G, Station H, Station I", status: "Delayed" },
        { id: 12, type: "Metro", route: "Metro Purple Line", time: "3:00 PM", fare: "₹65", stops: "Station J, Station K, Station L", status: "On Time" },
        { id: 13, type: "Metro", route: "Metro Orange Line", time: "4:30 PM", fare: "₹70", stops: "Station M, Station N, Station O", status: "On Time" },
        { id: 14, type: "Metro", route: "Metro Pink Line", time: "6:00 PM", fare: "₹75", stops: "Station P, Station Q, Station R", status: "Delayed" },
        { id: 15, type: "Train", route: "Train Express", time: "11:00 AM", fare: "₹100", stops: "Junction 1, Junction 2, Junction 3", status: "On Time" },
        { id: 16, type: "Train", route: "Superfast Express", time: "1:00 PM", fare: "₹120", stops: "Station X, Station Y, Station Z", status: "Delayed" },
        { id: 17, type: "Train", route: "Rajdhani Express", time: "2:30 PM", fare: "₹150", stops: "Stop A, Stop B, Stop C", status: "On Time" },
        { id: 18, type: "Train", route: "Shatabdi Express", time: "4:00 PM", fare: "₹180", stops: "Stop D, Stop E, Stop F", status: "Delayed" },
        { id: 19, type: "Train", route: "Jan Shatabdi", time: "5:15 PM", fare: "₹200", stops: "Stop G, Stop H, Stop I", status: "On Time" },
        { id: 20, type: "Train", route: "Intercity Express", time: "6:30 PM", fare: "₹220", stops: "Stop J, Stop K, Stop L", status: "On Time" },
        { id: 21, type: "Train", route: "Duronto Express", time: "8:00 PM", fare: "₹250", stops: "Stop M, Stop N, Stop O", status: "Delayed" },
      ];
      setSchedules(mockData);
    };

    fetchSchedules();
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const center = { lat: 10.89, lng: 76.9088 };

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
      <h2>Real-Time Public Transport Schedule</h2>

      <input
        type="text"
        placeholder="Search Bus, Metro, Train, Time, Route..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
        style={{ color: "black" }}
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
            <tr key={schedule.id}>
              <td>{schedule.type}</td>
              <td>{schedule.route}</td>
              <td>{schedule.time}</td>
              <td>{schedule.fare}</td>
              <td>{schedule.stops}</td>
              <td className={schedule.status === "Delayed" ? "delayed" : "on-time"}>
                {schedule.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Live Traffic Layer */}
      <h2>Live Traffic</h2>
      <section className="map-section" style={{ width: "100%", height: "90vh" }}>
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
