const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateBudgetExplanation = async ({
  destination,
  totalBudget,
  days,
  members,
  destinationTier,
  breakdown,
  perNightStayBudget,
  perPersonFoodPerDay,
}) => {
  const prompt = `
You are StayNest AI, a travel budget assistant.

The following budget has ALREADY been calculated
by our rule-based backend.

Your job is ONLY to explain the budget clearly.
Do NOT change, recalculate, or invent any amounts.

Trip Details:
Destination: ${destination}
Destination Cost Tier: ${destinationTier}
Total Budget: ₹${totalBudget}
Trip Duration: ${days} days
Travelers: ${members}

Budget Allocation:
Stay: ₹${breakdown.stay}
Food: ₹${breakdown.food}
Transport: ₹${breakdown.transport}
Emergency Buffer: ₹${breakdown.buffer}

Additional Calculations:
Stay per night: ₹${perNightStayBudget}
Food per person per day: ₹${perPersonFoodPerDay}

Explain this budget to the traveler in simple language.

Mention:
- Why the budget is divided this way
- What the traveler should prioritize
- Why the emergency buffer is useful

Keep the explanation concise, around 80-120 words.

IMPORTANT:
Do not change any numbers.
Do not invent additional prices.
Do not claim that these are live market prices.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
};

module.exports = {
  generateBudgetExplanation,
};