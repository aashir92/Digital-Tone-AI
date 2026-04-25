import { useState } from "react";
import Interpretation from "../components/Interpretation";
import MessageInput from "../components/MessageInput";
import Suggestions from "../components/Suggestions";
import ToneAnalysis from "../components/ToneAnalysis";
import { Loader } from "../components/ui/loader";
import { ToastViewport } from "../components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { analyzeTone } from "../services/api";

function Home() {
  const [message, setMessage] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toasts, setToasts] = useState([]);

  function addToast(messageText, tone = "info") {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((current) => [...current, { id, message: messageText, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4500);
  }

  function dismissToast(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  async function onAnalyze() {
    if (!message.trim()) {
      addToast("Please enter a message before analyzing.", "error");
      setResult(null);
      return;
    }

    if (!relationship) {
      addToast("Please choose a relationship context.", "error");
      setResult(null);
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeTone({ message, relationship, mode: "interpret" });
      setResult(data);
    } catch (err) {
      setResult(null);
      addToast(err.message || "Could not analyze message right now.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-[600px] w-[400px] overflow-hidden bg-slate-50 text-slate-900">
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />

      <div className="h-full overflow-y-auto px-3 py-4">
        <div className="mx-auto mb-4 max-w-2xl text-center fade-up">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Digital Tone Gap</h1>
          <p className="mt-1 text-xs text-slate-600">Your WhatsApp tone companion</p>
          <p className="mt-2 text-xs font-medium text-slate-500">Messages are analyzed only when you submit</p>
        </div>

        <Card className="mx-auto border-slate-200 bg-white">
          <CardHeader>
            <CardTitle>Interpret Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <MessageInput
              message={message}
              setMessage={setMessage}
              relationship={relationship}
              setRelationship={setRelationship}
              onAnalyze={onAnalyze}
              loading={loading}
            />

            {loading && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-2">
                <Loader />
              </div>
            )}
          </CardContent>
        </Card>

        <section className="mx-auto mt-4 grid max-w-5xl gap-3">
          <ToneAnalysis data={result} loading={loading} />
          <Interpretation data={result} loading={loading} />
        </section>

        <section className="mx-auto mt-3 max-w-5xl pb-2">
          <Suggestions suggestions={result?.suggestions || []} loading={loading} />
        </section>
      </div>
    </main>
  );
}

export default Home;
