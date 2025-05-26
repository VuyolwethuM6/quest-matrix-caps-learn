
import React from "react";
import { Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExamQuestion } from "@/data/examModels";

interface QuestionNavigationProps {
  examQuestions: ExamQuestion[];
  currentQuestionIndex: number;
  selectedAnswers: Record<string, any>;
  flaggedQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  examQuestions,
  currentQuestionIndex,
  selectedAnswers,
  flaggedQuestions,
  onQuestionSelect,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Question Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {examQuestions.map((_, index) => {
            const hasAnswers = examQuestions[index].subQuestions?.some(sq => 
              selectedAnswers[sq.id] !== undefined && selectedAnswers[sq.id] !== ''
            ) || false;
            
            return (
              <Button
                key={index}
                variant={currentQuestionIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => onQuestionSelect(index)}
                className={`relative ${
                  hasAnswers ? "bg-green-100 border-green-300" : ""
                } ${flaggedQuestions.has(index) ? "bg-yellow-100 border-yellow-300" : ""}`}
              >
                {index + 1}
                {flaggedQuestions.has(index) && (
                  <Flag className="h-3 w-3 absolute -top-1 -right-1 text-yellow-600" />
                )}
              </Button>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            Answered
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            Flagged
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
            Not Answered
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionNavigation;
