# The Digital Tone Gap - MVP

## Project Overview

The Digital Tone Gap is an Emotional Intelligence Assistant for text communication. It helps users both before sending messages (compose mode) and after receiving messages (interpret mode) to reduce tone misinterpretation.

## Problem Statement

Text strips away facial cues, vocal tone, and context. This creates an emotional intent gap where neutral or short messages can be misunderstood as rude, passive-aggressive, or dismissive.

## MVP Features

- Real-time-ish analysis via OpenAI-compatible API (OpenAI or Groq)
- Bidirectional workflow:
  - Compose Mode: tone scoring + intent + risk + rewrite suggestions
  - Interpret Mode: possible meanings + confidence + suggested reply
- Relationship-aware context:
  - Friend
  - Partner
  - Colleague
- Failure handling:
  - Empty input validation
  - API error handling
  - Low confidence warning: `⚠️ Interpretation uncertain`
- Privacy simulation banner: `🔒 Your messages are not stored`

## Tech Stack

- Frontend: React (Vite), TailwindCSS, ShadCN-style component architecture (Radix + utility primitives)
- Backend: Node.js + Express
- AI Layer: OpenAI `gpt-4o-mini` or Groq model (OpenAI-compatible endpoint) with structured prompting and JSON output
- Data: In-memory UI state (no database)

## Project Structure

```
digital-tone-gap/
├── client/
│   ├── components/
│   │   ├── MessageInput.jsx
│   │   ├── ToneAnalysis.jsx
│   │   ├── Suggestions.jsx
│   │   ├── Interpretation.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx
├── server/
│   ├── routes/
│   │   └── analyze.js
│   ├── controllers/
│   │   └── analyzeController.js
│   ├── services/
│   │   └── aiService.js
│   └── server.js
└── README.md
```

## Setup Steps

1. Install dependencies:

```bash
cd server
npm install
cd ../client
npm install
```

2. Configure environment variables:

```bash
cd ../server
copy .env.example .env
```

3. Configure AI provider in `.env`:

```env
PORT=5000
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# OR use Groq
# AI_PROVIDER=groq
# GROQ_API_KEY=your_groq_api_key_here
# GROQ_MODEL=llama-3.1-8b-instant
```

## Run The App

1. Start backend:

```bash
cd server
npm run dev
```

2. Start frontend (new terminal):

```bash
cd client
npm run dev
```

3. Open the Vite URL shown in terminal (usually `http://localhost:5173`).

## Demo Instructions

Use these scenarios during demo:

- `Okay.` in Interpret Mode -> often flagged as ambiguous/passive-aggressive risk
- `Sure, do whatever you want` -> likely high risk + passive-aggressive signal
- Short work email in colleague context -> check tone score shifts by context
- Relationship misunderstanding in partner mode -> compare suggested rewrites and reply

## Known Limitations

- AI latency depends on provider/network conditions
- No user authentication
- No persistent history (intentional for privacy-first MVP)
- Confidence is model-estimated, not ground-truth certainty
- No advanced conversation memory beyond single input context
