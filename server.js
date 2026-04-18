import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are ISO, a friendly AI study assistant for a student named Ruth." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    res.json({ reply: "Error connecting to ISO brain." });
  }
});

app.listen(3000, () => {
  console.log("ISO AI server running on port 3000");
});
