import React from "react";

export function Ornament({ style }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: "absolute", opacity: 0.55, ...style }}>
      <path d="M2 2 H42 M2 2 V42" stroke="#e8b4b8" strokeWidth="1" fill="none" />
      <circle cx="47" cy="7" r="5" stroke="#e8b4b8" strokeWidth="1" fill="none" />
      <circle cx="47" cy="7" r="1.6" fill="#e26d8f" />
    </svg>
  );
}

export function Branch() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" style={{ opacity: 0.8, marginBottom: 18 }}>
      <path d="M10 80 C 30 60, 50 40, 80 10" stroke="#a06b7c" strokeWidth="1" fill="none" />
      <ellipse cx="70" cy="20" rx="8" ry="4" fill="#e8b4b8" transform="rotate(-40 70 20)" />
      <ellipse cx="55" cy="35" rx="7" ry="3.5" fill="#f7cdd2" transform="rotate(-35 55 35)" />
      <ellipse cx="40" cy="52" rx="6" ry="3" fill="#e8b4b8" transform="rotate(-30 40 52)" />
      <circle cx="20" cy="70" r="2" fill="#e26d8f" />
      <circle cx="26" cy="64" r="1.6" fill="#e26d8f" />
    </svg>
  );
}
