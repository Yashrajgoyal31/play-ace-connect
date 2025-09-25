import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export const MobileContainer = ({ children, className }: MobileContainerProps) => {
  return (
    <div className={cn(
      "min-h-screen bg-background",
      "max-w-md mx-auto relative",
      "overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
};