import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import analyzeRoute from "./routes/analyze.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://web.whatsapp.com"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const isAllowedOrigin = allowedOrigins.includes(origin);
      const isChromeExtension = origin.startsWith("chrome-extension://");

      if (isAllowedOrigin || isChromeExtension) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS blocked for this origin"));
    }
  })
);
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

const thisFilePath = fileURLToPath(import.meta.url);
if (process.argv[1] && process.argv[1] === thisFilePath) {
  app.listen(PORT, () => {
    console.log(`Digital Tone Gap API listening on port ${PORT}`);
  });
}

export default app;