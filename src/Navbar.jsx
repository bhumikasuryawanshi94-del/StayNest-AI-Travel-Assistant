import React from "react";
import "./Navbar.css";


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
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#stays">Stays</a>
          <a href="#about">About</a>
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