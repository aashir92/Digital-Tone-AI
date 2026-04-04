import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function Interpretation({ data }) {
  if (!data) return null;

  return (
    <Card className="fade-up">
      <CardHeader>
        <CardTitle>Receiver-Side Interpretation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.uncertain && (
          <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 p-2 text-sm font-medium text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            ⚠️ Interpretation uncertain
          </div>
        )}

        <div>
          <p className="mb-2 text-sm text-slate-600">Possible meanings</p>
          <ul className="space-y-2">
            {(data.interpretations || []).slice(0, 3).map((item, index) => (
              <li key={`${item.meaning}-${index}`} className="rounded-xl border p-3 text-sm">
                <p>{item.meaning}</p>
                <p className="mt-1 text-xs text-slate-500">Confidence: {item.confidence}%</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-1 text-sm text-slate-600">Suggested reply</p>
          <p className="rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm">{data.suggested_reply}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Interpretation;
