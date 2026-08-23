import React, { useState } from "react";


function AIBudgetPlanner() {
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [days, setDays] = useState(1);
  const [budget, setBudget] = useState(10000);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlanTrip = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/plan-trip",
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
          data.error || "Unable to generate travel plan"
        );
      }

      // Get the actual result from Dify
      const resultText = data.data.outputs.result;

      // Convert Dify text into usable values
      const lines = resultText.split("\n");

      const parsed = {};

      lines.forEach((line) => {
        const parts = line.split(":");

        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts
            .slice(1)
            .join(":")
            .replace("₹", "")
            .replace(/,/g, "")
            .trim();

          parsed[key] = Number(value);
        }
      });

      setResult(parsed);

    } catch (error) {
      console.error(error);
      setError(error.message);
    }

    setLoading(false);
  };

  const total =
    result?.Total ||
    result?.Stay +
      result?.Food +
      result?.Transport +
      result?.Buffer ||
    0;

  const stayPercent = total
    ? (result?.Stay / total) * 100
    : 0;

  const foodPercent = total
    ? (result?.Food / total) * 100
    : 0;

  const transportPercent = total
    ? (result?.Transport / total) * 100
    : 0;

  const bufferPercent = total
    ? (result?.Buffer / total) * 100
    : 0;

  return (
    <div className="budget-page">

      {/* Header */}
      <div className="budget-header">
        <h1>AI Budget Planner</h1>

        <p>
          Plan your trip smartly with an AI-powered budget
          breakdown.
        </p>
      </div>

      {/* Input Card */}
      <div className="planner-card">

        <div className="input-group">
          <label>Destination</label>

          <input
            type="text"
            placeholder="e.g. Goa, Manali, Mumbai"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
            <label>Total Budget (₹)</label>

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

        <button
          className="plan-button"
          onClick={handlePlanTrip}
          disabled={loading}
        >
          {loading ? "Creating Your Plan..." : "Plan My Trip"}
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="result-section">

          <div className="result-title">
            <h2>Your {destination} Budget Plan</h2>

            <p>
              {days} days • {travelers} traveler
              {travelers > 1 ? "s" : ""}
            </p>
          </div>

          {/* Total */}
          <div className="total-card">
            <div>
              <span>Total Estimated Budget</span>
              <h2>₹{total.toLocaleString("en-IN")}</h2>
            </div>

            <div className="total-icon">
              ₹
            </div>
          </div>

          {/* Budget Cards */}
          <div className="budget-cards">

            <div className="budget-card stay">
              <span>🏨</span>
              <p>Stay</p>
              <h3>
                ₹{result.Stay?.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="budget-card food">
              <span>🍴</span>
              <p>Food</p>
              <h3>
                ₹{result.Food?.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="budget-card transport">
              <span>🚗</span>
              <p>Transport</p>
              <h3>
                ₹{result.Transport?.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="budget-card buffer">
              <span>🛡️</span>
              <p>Buffer</p>
              <h3>
                ₹{result.Buffer?.toLocaleString("en-IN")}
              </h3>
            </div>

          </div>

          {/* Chart Section */}
          <div className="chart-card">

            <div>
              <h2>Budget Breakdown</h2>
              <p>
                See where your travel budget is allocated.
              </p>

              <div className="legend">

                <div>
                  <span className="legend-dot stay-dot"></span>
                  Stay — {stayPercent.toFixed(0)}%
                </div>

                <div>
                  <span className="legend-dot food-dot"></span>
                  Food — {foodPercent.toFixed(0)}%
                </div>

                <div>
                  <span className="legend-dot transport-dot"></span>
                  Transport — {transportPercent.toFixed(0)}%
                </div>

                <div>
                  <span className="legend-dot buffer-dot"></span>
                  Buffer — {bufferPercent.toFixed(0)}%
                </div>

              </div>
            </div>

            {/* Pie Chart */}
            <div
              className="pie-chart"
              style={{
                background: `conic-gradient(
                  #4f46e5 0% ${stayPercent}%,
                  #22c55e ${stayPercent}% ${stayPercent + foodPercent}%,
                  #f59e0b ${stayPercent + foodPercent}% ${stayPercent + foodPercent + transportPercent}%,
                  #ef4444 ${stayPercent + foodPercent + transportPercent}% 100%
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

        </div>
      )}

    </div>
  );
}

export default AIBudgetPlanner;