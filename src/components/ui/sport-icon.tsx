import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface SportIconProps {
  sport: 'badminton' | 'tennis' | 'basketball' | 'table-tennis' | 'football' | 'hockey';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: CSSProperties;
}

export const SportIcon = ({ sport, className, size = 'md', style }: SportIconProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const iconEmojis = {
    'badminton': '🏸',
    'tennis': '🎾',
    'basketball': '🏀',
    'table-tennis': '🏓',
    'football': '⚽',
    'hockey': '🏒'
  };

  return (
    <div 
      className={cn(
        "rounded-2xl bg-gradient-primary",
        "flex items-center justify-center",
        "shadow-neomorph text-2xl",
        "transition-all duration-300 hover:scale-105",
        sizeClasses[size],
        className
      )}
      style={style}
    >
      {iconEmojis[sport]}
    </div>
  );
};