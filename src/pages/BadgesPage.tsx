
import React from "react";
import { ArrowLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import BadgeCard from "@/components/BadgeCard";
import { getBadges } from "@/data/curriculum";
import { useNavigate } from "react-router-dom";

const BadgesPage: React.FC = () => {
  const badges = getBadges();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={24} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Your Badges</h1>
            <p className="opacity-90">Collect badges by completing quests and achievements</p>
          </div>
        </div>
      </div>
      
      {/* Badges Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {badges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;
