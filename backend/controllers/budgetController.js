const Listing = require("../models/Listing");
const {
  generateBudgetPlan,
} = require("../services/geminiService");

const planTrip = async (req, res) => {
  try {
    const {
      destination,
      travelers,
      days,
      budget,
    } = req.body;

    // Validate required fields
    if (!destination || !travelers || !days || !budget) {
      return res.status(400).json({
        success: false,
        error:
          "Destination, travelers, days and budget are required",
      });
    }

    // Validate values
    if (
      travelers < 1 ||
      days < 1 ||
      budget <= 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid trip details",
      });
    }

    // Find listings in the requested destination
    const listings = await Listing.find({
      city: {
        $regex: new RegExp(
          `^${destination}$`,
          "i"
        ),
      },
      maxGuests: {
        $gte: travelers,
      },
    }).limit(10);

    // Generate AI budget plan
    const aiPlan = await generateBudgetPlan({
      destination,
      travelers,
      days,
      budget,
      listings,
    });

    res.status(200).json({
      success: true,
      data: {
        destination,
        travelers,
        days,
        budget,
        ...aiPlan,
      },
    });
  } catch (error) {
    console.error(
      "Budget planner error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to create travel plan",
    });
  }
};

module.exports = {
  planTrip,
};