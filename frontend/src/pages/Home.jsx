import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="home-container">
      <video autoplay muted loop plays-inline class="background-video">
        <source src="background.mp4" type="video/mp4" />
      </video>

      {/* Title */}
      <h1 className="title">Welcome to Smart City Management</h1>
    </div>
  );
}

export default Home;
