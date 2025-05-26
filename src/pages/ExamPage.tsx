
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, ArrowLeft, ArrowRight, Flag, CheckCircle, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExamQuestion, SubQuestion } from "@/data/examModels";

// Sample exam questions with different types and diagrams
const examQuestions: ExamQuestion[] = [
  {
    id: "q1",
    questionText: "Study the circuit diagram below and answer the questions that follow:",
    diagram: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    type: "mcq",
    marks: 10,
    subQuestions: [
      {
        id: "q1a",
        questionText: "What is the total resistance in the circuit?",
        type: "mcq",
        marks: 3,
        options: ["10Ω", "20Ω", "30Ω", "40Ω"],
        correctAnswer: 1
      },
      {
        id: "q1b", 
        questionText: "Calculate the current flowing through resistor R2.",
        type: "short-answer",
        marks: 4,
        correctAnswer: "0.5A"
      },
      {
        id: "q1c",
        questionText: "Explain why the voltage across parallel resistors is the same.",
        type: "essay",
        marks: 3,
        correctAnswer: "In parallel circuits, all components share the same two connection points, so they experience the same potential difference."
      }
    ]
  },
  {
    id: "q2",
    questionText: "Solve the quadratic equation: x² - 5x + 6 = 0",
    type: "calculation",
    marks: 8,
    subQuestions: [
      {
        id: "q2a",
        questionText: "Use the factoring method to solve the equation.",
        type: "short-answer",
        marks: 4,
        correctAnswer: "x = 2 or x = 3"
      },
      {
        id: "q2b",
        questionText: "Verify your answer by substitution.",
        type: "calculation",
        marks: 4,
        correctAnswer: "Substituting x=2: 4-10+6=0 ✓, Substituting x=3: 9-15+6=0 ✓"
      }
    ]
  },
  {
    id: "q3",
    questionText: "The graph below shows the motion of an object:",
    diagram: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
    type: "mcq", 
    marks: 12,
    subQuestions: [
      {
        id: "q3a",
        questionText: "What type of motion is represented in section A-B?",
        type: "mcq",
        marks: 2,
        options: ["Uniform motion", "Accelerated motion", "Decelerated motion", "No motion"],
        correctAnswer: 0
      },
      {
        id: "q3b",
        questionText: "Calculate the acceleration in section B-C.",
        type: "calculation",
        marks: 5,
        correctAnswer: "2 m/s²"
      },
      {
        id: "q3c",
        questionText: "The object is moving at constant velocity in section A-B.",
        type: "true-false",
        marks: 2,
        correctAnswer: true
      },
      {
        id: "q3d",
        questionText: "Describe the physical meaning of the area under the velocity-time graph.",
        type: "essay",
        marks: 3,
        correctAnswer: "The area under a velocity-time graph represents the displacement or distance traveled by the object."
      }
    ]
  }
];

const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(180 * 60);
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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
    console.log("Exam submitted with answers:", selectedAnswers);
  };

  const renderQuestionInput = (subQuestion: SubQuestion) => {
    const answerId = subQuestion.id;
    
    switch (subQuestion.type) {
      case 'mcq':
        return (
          <RadioGroup
            value={selectedAnswers[answerId]?.toString()}
            onValueChange={(value) => handleAnswerChange(answerId, parseInt(value))}
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
            onValueChange={(value) => handleAnswerChange(answerId, value === 'true')}
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
            onChange={(e) => handleAnswerChange(answerId, e.target.value)}
            className="mt-3"
          />
        );
      
      case 'essay':
        return (
          <Textarea
            placeholder="Write your answer here..."
            value={selectedAnswers[answerId] || ''}
            onChange={(e) => handleAnswerChange(answerId, e.target.value)}
            className="mt-3 min-h-[100px]"
          />
        );
      
      default:
        return null;
    }
  };

  if (isExamSubmitted) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-quest-primary">Exam Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-quest-primary">100%</div>
            <p className="text-lg text-muted-foreground">
              Your exam has been submitted successfully. Results will be available shortly.
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
        <div className="flex items-center justify-between max-w-6xl mx-auto">
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
        
        <div className="max-w-6xl mx-auto mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1} ({currentQuestion.marks} marks)
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
            <div className="text-lg font-medium">{currentQuestion.questionText}</div>
            
            {/* Diagram */}
            {currentQuestion.diagram && (
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Image className="h-5 w-5 text-quest-primary" />
                  <span className="text-sm font-medium">Diagram</span>
                </div>
                <img 
                  src={currentQuestion.diagram} 
                  alt="Question diagram"
                  className="w-full max-w-md mx-auto rounded border"
                />
              </div>
            )}
            
            {/* Sub-questions */}
            {currentQuestion.subQuestions && (
              <div className="space-y-6">
                {currentQuestion.subQuestions.map((subQuestion, index) => (
                  <div key={subQuestion.id} className="border-l-4 border-quest-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">
                        {currentQuestionIndex + 1}.{index + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({subQuestion.marks} marks)
                      </span>
                    </div>
                    <div className="mb-3">{subQuestion.questionText}</div>
                    {renderQuestionInput(subQuestion)}
                  </div>
                ))}
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
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {examQuestions.map((_, index) => {
                const hasAnswers = examQuestions[index].subQuestions?.some(sq => 
                  selectedAnswers[sq.id] !== undefined && selectedAnswers[sq.id] !== ''
                ) || false;
                
                return (
                  <Button
                    key={index}
                    variant={currentQuestionIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`relative ${
                      hasAnswers ? "bg-green-100 border-green-300" : ""
                    } ${flaggedQuestions.has(index) ? "bg-yellow-100 border-yellow-300" : ""}`}
                  >
                    {index + 1}
                    {flaggedQuestions.has(index) && (
                      <Flag className="h-3 w-3 absolute -top-1 -right-1 text-yellow-600" />
                    )}
                  </Button>
                );
              })}
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
