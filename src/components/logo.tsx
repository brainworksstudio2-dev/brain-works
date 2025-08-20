import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary p-1 rounded-lg">
        <Image
          src="/images/brain.png"
          alt="Brain Works Logo"
          width={32}
          height={32}
        />
      </div>
      <span className="text-xl font-bold text-foreground">Brain Works</span>
    </div>
  );
}
