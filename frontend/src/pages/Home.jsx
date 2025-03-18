import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  TrafficLayer,
  TransitLayer,
} from "@react-google-maps/api";
import videovg from "../assets/background.mp4";
import amritaimage from "../assets/amrita.png";
import Navbar from "../compoents/ui/Navbar";

function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const center = { lat: 10.89, lng: 76.9088 };

  // Key locations in the city
  const locations = [
    { id: 1, name: "City Hall", lat: 10.891, lng: 76.908, type: "government" },
    {
      id: 2,
      name: "Smart Bus Stop",
      lat: 10.892,
      lng: 76.909,
      type: "transport",
    },
    {
      id: 3,
      name: "Fire Station",
      lat: 10.8905,
      lng: 76.9075,
      type: "emergency",
    },
  ];

  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div>
      {/* Render the Navbar component */}
      <Navbar />

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
          Tired of city chaos? Picture Ettimadai, reimagined. Our smart city
          website isn't just a portal, it's your personal city concierge.
          Imagine: instant updates on local happenings, delivered directly to
          your fingertips, no more missed events or vital announcements.
          Effortlessly glide through your day with real-time transport insights,
          turning commutes into a breeze. Want your voice heard? Our community
          forum is your stage, a place to connect, collaborate, and shape
          Ettimadai's future.
        </p>
      </section>

      <section className="about-img">
        <img src={amritaimage} alt="Amrita" />
      </section>

      {/* Google Map Section */}
      <section
        className="map-section"
        style={{ width: "100%", height: "90vh" }}
      >
        {isLoaded ? (
          <GoogleMap
            center={center}
            zoom={13}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {/* Markers for Key Locations */}
            {locations.map((place) => (
              <MarkerF
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                onClick={() => setSelectedPlace(place)}
              />
            ))}

            {/* Info Window for selected location */}
            {selectedPlace && (
              <InfoWindowF
                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h3>{selectedPlace.name}</h3>
                  <p>Type: {selectedPlace.type}</p>
                </div>
              </InfoWindowF>
            )}

            {/* Traffic Layer */}
            <TrafficLayer />

            {/* Transit Layer */}
            <TransitLayer />
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}
      </section>
    </div>
  );
}

export default Home;
