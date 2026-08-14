import React, { useEffect, useRef } from "react";

const COLORS = ["#e8b4b8", "#ffc2cf", "#e26d8f", "#ffffff"];

export default function SparkleCursor() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    let raf;

    const spawn = (x, y) => {
      const p = document.createElement("span");
      p.className = "cursor-spark";
      const angle = Math.random() * Math.PI * 2;
      const dist = 14 + Math.random() * 26;
      const size = 4 + Math.random() * 7;
      p.style.left = `${x - size / 2}px`;
      p.style.top = `${y - size / 2}px`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = `radial-gradient(circle, #fff 0%, ${COLORS[(Math.random() * COLORS.length) | 0]} 55%, transparent 100%)`;
      p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      p.style.setProperty("--dy", `${Math.sin(angle) * dist - 20}px`);
      layer.appendChild(p);
      setTimeout(() => p.remove(), 950);
    };

    const onMove = (e) => {
      spawn(e.clientX, e.clientY);
      if ((Math.random() * 3) | 0 === 0) spawn(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      layer.innerHTML = "";
    };
  }, []);

  return <div ref={layerRef} className="sparkle-layer" />;
}
