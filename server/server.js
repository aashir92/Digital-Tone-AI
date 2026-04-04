import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import analyzeRoute from "./routes/analyze.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "digital-tone-gap-api" });
});

app.use("/api/analyze", analyzeRoute);

app.use((err, _req, res, _next) => {
  console.error("Unhandled server error", err);
  res.status(500).json({
    error: "Internal server error",
    details: "Something went wrong while processing your request."
  });
});

app.listen(PORT, () => {
  console.log(`Digital Tone Gap API listening on port ${PORT}`);
});