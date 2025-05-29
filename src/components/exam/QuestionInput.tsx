import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubQuestion } from "@/data/examModels";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionInputProps {
  subQuestion: SubQuestion;
  selectedAnswers: Record<string, any>;
  onAnswerChange: (questionId: string, answer: any) => void;
  isReviewMode?: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  subQuestion,
  selectedAnswers,
  onAnswerChange,
  isReviewMode = false,
}) => {
  const answerId = subQuestion.id;
  const userAnswer = selectedAnswers[answerId];
  const isCorrect = userAnswer === subQuestion.correctAnswer;
  
  const renderFeedback = () => {
    if (!isReviewMode) return null;
    
    return (
      <div className={`mt-2 p-3 rounded-lg ${
        isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          {isCorrect ? (
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
        {subQuestion.explanation && (
          <p className="text-sm text-gray-700">{subQuestion.explanation}</p>
        )}
        {!isCorrect && (
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-medium">Correct answer:</span> {subQuestion.correctAnswer}
          </p>
        )}
      </div>
    );
  };
  
  switch (subQuestion.type) {
    case 'mcq':
      return (
        <div>
          <RadioGroup
            value={userAnswer?.toString()}
            onValueChange={(value) => onAnswerChange(answerId, parseInt(value))}
            className={`mt-3 ${isReviewMode ? 'opacity-70' : ''}`}
            disabled={isReviewMode}
          >
            {subQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                <RadioGroupItem value={index.toString()} id={`${answerId}-${index}`} />
                <Label htmlFor={`${answerId}-${index}`} className="flex-1 cursor-pointer">
                  {String.fromCharCode(65 + index)}. {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {renderFeedback()}
        </div>
      );
    
    case 'true-false':
      return (
        <div>
          <RadioGroup
            value={userAnswer?.toString()}
            onValueChange={(value) => onAnswerChange(answerId, value === 'true')}
            className={`mt-3 ${isReviewMode ? 'opacity-70' : ''}`}
            disabled={isReviewMode}
          >
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
              <RadioGroupItem value="true" id={`${answerId}-true`} />
              <Label htmlFor={`${answerId}-true`} className="cursor-pointer">True</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
              <RadioGroupItem value="false" id={`${answerId}-false`} />
              <Label htmlFor={`${answerId}-false`} className="cursor-pointer">False</Label>
            </div>
          </RadioGroup>
          {renderFeedback()}
        </div>
      );
    
    case 'short-answer':
    case 'calculation':
      return (
        <div>
          <Input
            placeholder="Type your answer here..."
            value={userAnswer || ''}
            onChange={(e) => onAnswerChange(answerId, e.target.value)}
            className={`mt-3 ${isReviewMode ? 'opacity-70' : ''}`}
            disabled={isReviewMode}
          />
          {renderFeedback()}
        </div>
      );
    
    case 'essay':
      return (
        <div>
          <Textarea
            placeholder="Write your answer here..."
            value={userAnswer || ''}
            onChange={(e) => onAnswerChange(answerId, e.target.value)}
            className={`mt-3 min-h-[100px] ${isReviewMode ? 'opacity-70' : ''}`}
            disabled={isReviewMode}
          />
          {renderFeedback()}
        </div>
      );
    
    default:
      return null;
  }
};

export default QuestionInput;
