import React, { useState } from "react";
import HeartIcon from "./HeartIcon.jsx";

const BURST_COLORS = ["#f7cdd2", "#e26d8f", "#ffc2cf", "#ffffff"];

export default function EnvelopeCover({ opened, onOpen }) {
  const [bursts, setBursts] = useState([]);
  const [sparkles] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      left: 50 + (Math.random() - 0.5) * 200,
      top: 50 + (Math.random() - 0.5) * 200,
      size: 3 + Math.random() * 5,
      dur: 1.8 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  );

  const handleOpen = () => {
    if (opened) return;
    const hearts = Array.from({ length: 16 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.4;
      const dist = 150 + Math.random() * 110;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 40;
      return {
        id: i,
        dx,
        dy,
        size: 14 + Math.random() * 10,
        color: BURST_COLORS[i % BURST_COLORS.length],
      };
    });
    setBursts(hearts);
    setTimeout(() => onOpen(), 550);
    setTimeout(() => setBursts([]), 1700);
  };

  return (
    <>
      {bursts.map((h) => (
        <div
          key={h.id}
          className="burst-heart"
          style={{ ["--dx"]: `${h.dx}px`, ["--dy"]: `${h.dy}px` }}
        >
          <HeartIcon size={h.size} color={h.color} />
        </div>
      ))}

      <div
        className={`overlay${opened ? " opened" : ""}`}
        onClick={handleOpen}
        role="button"
        aria-label="Open invitation"
      >
        <p className="cover-eyebrow">An Invitation Awaits</p>
        <div className="seal">
          <span className="seal-initials">M &amp; K</span>
          {sparkles.map((s, i) => (
            <span
              key={i}
              className="cover-sparkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                ["--dur"]: `${s.dur}s`,
                ["--delay"]: `${s.delay}s`,
              }}
            />
          ))}
        </div>
        <h2 className="cover-names">Magesh &amp; Kalaiarasi</h2>
        <p className="tap-hint">♥ Tap to open our invitation ♥</p>
      </div>
    </>
  );
}
