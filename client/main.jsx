import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log("[Digital Tone Gap] Initializing React UI...");
ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
