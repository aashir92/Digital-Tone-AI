import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

export function Tabs(props) {
  return <TabsPrimitive.Root {...props} />;
}

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn("grid h-11 grid-cols-2 items-center rounded-xl bg-white/70 p-1", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition data-[state=active]:bg-teal-600 data-[state=active]:text-white",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={cn("mt-4 fade-up", className)} {...props} />;
}
