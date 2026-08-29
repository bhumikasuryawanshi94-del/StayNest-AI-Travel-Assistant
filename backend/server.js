const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const errorHandler = require("./middleware/errorHandler");

const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "StayNest Backend is running!"
  });
});

// Error Handler
app.use(errorHandler);

// AI Budget Planner
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`StayNest server running on port ${PORT}`);
});