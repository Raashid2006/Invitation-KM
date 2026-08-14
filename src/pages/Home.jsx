import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeartIcon from "../components/HeartIcon.jsx";
import { Ornament } from "../components/Ornaments.jsx";

const TARGET_DATE = new Date("2026-09-13T19:00:00");

function getTimeLeft() {
  const diff = TARGET_DATE - new Date();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
    m: Math.floor((diff / (1000 * 60)) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="section fade-in" style={{ minHeight: "100%" }}>
      <Ornament style={{ top: 18, left: 18 }} />
      <Ornament style={{ bottom: 18, right: 18, transform: "rotate(180deg)" }} />

      <p className="eyebrow">Together With Their Families</p>
      <h1 className="names-script">Magesh Raja</h1>
      <div className="amp">
        <HeartIcon size={20} color="#c98a6b" />
      </div>
      <h1 className="names-script">Kalaiarasi</h1>
      <p className="sub">
        request the pleasure of your company
        <br />
        at the ceremony of their engagement
      </p>

      <div className="card" style={{ marginTop: 44 }}>
        <p className="card-label">Save The Date</p>
        <p className="date-main">Sunday, 13th September 2026</p>
        <p className="date-sub">7 PM in the evening</p>
        <div className="countdown">
          {[
            { v: timeLeft.d, l: "Days" },
            { v: timeLeft.h, l: "Hours" },
            { v: timeLeft.m, l: "Mins" },
            { v: timeLeft.s, l: "Secs" },
          ].map((c, i) => (
            <div key={i} className="count-unit">
              <span className="count-num">{pad(c.v)}</span>
              <span className="count-label">{c.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tile-row">
        <Link to="/venue" className="tile">
          <HeartIcon size={18} color="#d4a45c" />
          <p className="tile-title">The Venue</p>
          <p className="tile-sub">Where to find us</p>
        </Link>
        <Link to="/quotes" className="tile">
          <HeartIcon size={18} color="#d4a45c" />
          <p className="tile-title">Love Notes</p>
          <p className="tile-sub">Words for the day</p>
        </Link>
      </div>
    </div>
  );
}
