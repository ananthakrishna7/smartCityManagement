import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Transportation from "./pages/Transportation";
import Forum from "./pages/Forum";
import CityServices from "./pages/CityServices";
import ResourceManagement from "./pages/ResourceManagement";

function App() {
  return (
    <Router>
      <div className="container">
        {/* Navigation Bar */}
        <nav className="top-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/transportation">Transportation</Link></li>
            <li><Link to="/forum">Community Forum</Link></li>
            <li><Link to="/city-services">City Services</Link></li>
            <li><Link to="/resource-management">Resource Management</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/city-services" element={<CityServices />} />
            <Route path="/resource-management" element={<ResourceManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
