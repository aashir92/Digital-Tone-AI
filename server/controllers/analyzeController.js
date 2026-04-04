import { analyzeMessage } from "../services/aiService.js";

const VALID_RELATIONSHIPS = ["Friend", "Partner", "Colleague"];
const VALID_MODES = ["compose", "interpret"];

export async function analyzeMessageController(req, res) {
  const { message, relationship, mode = "compose" } = req.body || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Message is required"
    });
  }

  if (!VALID_RELATIONSHIPS.includes(relationship)) {
    return res.status(400).json({
      error: "Relationship must be Friend, Partner, or Colleague"
    });
  }

  if (!VALID_MODES.includes(mode)) {
    return res.status(400).json({
      error: "Mode must be compose or interpret"
    });
  }

  try {
    const result = await analyzeMessage({
      message: message.trim(),
      relationship,
      mode
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("AI analysis error", error);
    return res.status(502).json({
      error: "AI analysis failed",
      details: "Could not generate tone analysis right now. Please try again."
    });
  }
}