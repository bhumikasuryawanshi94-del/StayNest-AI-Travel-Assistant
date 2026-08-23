import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
  <img
        src="staynestlogo.png"
        alt="StayNest Logo"
        className="logo-image"
/>
  <span>StayNest</span>
</div>

        <div className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/destinations">Destinations</NavLink>
          <NavLink to="/stays">Stays</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="navbar-actions">
          <button className="ai-button">
            ✨ AI Travel Assistant
          </button>

          <button className="login-button">
            Login
          </button>

          <button className="signup-button">
            Sign Up
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;