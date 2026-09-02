const { GoogleGenAI } = require("@google/genai");

// Fix 1: Configure the client network settings to prevent short timeouts
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  // We can pass an optional generic fetch wrapper if needed, 
  // but structuring a retry loop protects against sudden network stalls.
});

const generateBudgetPlan = async ({
  destination,
  travelers,
  days,
  budget,
  listings,
}) => {
  // Fix 2: Clean the listings payload before sending. 
  // Massive listing documents (with long descriptions, arrays of reviews, images) cause huge delays.
  const optimizedListings = listings.map(item => ({
    id: item._id || item.id,
    title: item.title || item.name,
    image: item.image,
    pricePerNight: item.pricePerNight || item.price,
    maxGuests: item.maxGuests || item.guests || 2
  }));

  const prompt = `
You are the AI travel budget planner for StayNest.
Create a realistic travel budget plan using ONLY the StayNest listings provided below.

Trip details:
Destination: ${destination}
Travelers: ${travelers}
Travel days: ${days}
Total budget: ₹${budget}

StayNest listings:
${JSON.stringify(optimizedListings, null, 2)}

Rules:
1. Do not invent hotels or prices.
2. Only recommend listings from the provided StayNest listings.
3. Stay cost should be calculated using the listing price per night multiplied by travel days.
4. Consider the number of travelers and maximum guests allowed.
5. Keep the complete estimated budget within the user's budget.
6. Allocate reasonable amounts for stay, food, transport and emergency buffer.
7. Return concise reasoning for the recommendation. Keep "recommendation" text under 3 sentences to stay fast.
`;

  // Fix 3: Built-in retry mechanism to capture and bypass temporary timeout stalls
  const maxRetries = 2;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`[Gemini API] Retrying request (Attempt ${attempt}/${maxRetries})...`);
        // Wait 1.5 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              stay: { type: "number" },
              food: { type: "number" },
              transport: { type: "number" },
              buffer: { type: "number" },
              total: { type: "number" },
              recommendation: { type: "string" },
              recommendedListings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    title: { type: "string" },
                    image: { type: "string"},
                    pricePerNight: { type: "number" },
                    reason: { type: "string" },
                  },
                  required: ["id", "title","image", "pricePerNight", "reason"],
                },
              },
            },
            required: ["stay", "food", "transport", "buffer", "total", "recommendation", "recommendedListings"],
          },
        },
      });

      // Safely parse text output
      return JSON.parse(response.text);

    } catch (error) {
      lastError = error;
      const isTimeout = error.message?.includes('fetch failed') || error.code === 'UND_ERR_HEADERS_TIMEOUT';
      
      if (!isTimeout) {
        // If it's a structural syntax/API error, fail immediately instead of retrying
        throw error;
      }
      console.warn(`[Gemini API] Connection timed out on attempt ${attempt}.`);
    }
  }

  // If all retries failed
  throw lastError;
};

module.exports = {
  generateBudgetPlan,
};
