
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExamQuestion } from "@/data/examModels";
import ExamHeader from "@/components/exam/ExamHeader";
import ExamQuestionComponent from "@/components/exam/ExamQuestion";
import QuestionNavigation from "@/components/exam/QuestionNavigation";

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
    questionText: "Solve the quadratic equation: $$x^2 - 5x + 6 = 0$$",
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
      <ExamHeader
        timeRemaining={timeRemaining}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      {/* Question content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <ExamQuestionComponent
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
          onAnswerChange={handleAnswerChange}
          onFlagToggle={handleFlagQuestion}
        />

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

        <QuestionNavigation
          examQuestions={examQuestions}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
          onQuestionSelect={setCurrentQuestionIndex}
        />
      </div>
    </div>
  );
};

export default ExamPage;
