import React from "react";
import HeartIcon from "./HeartIcon.jsx";

const HEART_COLORS = ["#e8b4b8", "#e26d8f", "#ffc2cf", "#f7cdd2"];

export default function AmbientHearts() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`h${i}`}
          className="float-heart"
          style={{
            left: `${4 + i * 8.2}%`,
            animationDuration: `${9 + (i % 5) * 2}s`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          <HeartIcon size={10 + (i % 3) * 6} color={HEART_COLORS[i % HEART_COLORS.length]} />
        </div>
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={`t${i}`}
          className="bg-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            ["--dur"]: `${1.8 + Math.random() * 2.4}s`,
            ["--delay"]: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </>
  );
}
