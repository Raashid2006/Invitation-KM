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
    <div className="section fade-in" style={{ minHeight: "100%" }}>
      <p className="eyebrow">Love Notes</p>
      <HeartIcon size={22} color="#d4a45c" style={{ marginBottom: 22 }} />

      <p className="quote-hero" key={quoteIdx}>
        <span className="quote-fade">&ldquo;{QUOTES[quoteIdx]}&rdquo;</span>
      </p>

      <div className="quote-grid">
        {QUOTES.map((q, i) => (
          <div className="quote-card" key={i}>
            <HeartIcon size={14} color="#c98a6b" style={{ marginBottom: 10 }} />
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
