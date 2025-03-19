import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Bootstrap Modal
import "./Announcement.css";

const AdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    type: "info",
  });

  // ✅ Fetch Announcements from Backend
  useEffect(() => {
    fetch("http://localhost:9000/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error("Error fetching announcements:", error));
  }, []);

  // 🎨 Modal Control
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // ✏️ Update Form Inputs
  const handleChange = (e) => {
    setNewAnnouncement({ ...newAnnouncement, [e.target.name]: e.target.value });
  };

  // ✅ Add Announcement with Confirmation
  const addAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description) {
      alert("Please fill in all fields!");
      return;
    }

    // Confirm before adding the announcement
    const isConfirmed = window.confirm(
      "Are you sure you want to add this announcement?"
    );

    if (isConfirmed) {
      fetch("http://localhost:9000/announcements/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnnouncement),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Announcement added successfully!");
          setAnnouncements([...announcements, data.newAnnouncement]); // Update UI
          setShowModal(false);
          setNewAnnouncement({
            title: "",
            description: "",
            type: "info",
          });
        })
        .catch((error) => console.error("Error adding announcement:", error));
    }
  };

  // ❌ Delete Announcement with Confirmation
  const deleteAnnouncement = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (isConfirmed) {
      fetch(`http://localhost:9000/announcements/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          alert("Announcement deleted successfully!");
          setAnnouncements(announcements.filter((item) => item._id !== id));
        })
        .catch((error) => console.error("Error deleting announcement:", error));
    }
  };

  return (
    <div className="announcement-container">
      <h1 className="announcement-title">🔔 Admin Announcements</h1>
      <p className="announcement-subtitle">
        Manage announcements and keep your city informed.
      </p>

      {/* Announcement Grid */}
      <div className="announcement-grid">
        {announcements.map((item) => (
          <div key={item._id} className={`announcement-card ${item.type}`}>
            <h3 className="announcement-card-title">{item.title}</h3>
            <p className="announcement-card-description">{item.description}</p>
            <p className="announcement-card-date">📅 {item.date}</p>
            <button
              className="delete-button"
              onClick={() => deleteAnnouncement(item._id)}
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>

      {/* ➕ Add Announcement Button */}
      <button className="plus-button" onClick={handleShow}>
        ➕
      </button>

      {/* 🎨 Modal Popup */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>📢 Add Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newAnnouncement.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newAnnouncement.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={newAnnouncement.type}
                onChange={handleChange}
              >
                <option value="alert">🚨 Alert</option>
                <option value="info">ℹ️ Info</option>
                <option value="success">✅ Success</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ❌ Cancel
          </Button>
          <Button variant="primary" onClick={addAnnouncement}>
            ✅ Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAnnouncement;
