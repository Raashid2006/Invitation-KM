import React from "react";

export default function FloatingPetals({ count = 14 }) {
  const petals = Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    size: 10 + Math.random() * 12,
    dur: 11 + Math.random() * 10,
    delay: -Math.random() * 20,
    sway: 30 + Math.random() * 45,
  }));

  return (
    <div className="petal-layer" aria-hidden="true">
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            ["--size"]: `${p.size}px`,
            ["--dur"]: `${p.dur}s`,
            ["--delay"]: `${p.delay}s`,
            ["--sway"]: `${p.sway}px`,
          }}
        />
      ))}
    </div>
  );
}
