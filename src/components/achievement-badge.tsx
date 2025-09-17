import { useState } from "react";
import { Lock, Trophy, Crown, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import achievementBadge from "@/assets/achievement-badge.png";
import mysteryBadge from "@/assets/mystery-badge.png";
import legendaryBadge from "@/assets/legendary-badge.png";

export type AchievementRarity = "bronze" | "silver" | "gold" | "platinum" | "legendary";
export type AchievementStatus = "locked" | "unlocked" | "revealed";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: AchievementRarity;
  status: AchievementStatus;
  category: string;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  onReveal?: (id: string) => void;
  className?: string;
}

const rarityColors = {
  bronze: "border-bronze text-bronze",
  silver: "border-silver text-silver", 
  gold: "border-gold text-gold",
  platinum: "border-platinum text-platinum",
  legendary: "border-legendary text-legendary",
};

const rarityGlows = {
  bronze: "shadow-[0_0_20px_hsl(var(--bronze)/0.5)]",
  silver: "shadow-[0_0_20px_hsl(var(--silver)/0.5)]",
  gold: "shadow-[0_0_20px_hsl(var(--gold)/0.5)]",
  platinum: "shadow-[0_0_20px_hsl(var(--platinum)/0.5)]",
  legendary: "shadow-[0_0_25px_hsl(var(--legendary)/0.7)]",
};

const rarityIcons = {
  bronze: Trophy,
  silver: Trophy,
  gold: Crown,
  platinum: Star,
  legendary: Zap,
};

export function AchievementBadge({ achievement, onReveal, className }: AchievementBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = rarityIcons[achievement.rarity];

  const handleClick = () => {
    if (achievement.status === "unlocked" && onReveal) {
      onReveal(achievement.id);
    }
  };

  const getBadgeImage = () => {
    if (achievement.status === "locked") return mysteryBadge;
    if (achievement.rarity === "legendary") return legendaryBadge;
    return achievementBadge;
  };

  const isInteractable = achievement.status === "unlocked";

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        "flex flex-col items-center p-4 rounded-xl",
        "border-2 bg-card/80 backdrop-blur-sm",
        achievement.status === "locked" 
          ? "border-muted/50 mystery-blur" 
          : rarityColors[achievement.rarity],
        achievement.status === "revealed" && rarityGlows[achievement.rarity],
        achievement.status === "revealed" && "achievement-pulse",
        isInteractable && "hover:scale-105 hover:brightness-110",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Badge Image */}
      <div className="relative mb-3">
        <img 
          src={getBadgeImage()} 
          alt="Achievement badge"
          className={cn(
            "w-16 h-16 transition-all duration-300",
            achievement.status === "locked" && "grayscale opacity-30",
            achievement.status === "revealed" && "drop-shadow-[0_0_15px_currentColor]"
          )}
        />
        
        {/* Lock overlay for locked achievements */}
        {achievement.status === "locked" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
        )}

        {/* Rarity icon overlay for unlocked achievements */}
        {achievement.status !== "locked" && (
          <div className={cn(
            "absolute -top-1 -right-1 w-6 h-6 rounded-full",
            "flex items-center justify-center border-2",
            "bg-background/90 backdrop-blur-sm",
            rarityColors[achievement.rarity]
          )}>
            <Icon className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Achievement Info */}
      <div className="text-center space-y-1">
        <h3 className={cn(
          "font-gaming text-sm font-semibold",
          achievement.status === "locked" ? "text-muted-foreground" : "text-foreground"
        )}>
          {achievement.status === "locked" ? "???" : achievement.title}
        </h3>
        
        <p className={cn(
          "text-xs line-clamp-2",
          achievement.status === "locked" ? "text-muted-foreground/70" : "text-muted-foreground"
        )}>
          {achievement.status === "locked" ? "Hidden achievement" : achievement.description}
        </p>

        {/* Progress bar for in-progress achievements */}
        {achievement.progress !== undefined && achievement.maxProgress && achievement.status !== "locked" && (
          <div className="w-full bg-muted/30 rounded-full h-1.5 mt-2">
            <div 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                `bg-${achievement.rarity}`
              )}
              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
            />
          </div>
        )}

        {/* Category and date */}
        <div className="flex items-center justify-between text-xs text-muted-foreground/70 mt-2">
          <span className="capitalize">{achievement.category}</span>
          {achievement.unlockedAt && (
            <span>{achievement.unlockedAt.toLocaleDateString()}</span>
          )}
        </div>
      </div>

      {/* Reveal prompt for unlocked achievements */}
      {achievement.status === "unlocked" && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-xl border-2 border-primary/50">
          <div className="text-center">
            <div className="text-primary mb-1">🔓</div>
            <div className="text-xs font-gaming text-primary">Click to Reveal</div>
          </div>
        </div>
      )}
    </div>
  );
}