import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/Home";
import Transportation from "./pages/Transportation";
import Forum from "./pages/Forum";
import CityServices from "./pages/CityServices";
import ResourceManagement from "./pages/ResourceManagement";
import Announcements from "./pages/Announcement";
import AdminAnnouncement from "./pages/AdminAnnouncement"; // Import Admin Page
import AdminHome from "./pages/AdminHome";
import AdminTransportation from "./pages/AdminTransportation";
import AdminGrievanceDashboard from "./pages/AdminGrievanceDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Detect if scrolled down
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`top-nav ${
        scrolled || location.pathname !== "/" ? "scrolled" : ""
      }`}
    >
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/transportation">Transportation</Link>
        </li>
        <li>
          <Link to="/forum">Community Forum</Link>
        </li>
        <li>
          <Link to="/city-services">City Services</Link>
        </li>
        <li>
          <Link to="/resource-management">Resource Management</Link>
        </li>
        <li>
          <Link to="/announcements">Announcements</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  const location = useLocation();

  // Check if the current route is the login page or admin page
  const isLoginPage = location.pathname === "/login";
  const isAdminPage = location.pathname === "/admin";

  // Check if the user is logged in (based on localStorage)
  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <div className="container">
      {/* Render Navbar only if not on the login page and user is logged in */}
      {!isLoginPage && !isAdminPage && isLoggedIn && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/city-services" element={<CityServices />} />
          <Route path="/resource-management" element={<ResourceManagement />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/adminannouncement" element={<AdminAnnouncement />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route
            path="/admintransportation"
            element={<AdminTransportation />}
          />
          <Route path="/admingrievance" element={<AdminGrievanceDashboard />} />
          {/* Redirect to login by default */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
