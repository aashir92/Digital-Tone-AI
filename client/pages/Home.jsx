import { useMemo, useState } from "react";
import Interpretation from "../components/Interpretation";
import MessageInput from "../components/MessageInput";
import Suggestions from "../components/Suggestions";
import ToneAnalysis from "../components/ToneAnalysis";
import { Loader } from "../components/ui/loader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { analyzeTone } from "../services/api";

function Home() {
  const [tab, setTab] = useState("compose");
  const [message, setMessage] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const modeLabel = useMemo(() => (tab === "compose" ? "Compose Mode" : "Interpret Mode"), [tab]);

  async function onAnalyze() {
    if (!message.trim()) {
      setError("Please enter a message before analyzing.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await analyzeTone({ message, relationship, mode: tab });
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err.message || "Could not analyze message right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <div className="mx-auto mb-6 max-w-2xl text-center fade-up">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">The Digital Tone Gap</h1>
        <p className="mt-2 text-sm text-slate-600">Emotional Intelligence Assistant for Text Communication</p>
        <p className="mt-3 text-xs font-medium text-slate-500">🔒 Your messages are not stored</p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>{modeLabel}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={(value) => setTab(value)}>
            <TabsList>
              <TabsTrigger value="compose">Compose Mode</TabsTrigger>
              <TabsTrigger value="interpret">Interpret Mode</TabsTrigger>
            </TabsList>

            <TabsContent value="compose">
              <MessageInput
                mode="compose"
                message={message}
                setMessage={setMessage}
                relationship={relationship}
                setRelationship={setRelationship}
                onAnalyze={onAnalyze}
                loading={loading}
              />
            </TabsContent>

            <TabsContent value="interpret">
              <MessageInput
                mode="interpret"
                message={message}
                setMessage={setMessage}
                relationship={relationship}
                setRelationship={setRelationship}
                onAnalyze={onAnalyze}
                loading={loading}
              />
            </TabsContent>
          </Tabs>

          {loading && (
            <div className="mt-4">
              <Loader />
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}
        </CardContent>
      </Card>

      <section className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-2">
        <ToneAnalysis data={result} />
        <Interpretation data={result} />
      </section>

      <section className="mx-auto mt-4 max-w-5xl">
        <Suggestions suggestions={result?.suggestions || []} />
      </section>
    </main>
  );
}

export default Home;
