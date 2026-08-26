const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dify API
const DIFY_URL = "https://api.dify.ai/v1/workflows/run";

app.post("/api/plan-trip", async (req, res) => {
    try {
        const {
            destination,
            travelers,
            days,
            budget
        } = req.body;

        // Basic validation
        if (!destination || !travelers || !days || !budget) {
            return res.status(400).json({
                error: "Please provide destination, travelers, days and budget."
            });
        }

        // Send data to Dify
        const difyResponse = await fetch(DIFY_URL, {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${process.env.DIFY_API_KEY}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                inputs: {
                    destination: destination,
                    travelers: travelers,
                    days: days,
                    budget: budget
                },

                response_mode: "blocking",

                user: "staynest-user"
            })
        });

        const difyData = await difyResponse.json();

        // If Dify returns an error
        if (!difyResponse.ok) {
            console.error("Dify Error:", difyData);

            return res.status(difyResponse.status).json({
                error: difyData.message || "Dify API request failed"
            });
        }

        // Send Dify response back to React
        res.json(difyData);

    } catch (error) {
        console.error("Server Error:", error);

        res.status(500).json({
            error: "Failed to generate travel plan"
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});