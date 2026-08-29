const express = require("express");

const {
  getBudgetPlan,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/budget-plan", getBudgetPlan);

module.exports = router;