import React from "react";
import HeartIcon from "./HeartIcon.jsx";

export default function AmbientHearts() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="float-heart"
          style={{
            left: `${5 + i * 9.5}%`,
            animationDuration: `${9 + (i % 5) * 2}s`,
            animationDelay: `${i * 0.9}s`,
          }}
        >
          <HeartIcon size={10 + (i % 3) * 6} color={i % 2 ? "#c98a6b" : "#e8b568"} />
        </div>
      ))}
    </>
  );
}
