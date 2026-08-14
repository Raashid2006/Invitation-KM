import React from "react";
import { Link } from "react-router-dom";
import { Branch } from "../components/Ornaments.jsx";
import HeartIcon from "../components/HeartIcon.jsx";

const ADDRESS = "MSS Mahal, Fathima Pallivasal Opp, Seevalaperi Road, KTC Nagar";

export default function Venue() {
  return (
    <div className="section fade-in" style={{ minHeight: "100%" }}>
      <p className="eyebrow">Join Us At</p>

      <div className="card">
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

      <div style={{ marginTop: 50 }}>
        <Branch />
        <p className="footer-text">We can't wait to celebrate this evening with you here.</p>
        <div className="footer-hearts">
          <HeartIcon size={14} color="#c98a6b" />
          <HeartIcon size={18} color="#e8b568" />
          <HeartIcon size={14} color="#c98a6b" />
        </div>
      </div>

      <Link to="/" className="back-home">
        ← Back Home
      </Link>
    </div>
  );
}
