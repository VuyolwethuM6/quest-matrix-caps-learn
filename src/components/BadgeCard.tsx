
import React from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { motion } from "framer-motion";
import { Badge } from "@/data/curriculum";

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const { earnedBadges } = useProgress();
  const isEarned = earnedBadges.includes(badge.id);
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`quest-card flex flex-col items-center ${
        isEarned ? "border-quest-primary" : "opacity-70"
      }`}
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 ${
          isEarned
            ? "bg-quest-primary text-white"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {badge.icon}
      </div>
      
      <h3 className="text-lg font-semibold">{badge.name}</h3>
      <p className="text-sm text-muted-foreground text-center mt-2">
        {badge.description}
      </p>
      
      <div
        className={`mt-4 text-xs py-1 px-3 rounded-full ${
          isEarned
            ? "bg-green-100 text-green-800"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isEarned ? "Earned" : badge.condition}
      </div>
    </motion.div>
  );
};

export default BadgeCard;
