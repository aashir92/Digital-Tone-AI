import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function MessageInput({ message, setMessage, relationship, setRelationship, onAnalyze, onPasteFromWhatsApp, loading }) {
  return (
    <div className="space-y-3">
      <Button
        onClick={onPasteFromWhatsApp}
        size="lg"
        className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-base font-bold shadow-md hover:from-emerald-600 hover:to-cyan-600"
        disabled={loading}
      >
        Paste from WhatsApp
      </Button>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Paste incoming message</label>
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Paste the message you received from WhatsApp..."
          className="rounded-2xl shadow-sm"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Relationship context</label>
        <Select value={relationship} onValueChange={setRelationship}>
          <SelectTrigger className="rounded-2xl shadow-sm">
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
