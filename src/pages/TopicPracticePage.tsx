import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, AlertTriangle, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PracticeQuestion } from "@/data/topicPracticeModels";
import { topicPractices } from "@/data/topicPracticeData";
import { topicPracticeHelpers } from "@/data/topicPracticeModels";
import QuestionInput from "@/components/exam/QuestionInput";

const TopicPracticePage: React.FC = () => {
  const { practiceId } = useParams<{ practiceId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  
  // Find the current practice set
  const currentPractice = topicPractices.find(p => p.id === practiceId);
  if (!currentPractice) {
    return <div>Practice not found</div>;
  }
  
  const currentQuestion = currentPractice.questions[currentQuestionIndex];
  const totalQuestions = currentPractice.questions.length;

  const handleAnswerChange = (questionId: string, answer: any) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const toggleHint = (questionId: string) => {
    setShowHints(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleSolution = (questionId: string) => {
    setShowSolution(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/topics")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Topics
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              {currentPractice.difficulty}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <Card>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium">{currentQuestion.questionText}</div>
            
            {/* Diagram */}
            {currentQuestion.diagram && (
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-quest-primary" />
                  <span className="text-sm font-medium">Diagram</span>
                </div>
                <img 
                  src={currentQuestion.diagram} 
                  alt="Question diagram"
                  className="w-full max-w-md mx-auto rounded border"
                />
              </div>
            )}
            
            {/* Question input */}
            <QuestionInput
              subQuestion={currentQuestion}
              selectedAnswers={selectedAnswers}
              onAnswerChange={handleAnswerChange}
            />

            {/* Hints */}
            {currentQuestion.hints && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => toggleHint(currentQuestion.id)}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  {showHints[currentQuestion.id] ? 'Hide Hints' : 'Show Hints'}
                </Button>
                
                {showHints[currentQuestion.id] && (
                  <div className="mt-2 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium mb-2">Hints:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {currentQuestion.hints.map((hint, index) => (
                        <li key={index}>{hint}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Solution */}
            {currentQuestion.stepByStepSolution && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => toggleSolution(currentQuestion.id)}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  {showSolution[currentQuestion.id] ? 'Hide Solution' : 'Show Solution'}
                </Button>
                
                {showSolution[currentQuestion.id] && (
                  <div className="mt-2 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Step-by-Step Solution:</h4>
                    <div className="whitespace-pre-line">
                      {currentQuestion.stepByStepSolution}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Common Mistakes */}
            {currentQuestion.commonMistakes && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Common Mistakes to Avoid:
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {currentQuestion.commonMistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicPracticePage; 