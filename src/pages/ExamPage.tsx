
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, ArrowLeft, ArrowRight, Flag, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// Sample exam questions - in a real app this would come from a database
const examQuestions = [
  {
    id: "q1",
    question: "What is the quadratic formula?",
    options: [
      "x = (-b ± √(b² - 4ac)) / 2a",
      "x = (-b ± √(b² + 4ac)) / 2a", 
      "x = (b ± √(b² - 4ac)) / 2a",
      "x = (-b ± √(b² - 4ac)) / a"
    ],
    correctAnswer: 0
  },
  {
    id: "q2", 
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²/2", "2x²"],
    correctAnswer: 1
  },
  {
    id: "q3",
    question: "What is the area of a circle with radius r?",
    options: ["2πr", "πr²", "πr", "2πr²"],
    correctAnswer: 1
  },
  {
    id: "q4",
    question: "What is sin(30°)?",
    options: ["1/2", "√3/2", "1", "√2/2"],
    correctAnswer: 0
  },
  {
    id: "q5",
    question: "What is the slope-intercept form of a linear equation?",
    options: ["ax + by = c", "y = mx + b", "x = my + b", "y = ax² + bx + c"],
    correctAnswer: 1
  }
];

const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 180 minutes in seconds
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = examQuestions[currentQuestionIndex];
  const totalQuestions = examQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isExamSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmitExam();
    }
  }, [timeRemaining, isExamSubmitted]);

  // Format time display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
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

  const handleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(currentQuestionIndex)) {
        newFlagged.delete(currentQuestionIndex);
      } else {
        newFlagged.add(currentQuestionIndex);
      }
      return newFlagged;
    });
  };

  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    // In a real app, this would submit answers to the backend
    console.log("Exam submitted with answers:", selectedAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  if (isExamSubmitted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-quest-primary">Exam Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-quest-primary">{score}%</div>
            <p className="text-lg text-muted-foreground">
              You answered {Object.keys(selectedAnswers).filter(key => 
                selectedAnswers[parseInt(key)] === examQuestions[parseInt(key)].correctAnswer
              ).length} out of {totalQuestions} questions correctly.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/exams")}>
                Back to Exams
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retake Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with timer and progress */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/exams")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit Exam
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-quest-primary font-semibold">
              <Clock className="h-5 w-5" />
              {formatTime(timeRemaining)}
            </div>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1}
              </CardTitle>
              <Button
                variant={flaggedQuestions.has(currentQuestionIndex) ? "default" : "outline"}
                size="sm"
                onClick={handleFlagQuestion}
                className="flex items-center gap-2"
              >
                <Flag className="h-4 w-4" />
                {flaggedQuestions.has(currentQuestionIndex) ? "Flagged" : "Flag"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg">{currentQuestion.question}</p>
            
            <RadioGroup
              value={selectedAnswers[currentQuestionIndex]?.toString()}
              onValueChange={(value) => handleSelectAnswer(parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {String.fromCharCode(65 + index)}. {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
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

          <div className="flex gap-2">
            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button
                onClick={handleSubmitExam}
                className="flex items-center gap-2 bg-quest-primary hover:bg-quest-primary/90"
              >
                <CheckCircle className="h-4 w-4" />
                Submit Exam
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Question navigation grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Question Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {examQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestionIndex === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`relative ${
                    selectedAnswers[index] !== undefined ? "bg-green-100 border-green-300" : ""
                  } ${flaggedQuestions.has(index) ? "bg-yellow-100 border-yellow-300" : ""}`}
                >
                  {index + 1}
                  {flaggedQuestions.has(index) && (
                    <Flag className="h-3 w-3 absolute -top-1 -right-1 text-yellow-600" />
                  )}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                Answered
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                Flagged
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                Not Answered
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamPage;
