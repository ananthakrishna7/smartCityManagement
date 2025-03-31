import React, { useEffect, useState } from "react";
import "./AdminTransportation.css";

const AdminTransportation = () => {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    type: "Bus",
    route: "",
    time: "",
    fare: "",
    stops: "",
    status: "On Time",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await fetch("http://localhost:9000/transport");
      const data = await res.json();
      setRoutes(data);
    } catch (err) {
      console.error("Error fetching transportation data:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:9000/transport/update/${editId}`
      : "http://localhost:9000/transport/add";

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchRoutes();
        setForm({
          type: "Bus",
          route: "",
          time: "",
          fare: "",
          stops: "",
          status: "On Time",
        });
        setIsEditing(false);
        setEditId(null);
      } else {
        alert(data.message || "Failed to submit");
      }
    } catch (err) {
      console.error("Error submitting data:", err);
    }
  };

  const handleEdit = (route) => {
    setForm(route);
    setIsEditing(true);
    setEditId(route._id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this route?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:9000/transport/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchRoutes();
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting route:", err);
    }
  };

  return (
    <div className="admin-transport-container">
      <div className="admin-header">
        <h1>🚦 Admin Transportation Management</h1>
        <p>Manage public transport schedules, fare info, and live status</p>
      </div>

      <div className="admin-content">
        {/* Form Section */}
        <div className="form-section">
          <h2>{isEditing ? "Edit Route" : "Add New Route"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Bus">Bus</option>
                <option value="Metro">Metro</option>
                <option value="Train">Train</option>
              </select>
            </div>

            <div className="form-group">
              <label>Route</label>
              <input
                type="text"
                name="route"
                className="form-control"
                placeholder="Route Name"
                value={form.route}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Time</label>
                <input
                  type="text"
                  name="time"
                  className="form-control"
                  placeholder="e.g., 10:30 AM"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fare (₹)</label>
                <input
                  type="text"
                  name="fare"
                  className="form-control"
                  placeholder="Fare"
                  value={form.fare}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Stops</label>
              <input
                type="text"
                name="stops"
                className="form-control"
                placeholder="Stop A, Stop B, Stop C"
                value={form.stops}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="On Time">On Time</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {isEditing ? "Update Route" : "Add Route"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setForm({
                      type: "Bus",
                      route: "",
                      time: "",
                      fare: "",
                      stops: "",
                      status: "On Time",
                    });
                    setIsEditing(false);
                    setEditId(null);
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="routes-section">
          <div className="section-header">
            <h2>📋 All Routes</h2>
            <div className="total-routes">{routes.length} total</div>
          </div>
          <div className="table-responsive">
            <table className="routes-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Route</th>
                  <th>Time</th>
                  <th>Fare</th>
                  <th>Stops</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r._id}>
                    <td>
                      <span className={`route-type ${r.type.toLowerCase()}`}>
                        {r.type}
                      </span>
                    </td>
                    <td>{r.route}</td>
                    <td>{r.time}</td>
                    <td>{r.fare}</td>
                    <td>{r.stops}</td>
                    <td>
                      <span className={`status ${r.status.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="btn-icon"
                        onClick={() => handleEdit(r)}
                      >
                        <span className="icon-edit"></span>
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => handleDelete(r._id)}
                      >
                        <span className="icon-delete"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {routes.length === 0 && (
              <div className="no-routes">No routes available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransportation;
