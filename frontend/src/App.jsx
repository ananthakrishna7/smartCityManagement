import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Transportation from "./pages/Transportation";
import Forum from "./pages/Forum";
import CityServices from "./pages/CityServices";
import ResourceManagement from "./pages/ResourceManagement";
import Announcements from "./pages/Announcement";

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
    <nav className={`top-nav ${scrolled || location.pathname !== "/" ? "scrolled" : ""}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
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
  return (
    <Router>
      <div className="container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/city-services" element={<CityServices />} />
            <Route path="/resource-management" element={<ResourceManagement />} />
            <Route path="/announcements" element={<Announcements />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
