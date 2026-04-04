const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function analyzeTone(payload) {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  let body = {};
  try {
    body = await response.json();
  } catch {
    body = {};
  }

  if (!response.ok) {
    throw new Error(body?.details || body?.error || "Request failed");
  }

  return body;
}
