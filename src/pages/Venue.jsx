import React from "react";
import { Link } from "react-router-dom";
import { Branch } from "../components/Ornaments.jsx";
import HeartIcon from "../components/HeartIcon.jsx";

const ADDRESS = "MSS Mahal, Fathima Pallivasal Opp, Seevalaperi Road, KTC Nagar";

export default function Venue() {
  return (
    <div className="section" style={{ minHeight: "100%" }}>
      <p className="eyebrow rise-in">Join Us At</p>

      <div className="card rise-in" style={{ animationDelay: "0.15s" }}>
        <p className="card-label">Venue</p>
        <p className="venue-name">MSS Mahal</p>
        <p className="venue-addr">Fathima Pallivasal Opp, Seevalaperi Road, KTC Nagar</p>
        <a
          className="venue-map-link"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>
      </div>

      <div className="rise-in" style={{ marginTop: 50, animationDelay: "0.3s" }}>
        <Branch />
        <p className="footer-text">We can't wait to celebrate this evening with you here.</p>
        <div className="footer-hearts">
          <HeartIcon size={14} color="#e26d8f" />
          <HeartIcon size={18} color="#e8b4b8" />
          <HeartIcon size={14} color="#e26d8f" />
        </div>
      </div>

      <Link to="/" className="back-home">
        ← Back Home
      </Link>
    </div>
  );
}
