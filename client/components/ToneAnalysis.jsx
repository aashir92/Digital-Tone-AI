import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function toneBadgeClass(tone) {
  const value = String(tone || "").toLowerCase();
  if (value.includes("friendly")) return "bg-emerald-100 text-emerald-700";
  if (value.includes("aggressive") || value.includes("passive")) return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
}

function scoreClass(score) {
  if (score >= 70) return "text-emerald-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
}

function ToneAnalysis({ data }) {
  if (!data) return null;

  return (
    <Card className="fade-up">
      <CardHeader>
        <CardTitle>Tone Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">Tone</p>
          <Badge className={toneBadgeClass(data.tone)}>{data.tone}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">Tone score</p>
          <p className={`text-xl font-bold ${scoreClass(data.tone_score)}`}>{data.tone_score}/100</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-slate-600">Detected intent</p>
          <p className="text-sm font-medium">{data.intent}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-slate-600">Risk of misinterpretation</p>
          <p className="text-sm font-semibold capitalize">{data.risk_level}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ToneAnalysis;
