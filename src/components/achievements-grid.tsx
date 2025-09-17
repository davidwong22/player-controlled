import { useState } from "react";
import { AchievementBadge, type Achievement } from "@/components/achievement-badge";
import { Button } from "@/components/ui/button";
import { Filter, Trophy, Crown, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock achievements data
const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first quest",
    rarity: "bronze",
    status: "revealed",
    category: "progression",
    unlockedAt: new Date("2024-01-15"),
  },
  {
    id: "2", 
    title: "Speed Demon",
    description: "Complete a level in under 30 seconds",
    rarity: "silver",
    status: "unlocked",
    category: "speed",
  },
  {
    id: "3",
    title: "Treasure Hunter",
    description: "Find 100 hidden treasures",
    rarity: "gold",
    status: "locked",
    category: "exploration",
    progress: 67,
    maxProgress: 100,
  },
  {
    id: "4",
    title: "Perfect Score",
    description: "Achieve 100% completion on all levels",
    rarity: "platinum",
    status: "unlocked",
    category: "completion",
  },
  {
    id: "5",
    title: "Legendary Warrior",
    description: "Defeat the ultimate boss without taking damage",
    rarity: "legendary",
    status: "revealed",
    category: "combat",
    unlockedAt: new Date("2024-01-20"),
  },
  {
    id: "6",
    title: "Master Collector", 
    description: "Collect all rare items in the game",
    rarity: "gold",
    status: "locked",
    category: "collection",
  },
  {
    id: "7",
    title: "Social Butterfly",
    description: "Help 50 other players complete quests",
    rarity: "silver",
    status: "unlocked",
    category: "social",
  },
  {
    id: "8",
    title: "Mysterious Cipher",
    description: "Solve the ancient puzzle chamber",
    rarity: "platinum",
    status: "locked",
    category: "puzzle",
  },
];

const categories = [
  { id: "all", label: "All", icon: Trophy },
  { id: "progression", label: "Progress", icon: Star },
  { id: "combat", label: "Combat", icon: Zap },
  { id: "exploration", label: "Explore", icon: Crown },
  { id: "completion", label: "Complete", icon: Trophy },
];

const rarityFilters = [
  { id: "all", label: "All Rarities" },
  { id: "bronze", label: "Bronze" },
  { id: "silver", label: "Silver" },
  { id: "gold", label: "Gold" },
  { id: "platinum", label: "Platinum" },
  { id: "legendary", label: "Legendary" },
];

interface AchievementsGridProps {
  isWalletConnected?: boolean;
}

export function AchievementsGrid({ isWalletConnected = false }: AchievementsGridProps) {
  const [achievements, setAchievements] = useState(mockAchievements);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");

  const handleReveal = (id: string) => {
    if (!isWalletConnected) {
      // Show connect wallet prompt
      return;
    }

    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id 
          ? { ...achievement, status: "revealed" as const, unlockedAt: new Date() }
          : achievement
      )
    );
  };

  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === "all" || achievement.category === selectedCategory;
    const rarityMatch = selectedRarity === "all" || achievement.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const stats = {
    total: achievements.length,
    unlocked: achievements.filter(a => a.status !== "locked").length,
    revealed: achievements.filter(a => a.status === "revealed").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-gaming text-primary font-bold">{stats.revealed}</div>
          <div className="text-sm text-muted-foreground">Revealed</div>
        </div>
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-gaming text-accent font-bold">{stats.unlocked}</div>
          <div className="text-sm text-muted-foreground">Unlocked</div>
        </div>
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-gaming text-muted-foreground font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "font-gaming",
                  selectedCategory === category.id && "glow-primary"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Rarity Filter */}
        <div className="flex flex-wrap gap-2">
          {rarityFilters.map(rarity => (
            <Button
              key={rarity.id}
              variant={selectedRarity === rarity.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedRarity(rarity.id)}
              className="font-gaming text-xs"
            >
              {rarity.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAchievements.map(achievement => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            onReveal={handleReveal}
          />
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-gaming text-lg text-muted-foreground mb-2">No achievements found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}