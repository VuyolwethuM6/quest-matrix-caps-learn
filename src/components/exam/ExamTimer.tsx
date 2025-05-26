
import React from "react";
import { Clock } from "lucide-react";

interface ExamTimerProps {
  timeRemaining: number;
}

const ExamTimer: React.FC<ExamTimerProps> = ({ timeRemaining }) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-quest-primary font-semibold">
      <Clock className="h-5 w-5" />
      {formatTime(timeRemaining)}
    </div>
  );
};

export default ExamTimer;
