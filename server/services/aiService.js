import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const PROVIDER = (process.env.AI_PROVIDER || "openai").toLowerCase();
const MODEL =
  PROVIDER === "groq"
    ? process.env.GROQ_MODEL || "llama-3.1-8b-instant"
    : process.env.OPENAI_MODEL || "gpt-4o-mini";

function createClient() {
  if (PROVIDER === "groq") {
    if (!process.env.GROQ_API_KEY) {
      return null;
    }
    return new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1"
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const client = createClient();

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fallback;
  }
  return parsed;
}

function normalizePayload(raw) {
  const suggestions = Array.isArray(raw?.suggestions) ? raw.suggestions.slice(0, 3) : [];
  const interpretations = Array.isArray(raw?.interpretations)
    ? raw.interpretations.slice(0, 3).map((item) => ({
        meaning: String(item?.meaning || ""),
        confidence: Math.max(0, Math.min(100, toNumber(item?.confidence, 0)))
      }))
    : [];

  const highestConfidence = interpretations.reduce((max, entry) => Math.max(max, entry.confidence), 0);

  return {
    tone: String(raw?.tone || "neutral"),
    tone_score: Math.max(0, Math.min(100, toNumber(raw?.tone_score, 50))),
    intent: String(raw?.intent || "Unclear intent"),
    risk_level: String(raw?.risk_level || "medium"),
    suggestions,
    interpretations,
    suggested_reply: String(raw?.suggested_reply || "Could you clarify what you meant?"),
    uncertain: highestConfidence > 0 && highestConfidence < 60
  };
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("No JSON object found in model output");
    }
    return JSON.parse(match[0]);
  }
}

export async function analyzeMessage({ message, relationship, mode }) {
  if (!client) {
    const keyName = PROVIDER === "groq" ? "GROQ_API_KEY" : "OPENAI_API_KEY";
    throw new Error(`${keyName} is not configured`);
  }

  const systemPrompt = [
    "You are an emotional intelligence assistant for digital communication.",
    "Analyze text for tone and likely interpretation.",
    "Always return valid JSON only.",
    "Keep output concise, grounded, and avoid hallucination.",
    "Confidence must be an integer from 0 to 100.",
    "Suggestions should contain 2-3 rewritten alternatives."
  ].join(" ");

  const userPrompt = `Analyze the following message.\n\nMessage: "${message}"\nRelationship: "${relationship}"\nMode: "${mode}"\n\nReturn JSON with exactly this shape:\n{\n  "tone": "friendly | neutral | aggressive | passive-aggressive",\n  "tone_score": 0,\n  "intent": "",\n  "risk_level": "low | medium | high",\n  "suggestions": ["", ""],\n  "interpretations": [\n    {"meaning": "", "confidence": 0}\n  ],\n  "suggested_reply": ""\n}`;

  const completion = await client.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]
  });

  const content = completion.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty model response");
  }

  const parsed = safeJsonParse(content);
  return normalizePayload(parsed);
}