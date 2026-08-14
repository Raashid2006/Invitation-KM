import React, { useState } from "react";
import HeartIcon from "./HeartIcon.jsx";

export default function EnvelopeCover({ opened, onOpen }) {
  const [bursts, setBursts] = useState([]);

  const handleOpen = () => {
    if (opened) return;
    const hearts = Array.from({ length: 14 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 14;
      const dist = 140 + Math.random() * 90;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 40;
      return {
        id: i,
        dx,
        dy,
        size: 14 + Math.random() * 10,
        color: i % 2 ? "#f0c98a" : "#e8b1a0",
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
        </div>
        <h2 className="cover-names">Magesh &amp; Kalaiarasi</h2>
        <p className="tap-hint">♥ Tap to open our invitation ♥</p>
      </div>
    </>
  );
}
