import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-4 py-1 text-xs font-black uppercase tracking-widest transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "border-accent/50 bg-accent/20 text-accent-foreground hover:bg-accent",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white",
        outline: "border-foreground/10 text-foreground hover:bg-foreground hover:text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
