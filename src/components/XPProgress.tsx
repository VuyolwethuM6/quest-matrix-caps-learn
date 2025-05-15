
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useProgress } from "@/contexts/ProgressContext";

interface XPProgressProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const XPProgress: React.FC<XPProgressProps> = ({ size = "md", showText = true }) => {
  const { xp, level } = useProgress();
  
  // Calculate XP required for next level
  const xpForCurrentLevel = 50 * (level - 1) * (level - 1);
  const xpForNextLevel = 50 * level * level;
  const xpInCurrentLevel = xp - xpForCurrentLevel;
  const xpRequiredForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progress = (xpInCurrentLevel / xpRequiredForNextLevel) * 100;
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-14 h-14",
    lg: "w-24 h-24",
  };
  
  const textClasses = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-2xl font-bold",
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={sizeClasses[size]}>
        <CircularProgressbar
          value={progress}
          text={showText ? `${level}` : ""}
          styles={buildStyles({
            pathColor: "#9b87f5",
            textColor: "#9b87f5",
            trailColor: "#E5DEFF",
            textSize: "38px",
          })}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textClasses[size]}`}>Level {level}</span>
          <span className="text-xs text-muted-foreground">
            {xpInCurrentLevel}/{xpRequiredForNextLevel} XP to Level {level + 1}
          </span>
        </div>
      )}
    </div>
  );
};

export default XPProgress;
