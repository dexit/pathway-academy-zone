import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative group/input w-full">
        <input
          type={type}
          className={cn(
            "flex h-14 w-full rounded-xl border-2 border-border/50 bg-card px-6 py-4 text-base font-medium ring-offset-background transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/30",
            className,
          )}
          ref={ref}
          {...props}
        />
        {/* Living border pulse on focus */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-primary opacity-0 scale-[1.02] blur-sm transition-all duration-500 group-focus-within/input:opacity-50 group-focus-within/input:scale-100" />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
