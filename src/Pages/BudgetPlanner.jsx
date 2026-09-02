import React, { useState } from "react";

function BudgetPlanner() {
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [days, setDays] = useState(1);
  const [budget, setBudget] = useState(10000);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlanTrip = async () => {
    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    if (travelers < 1 || days < 1 || budget <= 0) {
      setError("Please enter valid trip details.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/plan-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            travelers,
            days,
            budget,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to generate travel plan."
        );
      }

      setResult(data.data);
    } catch (error) {
      console.error("Budget planner error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const total = result?.total || 0;

  const stayPercent = total
    ? (result.stay / total) * 100
    : 0;

  const foodPercent = total
    ? (result.food / total) * 100
    : 0;

  const transportPercent = total
    ? (result.transport / total) * 100
    : 0;

  const bufferPercent = total
    ? (result.buffer / total) * 100
    : 0;

  return (
    <div className="budget-page">

      {/* Header */}
      <div className="budget-header">
        <span className="budget-badge">✨ AI Powered</span>

        <h1>AI Budget Planner</h1>

        <p>
          Plan your trip smartly with an AI-powered
          budget breakdown.
        </p>
      </div>

      {/* Planner Form */}
      <div className="planner-card">

        <div className="input-group destination-input">
          <label>Destination</label>

          <input
            type="text"
            placeholder="e.g. Goa, Manali, Mumbai"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
          />
        </div>

        <div className="input-row">

          <div className="input-group">
            <label>Travelers</label>

            <input
              type="number"
              min="1"
              value={travelers}
              onChange={(e) =>
                setTravelers(Number(e.target.value))
              }
            />
          </div>

          <div className="input-group">
            <label>Travel Days</label>

            <input
              type="number"
              min="1"
              value={days}
              onChange={(e) =>
                setDays(Number(e.target.value))
              }
            />
          </div>

          <div className="input-group">
            <label>Total Budget</label>

            <div className="budget-input">
              <span>₹</span>

              <input
                type="number"
                min="1"
                value={budget}
                onChange={(e) =>
                  setBudget(Number(e.target.value))
                }
              />
            </div>
          </div>

        </div>

        <button
          className="plan-button"
          onClick={handlePlanTrip}
          disabled={loading}
        >
          {loading
            ? "Creating Your Plan..."
            : "✨ Plan My Trip"}
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="budget-error">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="result-section">

          <div className="result-heading">
            <div>
              <span className="result-label">
                YOUR AI TRAVEL PLAN
              </span>

              <h2>
                Your {destination} Budget Plan
              </h2>

              <p>
                {days} days · {travelers} traveler
                {travelers > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="total-card">

            <div>
              <span>
                Total Estimated Budget
              </span>

              <h2>
                ₹{total.toLocaleString("en-IN")}
              </h2>

              <p>
                Planned within your ₹
                {budget.toLocaleString("en-IN")} budget
              </p>
            </div>

            <div className="total-icon">
              ₹
            </div>

          </div>

          {/* Budget Cards */}
          <div className="budget-cards">

            <div className="budget-card">
              <div className="budget-card-icon">
                🏨
              </div>

              <span>Stay</span>

              <h3>
                ₹{result.stay?.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="budget-card">
              <div className="budget-card-icon">
                🍴
              </div>

              <span>Food</span>

              <h3>
                ₹{result.food?.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="budget-card">
              <div className="budget-card-icon">
                🚗
              </div>

              <span>Transport</span>

              <h3>
                ₹{result.transport?.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="budget-card">
              <div className="budget-card-icon">
                🛡️
              </div>

              <span>Buffer</span>

              <h3>
                ₹{result.buffer?.toLocaleString("en-IN")}
              </h3>
            </div>

          </div>

          {/* Breakdown */}
          <div className="breakdown-card">

            <div className="breakdown-info">

              <span className="result-label">
                BUDGET BREAKDOWN
              </span>

              <h2>Where your money goes</h2>

              <p>
                Your estimated travel expenses
                are divided into four categories.
              </p>

              <div className="budget-legend">

                <div>
                  <span className="legend-dot stay-dot"></span>
                  <span>Stay</span>
                  <strong>
                    {stayPercent.toFixed(0)}%
                  </strong>
                </div>

                <div>
                  <span className="legend-dot food-dot"></span>
                  <span>Food</span>
                  <strong>
                    {foodPercent.toFixed(0)}%
                  </strong>
                </div>

                <div>
                  <span className="legend-dot transport-dot"></span>
                  <span>Transport</span>
                  <strong>
                    {transportPercent.toFixed(0)}%
                  </strong>
                </div>

                <div>
                  <span className="legend-dot buffer-dot"></span>
                  <span>Buffer</span>
                  <strong>
                    {bufferPercent.toFixed(0)}%
                  </strong>
                </div>

              </div>

            </div>

            {/* Simple Pie Chart */}
            <div
              className="pie-chart"
              style={{
                background: `conic-gradient(
                  #4f46e5 0% ${stayPercent}%,
                  #22c55e ${stayPercent}% ${
                    stayPercent + foodPercent
                  }%,
                  #f59e0b ${
                    stayPercent + foodPercent
                  }% ${
                    stayPercent +
                    foodPercent +
                    transportPercent
                  }%,
                  #ef4444 ${
                    stayPercent +
                    foodPercent +
                    transportPercent
                  }% 100%
                )`,
              }}
            >
              <div className="pie-center">
                <span>Total</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

          </div>

          {/* AI Recommendation */}
          {result.recommendation && (
            <div className="recommendation-card">

              <div className="recommendation-icon">
                ✨
              </div>

              <div>
                <span className="result-label">
                  AI RECOMMENDATION
                </span>

                <h2>
                  Smart Travel Suggestion
                </h2>

                <p>
                  {result.recommendation}
                </p>
              </div>

            </div>
          )}

          {/* Recommended Listings */}
          {result.recommendedListings?.length > 0 && (
            <div className="recommended-section">

              <div className="section-heading">
                <div>
                  <span className="result-label">
                    STAYNEST PICKS
                  </span>

                  <h2>
                    Recommended Stays
                  </h2>
                </div>
              </div>

              <div className="recommended-list">

                {result.recommendedListings.map(
                  (listing) => (
                    <div
                      className="recommended-card"
                      key={listing.id}
                    >
                      <div>
                        <h3>
                          {listing.title}
                        </h3>

                        <p>
                          ₹
                          {listing.pricePerNight?.toLocaleString(
                            "en-IN"
                          )}{" "}
                          / night
                        </p>

                        <span>
                          {listing.reason}
                        </span>
                      </div>

                      <button>
                        Book Now
                      </button>
                    </div>
                  )
                )}

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default BudgetPlanner;