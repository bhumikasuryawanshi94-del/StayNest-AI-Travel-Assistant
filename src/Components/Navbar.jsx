import React from "react";
import { Link } from "react-router-dom";



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
          <Link to="/">Home</Link>
          <a href="#destinations">Destinations</a>
          <Link to="/ai-budget-planner">AI Budget Planner</Link>
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