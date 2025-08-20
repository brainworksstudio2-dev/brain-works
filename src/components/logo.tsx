import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <BrainCircuit
          size={24}
          className="text-primary-foreground"
        />
      </div>
      <span className="text-xl font-bold text-foreground">Brain Works</span>
    </div>
  );
}
