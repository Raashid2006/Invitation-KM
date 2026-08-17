import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ThreeBackground from "./components/ThreeBackground.jsx";
import EnvelopeCover from "./components/EnvelopeCover.jsx";
import AmbientHearts from "./components/AmbientHearts.jsx";
import FloatingPetals from "./components/FloatingPetals.jsx";
import SparkleCursor from "./components/SparkleCursor.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Venue from "./pages/Venue.jsx";
import Quotes from "./pages/Quotes.jsx";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="app-shell">
      <ThreeBackground />
      <FloatingPetals />

      {opened && <AmbientHearts />}

      <EnvelopeCover opened={opened} onOpen={() => setOpened(true)} />

      {opened && <NavBar />}
      {opened && <AudioPlayer src="/uyire.mp3" />}

      <div
        className="page-scroll"
        style={{ opacity: opened ? 1 : 0, pointerEvents: opened ? "auto" : "none", transition: "opacity 1s ease 0.2s" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </div>

      <SparkleCursor />
    </div>
  );
}
