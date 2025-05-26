
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ExamTimer from "./ExamTimer";

interface ExamHeaderProps {
  timeRemaining: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({
  timeRemaining,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const navigate = useNavigate();
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-white border-b p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/exams")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Exit Exam
        </Button>
        
        <div className="flex items-center gap-4">
          <ExamTimer timeRemaining={timeRemaining} />
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-4">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default ExamHeader;
