
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium">Question {currentQuestionIndex + 1}/{totalQuestions}</h2>
        <div className="px-3 py-1 bg-quest-softPurple text-quest-primary rounded-full text-sm">
          {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'True or False'}
        </div>
      </div>
      
      <MathDisplay content={currentQuestion.text} className="text-lg font-medium mb-6" />
      
      {answerState !== 'unanswered' && (
        <div className={`p-4 rounded-lg mb-6 ${
          answerState === 'correct' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {answerState === 'correct' ? (
              <>
                <CheckCircle size={18} className="text-green-600" />
                <span className="font-medium text-green-600">Correct!</span>
              </>
            ) : (
              <>
                <XCircle size={18} className="text-red-600" />
                <span className="font-medium text-red-600">Incorrect</span>
              </>
            )}
          </div>
          <p className="text-sm">{currentQuestion.explanation}</p>
        </div>
      )}
      
      {currentQuestion.type === 'mcq' && (
        <RadioGroup
          value={userAnswer?.toString() ?? ""}
          className="space-y-3"
          disabled={answerState !== 'unanswered'}
        >
          {currentQuestion.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                onClick={() => onAnswerSelect(index)}
              />
              <Label
                htmlFor={`option-${index}`}
                className="text-base cursor-pointer py-2"
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
          className="space-y-3"
          disabled={answerState !== 'unanswered'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="true"
              id="option-true"
              onClick={() => onAnswerSelect(true)}
            />
            <Label
              htmlFor="option-true"
              className="text-base cursor-pointer py-2"
            >
              True
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="false"
              id="option-false"
              onClick={() => onAnswerSelect(false)}
            />
            <Label
              htmlFor="option-false"
              className="text-base cursor-pointer py-2"
            >
              False
            </Label>
          </div>
        </RadioGroup>
      )}
      
      <div className="mt-8 flex justify-end">
        <Button
          onClick={onNextQuestion}
          disabled={answerState === 'unanswered'}
          className="bg-quest-primary hover:bg-quest-secondary"
        >
          {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
