import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
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
            <li><Link to="/cityServices">City Services</Link></li>
            <li><Link to="/resourceManagement">Resource Management</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="content">
          <h1 className="title">Welcome to Smart City Management</h1>
          <Routes>
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/cityServices" element={<CityServices />} />
            <Route path="/resourceManagement" element={<ResourceManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
