import React from "react";
import videovg from "../assets/background.mp4";
import amritaimage from "../assets/amrita.png";

function Home() {
  return (
    <div>
      {/* Video Section */}
      <section className="vb">
        <div className="overlay"></div>
        <video src={videovg} autoPlay loop muted />
        <h1 className="title">Welcome to Smart City Management</h1>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2 className="about-title">About</h2>
        <p className="about-content">
        Tired of city chaos? Picture Ettimadai, reimagined. Our smart city website isn't just a portal, it's your personal city concierge. Imagine: instant updates on local happenings, delivered directly to your fingertips, no more missed events or vital announcements.
        Effortlessly glide through your day with real-time transport insights, turning commutes into a breeze. Want your voice heard? Our community forum is your stage, a place to connect, collaborate, and shape Ettimadai's future. Plus, we're optimizing resources like never before, ensuring efficiency and sustainability for a brighter tomorrow.
        Forget the frustration of outdated systems.
        This is Ettimadai, upgraded. It's about convenience, connection, and community, all powered by smart technology. Join us, and experience the future of urban living, today.
        </p>
      </section>
      <section className="about-img">
        <img src= {amritaimage}/>

      </section>
    </div>
  );
}

export default Home;
