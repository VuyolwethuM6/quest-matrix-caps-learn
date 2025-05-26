
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubQuestion } from "@/data/examModels";

interface QuestionInputProps {
  subQuestion: SubQuestion;
  selectedAnswers: Record<string, any>;
  onAnswerChange: (questionId: string, answer: any) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  subQuestion,
  selectedAnswers,
  onAnswerChange,
}) => {
  const answerId = subQuestion.id;
  
  switch (subQuestion.type) {
    case 'mcq':
      return (
        <RadioGroup
          value={selectedAnswers[answerId]?.toString()}
          onValueChange={(value) => onAnswerChange(answerId, parseInt(value))}
          className="mt-3"
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
      );
    
    case 'true-false':
      return (
        <RadioGroup
          value={selectedAnswers[answerId]?.toString()}
          onValueChange={(value) => onAnswerChange(answerId, value === 'true')}
          className="mt-3"
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
      );
    
    case 'short-answer':
    case 'calculation':
      return (
        <Input
          placeholder="Type your answer here..."
          value={selectedAnswers[answerId] || ''}
          onChange={(e) => onAnswerChange(answerId, e.target.value)}
          className="mt-3"
        />
      );
    
    case 'essay':
      return (
        <Textarea
          placeholder="Write your answer here..."
          value={selectedAnswers[answerId] || ''}
          onChange={(e) => onAnswerChange(answerId, e.target.value)}
          className="mt-3 min-h-[100px]"
        />
      );
    
    default:
      return null;
  }
};

export default QuestionInput;
