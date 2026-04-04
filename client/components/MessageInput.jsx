import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function MessageInput({ message, setMessage, relationship, setRelationship, onAnalyze, loading, mode }) {
  const label = mode === "compose" ? "Write your outgoing message" : "Paste incoming message";

  return (
    <div className="space-y-3">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={mode === "compose" ? "Type a message before sending..." : "Paste the message you received..."}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Relationship context</label>
        <Select value={relationship} onValueChange={setRelationship}>
          <SelectTrigger>
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Friend">Friend</SelectItem>
            <SelectItem value="Partner">Partner</SelectItem>
            <SelectItem value="Colleague">Colleague</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onAnalyze} size="lg" className="w-full" disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Message"}
      </Button>
    </div>
  );
}

export default MessageInput;
