
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
    <div className="bg-white rounded-xl p-8 shadow-sm border max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Question {currentQuestionIndex + 1}</h2>
        <p className="text-muted-foreground">Choose the correct answer below</p>
      </div>
      
      <div className="mb-8">
        <MathDisplay content={currentQuestion.text} className="text-xl font-medium text-center" />
      </div>
      
      {answerState !== 'unanswered' && (
        <div className={`p-4 rounded-lg mb-6 ${
          answerState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {answerState === 'correct' ? (
              <>
                <CheckCircle size={20} className="text-green-600" />
                <span className="font-semibold text-green-600">Correct!</span>
              </>
            ) : (
              <>
                <XCircle size={20} className="text-red-600" />
                <span className="font-semibold text-red-600">Incorrect</span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
        </div>
      )}
      
      <div className="mb-8">
        {currentQuestion.type === 'mcq' && (
          <RadioGroup
            value={userAnswer?.toString() ?? ""}
            className="space-y-4"
            disabled={answerState !== 'unanswered'}
          >
            {currentQuestion.options?.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  userAnswer === index ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                } ${answerState !== 'unanswered' ? 'cursor-not-allowed opacity-75' : ''}`}
                onClick={() => answerState === 'unanswered' && onAnswerSelect(index)}
              >
                <RadioGroupItem
                  value={index.toString()}
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
              className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                userAnswer === true ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
              } ${answerState !== 'unanswered' ? 'cursor-not-allowed opacity-75' : ''}`}
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
              className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                userAnswer === false ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
              } ${answerState !== 'unanswered' ? 'cursor-not-allowed opacity-75' : ''}`}
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
      </div>
      
      <div className="text-center">
        <Button
          onClick={onNextQuestion}
          disabled={answerState === 'unanswered'}
          className="px-8 py-3 text-base bg-blue-600 hover:bg-blue-700"
        >
          {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
