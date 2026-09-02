const express = require("express");

const {
  planTrip,
} = require("../controllers/budgetController");

const router = express.Router();

router.post("/", planTrip);

module.exports = router;