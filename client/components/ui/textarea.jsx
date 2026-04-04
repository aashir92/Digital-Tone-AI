import { cn } from "../../lib/utils";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm leading-6 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100",
        className
      )}
      {...props}
    />
  );
}
