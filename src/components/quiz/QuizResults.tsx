
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
  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent!";
    if (score >= 80) return "Great job!";
    if (score >= 70) return "Good work!";
    if (score >= 60) return "Not bad!";
    return "Keep practicing!";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8">Quiz Complete!</h1>
      
      <div className="mb-8">
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 relative">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
        </div>
        
        <h2 className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
          {getScoreMessage(score)}
        </h2>
        
        <p className="text-lg text-muted-foreground mb-6">
          You got {correctAnswers} out of {totalQuestions} questions correct
        </p>
        
        {score >= 80 && (
          <div className="inline-flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-full">
            <CheckCircle size={18} />
            <span className="font-medium">Topic Mastered!</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={onRetakeQuiz}
          className="flex-1 h-12 text-base"
        >
          Retake Quiz
        </Button>
        
        <Button 
          onClick={onContinueLearning}
          className="flex-1 h-12 text-base bg-blue-600 hover:bg-blue-700"
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
