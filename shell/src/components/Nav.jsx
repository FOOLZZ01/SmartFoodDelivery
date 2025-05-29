import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav style={{ padding: 10, background: "#f1f1f1" }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({ marginRight: 15, fontWeight: isActive ? "bold" : "normal" })}
      >
        🏠 Home
      </NavLink>
      <NavLink
        to="/user"
        style={({ isActive }) => ({ marginRight: 15, fontWeight: isActive ? "bold" : "normal" })}
      >
        🙍‍♂️ User
      </NavLink>
      <NavLink
        to="/restaurant"
        style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
      >
        🍽️ Restaurant
      </NavLink>
    </nav>
  );
}
