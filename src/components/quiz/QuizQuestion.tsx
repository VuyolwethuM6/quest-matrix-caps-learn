import React from "react";
import { CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/data/models";
import MathDisplay from "@/components/MathDisplay";

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

interface QuizQuestionProps {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  userAnswer: string | number | boolean | null;
  answerState: AnswerState;
  onAnswerSelect: (answer: string | number | boolean) => void;
  onNextQuestion: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  userAnswer,
  answerState,
  onAnswerSelect,
  onNextQuestion
}) => {
  const getQuestionTypeBadge = () => {
    if (currentQuestion.type === 'mcq') {
      return 'Multiple Choice';
    } else if (currentQuestion.type === 'true-false') {
      return 'True/False';
    }
    return 'Question';
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <Badge variant="secondary" className="bg-quest-primary/10 text-quest-primary">
            {getQuestionTypeBadge()}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="mb-8">
            <MathDisplay content={currentQuestion.text} className="text-xl font-medium" />
          </div>

          {currentQuestion.type === 'mcq' && (
            <RadioGroup
              value={userAnswer?.toString() ?? ""}
              className="space-y-4"
              disabled={answerState !== 'unanswered'}
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    userAnswer === option
                      ? 'bg-quest-primary/10 border-quest-primary'
                      : 'hover:bg-muted/50'
                  } ${
                    answerState !== 'unanswered'
                      ? 'cursor-not-allowed opacity-75'
                      : ''
                  }`}
                  onClick={() => answerState === 'unanswered' && onAnswerSelect(option)}
                >
                  <RadioGroupItem
                    value={option.toString()}
                    id={`option-${index}`}
                    disabled={answerState !== 'unanswered'}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="text-base cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === 'true-false' && (
            <RadioGroup
              value={userAnswer?.toString() ?? ""}
              className="space-y-4"
              disabled={answerState !== 'unanswered'}
            >
              <div
                className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  userAnswer === true
                    ? 'bg-quest-primary/10 border-quest-primary'
                    : 'hover:bg-muted/50'
                } ${
                  answerState !== 'unanswered'
                    ? 'cursor-not-allowed opacity-75'
                    : ''
                }`}
                onClick={() => answerState === 'unanswered' && onAnswerSelect(true)}
              >
                <RadioGroupItem
                  value="true"
                  id="option-true"
                  disabled={answerState !== 'unanswered'}
                />
                <Label
                  htmlFor="option-true"
                  className="text-base cursor-pointer flex-1"
                >
                  True
                </Label>
              </div>
              <div
                className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  userAnswer === false
                    ? 'bg-quest-primary/10 border-quest-primary'
                    : 'hover:bg-muted/50'
                } ${
                  answerState !== 'unanswered'
                    ? 'cursor-not-allowed opacity-75'
                    : ''
                }`}
                onClick={() => answerState === 'unanswered' && onAnswerSelect(false)}
              >
                <RadioGroupItem
                  value="false"
                  id="option-false"
                  disabled={answerState !== 'unanswered'}
                />
                <Label
                  htmlFor="option-false"
                  className="text-base cursor-pointer flex-1"
                >
                  False
                </Label>
              </div>
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      {answerState !== 'unanswered' && (
        <Card className={`mb-8 ${
          answerState === 'correct' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              {answerState === 'correct' ? (
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <p className={`font-semibold ${
                  answerState === 'correct' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {answerState === 'correct' ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={onNextQuestion}
        disabled={answerState === 'unanswered'}
        className="w-full h-12 text-base bg-gradient-to-r from-quest-primary to-quest-purple hover:from-quest-primary/90 hover:to-quest-purple/90 text-white"
      >
        {currentQuestionIndex < totalQuestions - 1 ? (
          <>
            Next Question
            <ChevronRight size={20} className="ml-2" />
          </>
        ) : (
          'Finish Quiz'
        )}
      </Button>
    </div>
  );
};

export default QuizQuestion;
