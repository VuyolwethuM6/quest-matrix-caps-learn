import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const XPInfoTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-5 w-5 text-muted-foreground hover:text-primary cursor-help" />
        </TooltipTrigger>
        <TooltipContent 
          side="left" 
          align="start"
          className="w-80 p-4 max-h-[80vh] overflow-y-auto"
          sideOffset={5}
        >
          <div className="space-y-3">
            <h4 className="font-semibold">XP & Leveling System</h4>
            
            <div>
              <h5 className="font-medium mb-1">How to Earn XP:</h5>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Complete a lesson: +10 XP</li>
                <li>Complete a quiz: Score = XP earned</li>
                <li>Daily streak bonus: +5 XP per day</li>
                <li>3-day streak: +30 XP bonus</li>
                <li>7-day streak: +70 XP bonus</li>
                <li>14-day streak: +150 XP bonus</li>
                <li>30-day streak: +300 XP bonus</li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-1">Level Calculation:</h5>
              <p className="text-sm">
                Level = √(XP/50) + 1 (rounded down)
              </p>
              <p className="text-sm mt-1">
                Example: 1190 XP = Level 5
              </p>
            </div>

            <div>
              <h5 className="font-medium mb-1">XP Required for Levels:</h5>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Level 1: 0-49 XP</li>
                <li>Level 2: 50-199 XP</li>
                <li>Level 3: 200-449 XP</li>
                <li>Level 4: 450-799 XP</li>
                <li>Level 5: 800-1249 XP</li>
                <li>And so on...</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}; 