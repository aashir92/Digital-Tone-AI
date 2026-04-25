import { X } from "lucide-react";
import { cn } from "../../lib/utils";

function toneClasses(tone) {
  if (tone === "error") {
    return "border-red-200 bg-red-50 text-red-800";
  }
  if (tone === "success") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  return "border-slate-200 bg-white text-slate-800";
}

export function Toast({ id, message, tone = "info", onDismiss }) {
  return (
    <div className={cn("flex items-start justify-between gap-3 rounded-xl border p-3 text-sm shadow-sm", toneClasses(tone))}>
      <p className="leading-5">{message}</p>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="rounded-md p-1 text-current/80 transition hover:bg-black/5"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastViewport({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed right-3 top-3 z-50 flex w-[360px] max-w-[calc(100%-24px)] flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
