import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-border bg-card text-card-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "bg-transparent",
        link: "text-primary underline-offset-4",
        
        // Forehand specific variants
        hero: "bg-gradient-primary text-primary-foreground font-semibold text-lg py-6 px-8",
        sport: "bg-gradient-card text-card-foreground aspect-square",
        floating: "bg-gradient-primary text-primary-foreground rounded-full fixed bottom-6 right-6 w-14 h-14 z-50",
        accent: "bg-gradient-accent text-accent-foreground",
        neomorph: "bg-card text-card-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
