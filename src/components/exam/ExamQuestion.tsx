import React from "react";
import { Flag, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExamQuestion } from "@/data/examModels";
import QuestionInput from "./QuestionInput";

interface ExamQuestionProps {
  question: ExamQuestion;
  questionIndex: number;
  selectedAnswers: Record<string, any>;
  flaggedQuestions: Set<number>;
  onAnswerChange: (questionId: string, answer: any) => void;
  onFlagToggle: () => void;
  isReviewMode?: boolean;
}

const ExamQuestionComponent: React.FC<ExamQuestionProps> = ({
  question,
  questionIndex,
  selectedAnswers,
  flaggedQuestions,
  onAnswerChange,
  onFlagToggle,
  isReviewMode = false,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Question {questionIndex + 1} ({question.marks} marks)
          </CardTitle>
          <Button
            variant={flaggedQuestions.has(questionIndex) ? "default" : "outline"}
            size="sm"
            onClick={onFlagToggle}
            className="flex items-center gap-2"
          >
            <Flag className="h-4 w-4" />
            {flaggedQuestions.has(questionIndex) ? "Flagged" : "Flag"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">{question.questionText}</div>
        
        {/* Diagram */}
        {question.diagram && (
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Image className="h-5 w-5 text-quest-primary" />
              <span className="text-sm font-medium">Diagram</span>
            </div>
            <img 
              src={question.diagram} 
              alt="Question diagram"
              className="w-full max-w-md mx-auto rounded border"
            />
          </div>
        )}
        
        {question.subQuestions && (
  <div className="space-y-6">
    {question.subQuestions.map((subQuestion, index) => (
      <div key={subQuestion.id} className="border-l-4 border-quest-primary pl-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">
            {questionIndex + 1}.{index + 1}
          </span>
          <span className="text-sm text-muted-foreground">
            ({subQuestion.marks} marks)
          </span>
        </div>
        <div className="mb-3">
          {subQuestion.questionText.split('[DIAGRAM]').map((part, i, arr) => (
            <div key={i}>
              {part}
              {i < arr.length - 1 && subQuestion.diagram && (
                <div className="bg-muted p-4 rounded-lg my-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Image className="h-5 w-5 text-quest-primary" />
                    <span className="text-sm font-medium">Diagram</span>
                  </div>
                  <img 
                    src={subQuestion.diagram} 
                    alt="Question diagram"
                    className="w-full max-w-md mx-auto rounded border"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <QuestionInput
          subQuestion={subQuestion}
          selectedAnswers={selectedAnswers}
          onAnswerChange={onAnswerChange}
          isReviewMode={isReviewMode}
        />
      </div>
    ))}
  </div>
)}
      </CardContent>
    </Card>
  );
};

export default ExamQuestionComponent;
