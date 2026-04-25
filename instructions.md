# 🚀 Digital Tone Gap - AI WhatsApp Companion

**Digital Tone Gap** is an AI-powered Chrome Extension designed to bridge the communication gap in digital messaging. It helps users interpret the "hidden" tone of received WhatsApp messages and compose replies with the perfect emotional resonance.

This project is currently in **Phase 4 (User Testing & Evidence Collection)** of development.

---

## 🛠️ Installation Instructions (For Testers)

To participate in the testing session, please follow these steps to "sideload" the extension into your Chrome browser:

1. **Download & Extract:** Download the project `.zip` file and extract it to a folder on your computer.
2. **Open Extensions:** In Chrome, go to `chrome://extensions/`.
3. **Enable Developer Mode:** Toggle the switch in the **top-right corner**.
4. **Load Unpacked:** Click the **"Load unpacked"** button and select the `dist` folder located within the project directory.
5. **Pin Extension:** Click the "Puzzle" icon in your toolbar and pin **Digital Tone Gap** for easy access.

---

## 🧪 The Testing Session (Phase 4A)

As part of our **Structured Testing Sessions**, please perform the following tasks on [WhatsApp Web](https://web.whatsapp.com):

### Task 1: Direct Integration
* Open a chat and locate the floating **"✨ Analyze"** button near the message input.
* Use it to analyze a message directly within the interface.

### Task 2: Manual Analysis (Smart Paste)
* Copy a confusing message from your chat.
* Open the extension popup, click **"Paste from WhatsApp"**, and select the relationship context (e.g., Boss, Friend).
* Observe the AI-generated interpretation.

### Task 3: Feedback
* After using the tool, please fill out the **Evidence Collection Form**:
  👉 [Google Form](https://docs.google.com/forms/d/e/1FAIpQLScJhrAZJb25x7sr8pbTe46eZwbFtB-3oVL3DkElA5Ze1g7Vvw/viewform)

---

## 🏗️ Technical Architecture

* **Frontend:** React + Vite (Manifest V3)
* **Backend:** Node.js + Express (Deployed on Vercel)
* **AI Engine:** Groq (Llama-3.1-8b-instant)
* **API Logic:** Serverless functions for real-time tone interpretation and text generation.

---

## 🔍 Why This Matters
Digital communication lacks non-verbal cues (facial expressions, vocal tone). This tool uses Generative AI to provide a "Contextual Layer" to messaging, reducing social anxiety and professional friction.

---

*Developed by Aashir Hameed as part of the AI Product Development Project (2026).*