import { Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility is correctly set up

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;
          
          return (
            <div
              key={step}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  isCompleted && "bg-quest-purple border-quest-purple", // Using quest.purple
                  isCurrent && "border-quest-purple bg-background", // Using quest.purple
                  !isCompleted && !isCurrent && "border-muted-foreground/30 bg-background",
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-quest-purple" : "text-muted-foreground/50" // Using quest.purple
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium absolute top-12 whitespace-nowrap",
                  (isCompleted || isCurrent) ? "text-quest-purple" : "text-muted-foreground/50" // Using quest.purple
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
        
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 h-[2px] w-full -z-10">
          <div className="h-full bg-muted-foreground/30">
            <div
              className="h-full bg-quest-purple transition-all duration-200" // Using quest.purple
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;