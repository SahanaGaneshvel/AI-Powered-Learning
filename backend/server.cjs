const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Ensure this is set in your .env

// Chatbot API Endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GOOGLE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: message }] }]
      }),
    });

    const data = await response.json();
    if (data.error) {
      console.error("Error from API:", data.error);
      return res.status(500).json({ error: "AI response failed." });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.json({ reply });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
