import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/brain.png"
        alt="Brain Works Logo"
        width={40}
        height={40}
        className="rounded-lg"
      />
      <span className="text-xl font-bold text-foreground">Brain Works</span>
    </div>
  );
}
