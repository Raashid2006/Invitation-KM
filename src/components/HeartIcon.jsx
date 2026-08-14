import React from "react";

const HEART_PATH =
  "M12 21s-6.7-4.35-9.3-8.2C1 10.2 1.6 6.6 4.6 5 6.8 3.8 9.4 4.5 12 7.4 14.6 4.5 17.2 3.8 19.4 5c3 1.6 3.6 5.2 1.9 7.8C18.7 16.65 12 21 12 21z";

export default function HeartIcon({ size = 16, color = "#e8b568", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <path d={HEART_PATH} fill={color} />
    </svg>
  );
}
