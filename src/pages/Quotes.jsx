import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeartIcon from "../components/HeartIcon.jsx";
import { QUOTES } from "../data/quotes.js";

export default function Quotes() {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const q = setInterval(() => setQuoteIdx((i) => (i + 1) % QUOTES.length), 4200);
    return () => clearInterval(q);
  }, []);

  return (
    <div className="section" style={{ minHeight: "100%" }}>
      <p className="eyebrow rise-in">Love Notes</p>
      <HeartIcon
        size={22}
        color="#e8b4b8"
        className="heart-beat rise-in"
        style={{ marginBottom: 22 }}
      />

      <p className="quote-hero rise-in" key={quoteIdx} style={{ animationDelay: "0.1s" }}>
        <span className="quote-fade">&ldquo;{QUOTES[quoteIdx]}&rdquo;</span>
      </p>

      <div className="quote-grid rise-in" style={{ animationDelay: "0.25s" }}>
        {QUOTES.map((q, i) => (
          <div className="quote-card" key={i}>
            <HeartIcon size={14} color="#e26d8f" style={{ marginBottom: 10 }} />
            &ldquo;{q}&rdquo;
          </div>
        ))}
      </div>

      <Link to="/" className="back-home" style={{ marginBottom: 40 }}>
        ← Back Home
      </Link>
    </div>
  );
}
