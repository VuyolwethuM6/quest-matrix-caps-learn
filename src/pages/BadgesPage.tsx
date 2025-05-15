
import React from "react";
import NavBar from "@/components/NavBar";
import BadgeCard from "@/components/BadgeCard";
import { getBadges } from "@/data/curriculum";

const BadgesPage: React.FC = () => {
  const badges = getBadges();
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Your Badges</h1>
        <p className="text-muted-foreground mb-6">
          Collect badges by completing quests and achievements
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {badges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default BadgesPage;
