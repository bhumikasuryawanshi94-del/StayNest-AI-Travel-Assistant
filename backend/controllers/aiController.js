const { planBudget } = require("../utils/budgetEngine");

const {
  generateBudgetExplanation,
} = require("../utils/llmService");

const destinationTiers = {
  goa: "premium",
  manali: "mid",
  rishikesh: "budget",
  jaipur: "mid",
  mumbai: "premium",
  delhi: "mid",
  pune: "mid",
};

const getBudgetPlan = async (req, res, next) => {
  try {
    const {
      destination,
      totalBudget,
      days,
      members,
    } = req.body;

    if (
      !destination ||
      !totalBudget ||
      !days ||
      !members
    ) {
      return res.status(400).json({
        error:
          "Destination, budget, days and travelers are required.",
      });
    }

    const tier =
      destinationTiers[
        destination.toLowerCase().trim()
      ] || "mid";

    const result = planBudget({
      totalBudget: Number(totalBudget),
      days: Number(days),
      members: Number(members),
      destinationTier: tier,
    });

    // Generate AI explanation
    let aiExplanation =
      "Your budget was calculated successfully.";

    try {
      aiExplanation =
        await generateBudgetExplanation({
          destination,
          totalBudget: Number(totalBudget),
          days: Number(days),
          members: Number(members),
          destinationTier: tier,

          breakdown: result.breakdown,

          perNightStayBudget:
            result.perNightStayBudget,

          perPersonFoodPerDay:
            result.perPersonFoodPerDay,
        });

    } catch (llmError) {
      console.error(
        "Gemini error:",
        llmError.message
      );

      aiExplanation =
        "AI explanation is temporarily unavailable.";
    }

    res.status(200).json({
      destination,
      totalBudget: Number(totalBudget),
      days: Number(days),
      members: Number(members),

      destinationTier: tier,

      breakdown: result.breakdown,

      perNightStayBudget:
        result.perNightStayBudget,

      perPersonFoodPerDay:
        result.perPersonFoodPerDay,

      // Gemini response
      aiExplanation,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBudgetPlan,
};

