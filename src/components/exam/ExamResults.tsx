import React from "react";
import { CheckCircle, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamQuestion } from "@/data/examModels";

interface ExamResultsProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  examQuestions: ExamQuestion[];
  userAnswers: Record<string, any>;
  onRetakeExam: () => void;
  onReviewAnswers: () => void;
}

const ExamResults: React.FC<ExamResultsProps> = ({
  score,
  correctAnswers,
  totalQuestions,
  timeTaken,
  examQuestions,
  userAnswers,
  onRetakeExam,
  onReviewAnswers,
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

  // Format time taken
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm border max-w-2xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Exam Complete!</h1>
      
      <div className="mb-6 sm:mb-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 sm:mb-6 relative">
          <div className={`text-2xl sm:text-4xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
        </div>
        
        <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
          {getScoreMessage(score)}
        </h2>
        
        <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-2">
          You got {correctAnswers} out of {totalQuestions} questions correct
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span>Time taken: {formatTime(timeTaken)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            <span>Total marks: {totalQuestions}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onReviewAnswers} className="flex items-center gap-2">
          Review Answers
        </Button>
        <Button variant="outline" onClick={onRetakeExam}>
          Retake Exam
        </Button>
      </div>
    </div>
  );
};

export default ExamResults; 