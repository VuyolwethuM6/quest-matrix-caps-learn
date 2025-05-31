import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, AlertTriangle, BookOpen, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PracticeQuestion } from "@/data/topicPracticeModels";
import { topicPractices } from "@/data/topicPracticeData";
import { topicPracticeHelpers } from "@/data/topicPracticeModels";
import QuestionInput from "@/components/exam/QuestionInput";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const TopicPracticePage: React.FC = () => {
  const { practiceId } = useParams<{ practiceId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Find the current practice set
  const currentPractice = topicPractices.find(p => p.id === practiceId);
  if (!currentPractice) {
    return <div>Practice not found</div>;
  }
  
  const currentQuestion = currentPractice.questions[currentQuestionIndex];
  const totalQuestions = currentPractice.questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const handleAnswerChange = (questionId: string, answer: any) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    const currentAnswer = selectedAnswers[currentQuestion.id];
    const isCorrect = currentAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job!",
        duration: 2000,
        className: "bg-green-50 border-green-200",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or check the solution",
        duration: 2000,
        className: "bg-yellow-50 border-yellow-200",
      });
    }
    
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    } else {
      // Practice completed
      setPracticeCompleted(true);
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      toast({
        title: "Practice Completed! 🎉",
        description: `You scored ${score}%!`,
        duration: 3000,
        className: "bg-quest-softPurple/20 border-quest-primary",
        style: {
          background: "rgba(155, 135, 245, 0.1)",
          borderColor: "var(--quest-primary)",
          color: "var(--quest-primary)",
          backdropFilter: "blur(8px)",
        },
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(false);
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

  if (practiceCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold">Practice Completed!</h2>
            <p className="text-muted-foreground">
              You've completed all {totalQuestions} questions in this practice set.
            </p>
            <div className="text-lg font-semibold">
              Score: {Math.round((correctAnswers / totalQuestions) * 100)}%
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/topics")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Topics
              </Button>
              <Button
                onClick={() => {
                  setPracticeCompleted(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setShowHints({});
                  setShowSolution({});
                  setCorrectAnswers(0);
                  setShowFeedback(false);
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Retry Practice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      {/* Progress bar */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Progress value={progress} className="h-2" />
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
              isReviewMode={showFeedback}
            />

            {/* Check Answer button */}
            {!showFeedback && (
              <Button
                onClick={checkAnswer}
                disabled={selectedAnswers[currentQuestion.id] === undefined || selectedAnswers[currentQuestion.id] === ''}
                className="w-full"
              >
                Check Answer
              </Button>
            )}

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
            {currentQuestion.stepByStepSolution && showFeedback && (
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
                    
                    {/* Solution Diagram */}
                    {currentQuestion.solutionDiagram && (
                      <div className="mt-4 bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium">Solution Diagram</span>
                        </div>
                        <img 
                          src={currentQuestion.solutionDiagram} 
                          alt="Solution diagram"
                          className="w-full max-w-md mx-auto rounded border"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Common Mistakes */}
            {currentQuestion.commonMistakes && showFeedback && (
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
            disabled={!showFeedback}
            className="flex items-center gap-2"
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicPracticePage; 