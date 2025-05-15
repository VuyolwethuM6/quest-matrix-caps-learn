
import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizResultsProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onRetakeQuiz: () => void;
  onContinueLearning: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  correctAnswers,
  totalQuestions,
  onRetakeQuiz,
  onContinueLearning
}) => {
  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-6">Quiz Results</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-quest-softPurple flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-quest-primary">{score}%</span>
          </div>
          
          <p className="font-medium text-lg mb-2">
            {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good job!' : 'Keep practicing!'}
          </p>
          
          <p className="text-muted-foreground mb-4">
            You got {correctAnswers} out of {totalQuestions} questions correct
          </p>
          
          {score >= 80 && (
            <div className="flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-full">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">Topic Mastered</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto flex gap-4">
        <Button 
          variant="outline" 
          onClick={onRetakeQuiz}
          className="flex-1"
        >
          Retake Quiz
        </Button>
        
        <Button 
          onClick={onContinueLearning}
          className="flex-1 bg-quest-primary hover:bg-quest-secondary"
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
