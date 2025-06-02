import React from "react";
import { Trophy, Clock, CheckCircle, XCircle, ArrowRight, Target, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/data/models";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  onRetry: () => void;
  onContinue: () => void;
  questions?: Question[];
  userAnswers?: (string | number | boolean | null)[];
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  timeTaken,
  onRetry,
  onContinue,
  questions = [],
  userAnswers = []
}) => {
  const percentage = (score / totalQuestions) * 100;
  const isPassing = percentage >= 70;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding!";
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 60) return "Good effort!";
    return "Keep practicing!";
  };

  const getScoreColor = () => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 70) return "text-lime-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-8 border-2 border-quest-primary/20">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-quest-primary/10 mb-4">
              <Trophy size={32} className="text-quest-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground">
              {isPassing
                ? "Congratulations! You've passed the quiz."
                : "Keep practicing! You're getting closer."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="border-2 border-quest-primary/10 hover:border-quest-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-quest-primary/10">
                    <Target size={24} className="text-quest-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Score</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">
                        {score}/{totalQuestions}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`${getScoreColor()} bg-opacity-10`}
                      >
                        {percentage.toFixed(0)}%
                      </Badge>
                    </div>
                    <p className={`text-sm font-medium mt-1 ${getScoreColor()}`}>
                      {getScoreMessage()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-quest-primary/10 hover:border-quest-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-quest-primary/10">
                    <Timer size={24} className="text-quest-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Time Taken</p>
                    <p className="text-3xl font-bold">{formatTime(timeTaken)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Average {Math.round(timeTaken / totalQuestions)}s per question
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Overall Progress
              </span>
              <Badge
                variant="secondary"
                className={
                  isPassing
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {percentage.toFixed(0)}%
              </Badge>
            </div>
            <Progress
              value={percentage}
              className={`h-2 ${
                isPassing ? "bg-green-100" : "bg-red-100"
              }`}
            />
          </div>

          {questions.length > 0 && (
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold">Question Review</h3>
              {questions.map((question, index) => {
                const isCorrect = question.correctAnswer === userAnswers[index];
                return (
                  <Card
                    key={index}
                    className={`border ${
                      isCorrect
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle
                            size={20}
                            className="text-green-600 flex-shrink-0 mt-1"
                          />
                        ) : (
                          <XCircle
                            size={20}
                            className="text-red-600 flex-shrink-0 mt-1"
                          />
                        )}
                        <div>
                          <p className="font-medium mb-1">
                            Question {index + 1}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={onRetry}
              variant="outline"
              className="flex-1 h-12"
            >
              Retry Quiz
            </Button>
            <Button
              onClick={onContinue}
              className="flex-1 h-12 bg-gradient-to-r from-quest-primary to-quest-purple hover:from-quest-primary/90 hover:to-quest-purple/90 text-white"
            >
              Continue
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;
