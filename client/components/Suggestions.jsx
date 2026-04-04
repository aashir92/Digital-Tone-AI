import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function Suggestions({ suggestions = [] }) {
  if (!suggestions.length) return null;

  return (
    <Card className="fade-up">
      <CardHeader>
        <CardTitle>Improved Versions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {suggestions.slice(0, 3).map((item, index) => (
            <li key={`${item}-${index}`} className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default Suggestions;
