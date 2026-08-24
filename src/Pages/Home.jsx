import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  return (
    <section className="hero">

      {/* Hero Background Image */}
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p className="hero-subtitle">
          ✈️ Discover • Explore • Experience
        </p>

        <h1>
          Your Journey Starts
          <br />
          <span>Here.</span>
        </h1>

        <p className="hero-description">
          Discover beautiful destinations, find the perfect stay,
          and plan your dream trip with your AI travel assistant.
        </p>

        <div className="hero-buttons">
          <button className="explore-button"
          onClick={() => navigate("/stays")}
          >
            Explore
          </button>

          <button className="ai-hero-button"
          onClick={() => navigate("/ai-budget-planner")}
          >
          ✨ Plan with AI
          </button>
        </div>

      </div>

    </section>
  );
}

export default Home;