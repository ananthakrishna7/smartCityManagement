import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Bootstrap Modal
import "./Announcement.css";

const AdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([
    {
      title: "Water Supply Maintenance",
      description:
        "Scheduled maintenance on 25th Feb from 10 AM to 4 PM. Please store water accordingly.",
      date: "Feb 25, 2024",
      type: "alert1",
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

  // 🌟 State for Modal Form
  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
    type: "info",
  });

  // 🎨 Modal Control
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // ✏️ Update Form Inputs
  const handleChange = (e) => {
    setNewAnnouncement({ ...newAnnouncement, [e.target.name]: e.target.value });
  };

  // 🚀 Add Announcement
  const addAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description || !newAnnouncement.date) {
      alert("Please fill in all fields!");
      return;
    }

    // 🌟 Ensure correct type (alert, info, success)
    let type = newAnnouncement.type?.toLowerCase();
    if (!["alert1", "info", "success"].includes(type)) {
      console.warn("Invalid type received, defaulting to 'info'");
      type = "info"; // Default to 'info' if type is incorrect
    }

    console.log("✅ New Announcement:", { ...newAnnouncement, type }); // Debugging log

    // ✅ Add new announcement & close modal
    setAnnouncements([...announcements, { ...newAnnouncement, type }]);
    setShowModal(false);
    setNewAnnouncement({ title: "", description: "", date: "", type: "info" }); // Reset form
  };

  return (
    <div className="announcement-container">
      <h1 className="announcement-title">🔔 Admin Announcements</h1>
      <p className="announcement-subtitle">Manage announcements and keep your city informed.</p>

      {/* Announcement Grid */}
      <div className="announcement-grid">
        {announcements.map((item, index) => (
          <div key={index} className={`announcement-card ${item.type}`}>
            <h3 className="announcement-card-title">{item.title}</h3>
            <p className="announcement-card-description">{item.description}</p>
            <p className="announcement-card-date">📅 {item.date}</p>
          </div>
        ))}
      </div>

      {/* ➕ Add Announcement Button */}
      <button className="plus-button" onClick={handleShow}>
        ➕
      </button>

      {/* 🎨 Fancy Modal Popup */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>📢 Add Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter announcement title"
                value={newAnnouncement.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={newAnnouncement.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Date */}
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                placeholder="E.g., Mar 10, 2024"
                value={newAnnouncement.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Type (Color) */}
            <Form.Group className="mb-3">
              <Form.Label>Announcement Type</Form.Label>
              <Form.Select name="type" value={newAnnouncement.type} onChange={handleChange}>
                <option value="alert1">🚨 Alert (Red)</option>
                <option value="info">ℹ️ Info (Blue)</option>
                <option value="success">✅ Success (Green)</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ❌ Cancel
          </Button>
          <Button variant="primary" onClick={addAnnouncement}>
            ✅ Add Announcement
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAnnouncement;
