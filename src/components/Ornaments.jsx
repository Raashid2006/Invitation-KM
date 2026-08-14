import React from "react";

export function Ornament({ style }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: "absolute", opacity: 0.55, ...style }}>
      <path d="M2 2 H42 M2 2 V42" stroke="#d4a45c" strokeWidth="1" fill="none" />
      <circle cx="47" cy="7" r="5" stroke="#d4a45c" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function Branch() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" style={{ opacity: 0.8, marginBottom: 18 }}>
      <path d="M10 80 C 30 60, 50 40, 80 10" stroke="#8a8f9c" strokeWidth="1" fill="none" />
      <ellipse cx="70" cy="20" rx="8" ry="4" fill="#d4a45c" transform="rotate(-40 70 20)" />
      <ellipse cx="55" cy="35" rx="7" ry="3.5" fill="#d4a45c" transform="rotate(-35 55 35)" />
      <ellipse cx="40" cy="52" rx="6" ry="3" fill="#d4a45c" transform="rotate(-30 40 52)" />
      <circle cx="20" cy="70" r="2" fill="#c98a6b" />
      <circle cx="26" cy="64" r="1.6" fill="#c98a6b" />
    </svg>
  );
}
