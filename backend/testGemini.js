require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents:
        "Explain in one sentence why a travel budget should include an emergency buffer.",
    });

    console.log("\nGemini response:\n");
    console.log(response.text);
  } catch (error) {
    console.error("\nGemini error:\n");
    console.error(error);
  }
}

testGemini();