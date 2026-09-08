import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContextValue";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

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
          <NavLink to="/stays">Stays</NavLink>
          <NavLink to="/my-bookings">My Bookings</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="navbar-actions">
          <button className="ai-button"
          onClick={() => navigate("/ai-budget-planner")}
          >
          ✨ AI Budget Planner
          </button>

          {user ? (
            <>
              <button className="login-button" onClick={() => { logout(); navigate("/"); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="login-button" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="signup-button" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;