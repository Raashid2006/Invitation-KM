import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink to="/venue" className={({ isActive }) => (isActive ? "active" : "")}>
        Venue
      </NavLink>
      <NavLink to="/quotes" className={({ isActive }) => (isActive ? "active" : "")}>
        Love Notes
      </NavLink>
    </nav>
  );
}
