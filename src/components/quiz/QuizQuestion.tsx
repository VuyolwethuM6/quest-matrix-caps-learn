import React, { useState } from "react";
import { CheckCircle, XCircle, ChevronRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Question, SubQuestion } from "@/data/models";
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

interface SubQuestionState {
  [key: string]: {
    inputValue: string;
    answerState: AnswerState;
  };
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
  const [inputValue, setInputValue] = useState<string>("");
  const [subQuestionStates, setSubQuestionStates] = useState<SubQuestionState>({});

  const handleSubQuestionCheck = (subQuestion: SubQuestion, value: string | number) => {
    setSubQuestionStates(prev => ({
      ...prev,
      [subQuestion.id]: {
        inputValue: value.toString(),
        answerState: value === subQuestion.correctAnswer ? 'correct' : 'incorrect'
      }
    }));
  };

  const areAllSubQuestionsAnswered = () => {
    if (currentQuestion.type !== 'structured' || !('subQuestions' in currentQuestion)) {
      return answerState !== 'unanswered';
    }
    return currentQuestion.subQuestions.every(subQ => 
      subQuestionStates[subQ.id]?.answerState !== 'unanswered'
    );
  };

  const getQuestionTypeBadge = () => {
    switch (currentQuestion.type) {
      case 'mcq':
        return 'Multiple Choice';
      case 'true-false':
        return 'True/False';
      case 'short-answer':
        return 'Short Answer';
      case 'calculation':
        return 'Calculation';
      case 'diagram':
        return 'Diagram Question';
      case 'structured':
        return 'Structured Question';
      default:
        return 'Question';
    }
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const renderDiagram = (diagramUrl: string) => (
    <div className="mb-6 rounded-lg overflow-hidden border">
      <img
        src={diagramUrl}
        alt="Question diagram"
        className="w-full h-auto"
        onError={(e) => {
          e.currentTarget.src = '/placeholder-diagram.png';
        }}
      />
    </div>
  );

  const renderSubQuestions = (subQuestions: SubQuestion[]) => (
    <div className="space-y-6">
      {subQuestions.map((subQuestion, index) => {
        const subState = subQuestionStates[subQuestion.id] || { inputValue: '', answerState: 'unanswered' };
        
        return (
          <Card key={subQuestion.id} className="border-2 border-quest-primary/10">
            <CardContent className="p-4">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  Part {index + 1}
                </Badge>
                <MathDisplay content={subQuestion.text} className="text-lg" />
                {subQuestion.diagram && renderDiagram(subQuestion.diagram)}
              </div>
              
              {subQuestion.type === 'mcq' ? (
                <RadioGroup
                  value={subState.inputValue}
                  className="space-y-4"
                  disabled={subState.answerState !== 'unanswered'}
                >
                  {subQuestion.options?.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        subState.inputValue === index.toString()
                          ? 'bg-quest-primary/10 border-quest-primary'
                          : 'hover:bg-muted/50'
                      } ${
                        subState.answerState !== 'unanswered'
                          ? 'cursor-not-allowed opacity-75'
                          : ''
                      }`}
                      onClick={() => subState.answerState === 'unanswered' && handleSubQuestionCheck(subQuestion, index)}
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`${subQuestion.id}-option-${index}`}
                        disabled={subState.answerState !== 'unanswered'}
                      />
                      <Label
                        htmlFor={`${subQuestion.id}-option-${index}`}
                        className="text-base cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter your answer..."
                      value={subState.inputValue}
                      onChange={(e) => setSubQuestionStates(prev => ({
                        ...prev,
                        [subQuestion.id]: { ...prev[subQuestion.id], inputValue: e.target.value }
                      }))}
                      disabled={subState.answerState !== 'unanswered'}
                      className="w-full"
                    />
                    {subState.answerState === 'unanswered' && (
                      <Button
                        onClick={() => handleSubQuestionCheck(subQuestion, subState.inputValue)}
                        className="bg-quest-primary hover:bg-quest-primary/90"
                      >
                        Check
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {subState.answerState !== 'unanswered' && (
                <div className={`mt-4 p-4 rounded-lg ${
                  subState.answerState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className="font-medium mb-2">
                    {subState.answerState === 'correct' ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {subQuestion.explanation}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderQuestionInput = (question: Question | SubQuestion) => {
    switch (question.type) {
      case 'mcq':
        return (
          <RadioGroup
            value={userAnswer?.toString() ?? ""}
            className="space-y-4"
            disabled={answerState !== 'unanswered'}
          >
            {question.options?.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  userAnswer === index
                    ? 'bg-quest-primary/10 border-quest-primary'
                    : 'hover:bg-muted/50'
                } ${
                  answerState !== 'unanswered'
                    ? 'cursor-not-allowed opacity-75'
                    : ''
                }`}
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
        );

      case 'true-false':
        return (
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
        );

      case 'short-answer':
      case 'calculation':
      case 'diagram':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your answer..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={answerState !== 'unanswered'}
                className="w-full"
              />
              {answerState === 'unanswered' && (
                <Button
                  onClick={() => onAnswerSelect(inputValue)}
                  className="bg-quest-primary hover:bg-quest-primary/90"
                >
                  Check
                </Button>
              )}
            </div>
            {answerState !== 'unanswered' && (
              <div className={`p-4 rounded-lg ${
                answerState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <p className="font-medium mb-2">
                  {answerState === 'correct' ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        );

      case 'structured':
        if ('subQuestions' in question) {
          return (
            <div className="space-y-6">
              {question.subQuestions?.map((subQuestion, index) => (
                <Card key={subQuestion.id} className="border-2 border-quest-primary/10">
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-2">
                        Part {index + 1}
                      </Badge>
                      <MathDisplay content={subQuestion.text} className="text-lg" />
                    </div>
                    {renderQuestionInput(subQuestion)}
                  </CardContent>
                </Card>
              ))}
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

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
            {currentQuestion.diagram && renderDiagram(currentQuestion.diagram)}
          </div>

          {currentQuestion.type === 'structured' ? (
            renderSubQuestions(currentQuestion.subQuestions || [])
          ) : (
            renderQuestionInput(currentQuestion)
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
        disabled={!areAllSubQuestionsAnswered()}
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
