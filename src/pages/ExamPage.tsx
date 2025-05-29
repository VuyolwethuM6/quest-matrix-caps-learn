import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExamQuestion } from "@/data/examModels";
import ExamHeader from "@/components/exam/ExamHeader";
import ExamQuestionComponent from "@/components/exam/ExamQuestion";
import QuestionNavigation from "@/components/exam/QuestionNavigation";
import ExamResults from "@/components/exam/ExamResults";
import { exams } from "@/data/examData";

const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(180 * 60);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [examStartTime, setExamStartTime] = useState<number>(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Find the current exam
  const currentExam = exams.find(exam => exam.id === examId);
  
  if (!currentExam) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Exam Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The exam you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/exams")}>
              Back to Exams
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = currentExam.questions[currentQuestionIndex];
  const totalQuestions = currentExam.questions.length;

  // Initialize exam start time and duration when component mounts
  useEffect(() => {
    setExamStartTime(Date.now());
    setTimeRemaining(currentExam.duration * 60);
  }, [currentExam.duration]);

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

  const calculateScore = () => {
    let totalCorrect = 0;
    let totalMarks = 0;

    currentExam.questions.forEach(question => {
      if (question.subQuestions) {
        question.subQuestions.forEach(subQuestion => {
          totalMarks += subQuestion.marks;
          const userAnswer = selectedAnswers[subQuestion.id];
          if (userAnswer === subQuestion.correctAnswer) {
            totalCorrect += subQuestion.marks;
          }
        });
      } else {
        totalMarks += question.marks;
        const userAnswer = selectedAnswers[question.id];
        if (userAnswer === question.correctAnswer) {
          totalCorrect += question.marks;
        }
      }
    });

    const score = Math.round((totalCorrect / totalMarks) * 100);
    setExamScore(score);
    setCorrectAnswers(totalCorrect);
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
    calculateScore();
    setShowResults(true);
    setIsExamSubmitted(true);
  };

  const handleReviewAnswers = () => {
    setShowResults(false);
    setIsReviewMode(true);
  };

  const handleRetakeExam = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(currentExam.duration * 60);
    setExamStartTime(Date.now());
    setShowResults(false);
    setIsExamSubmitted(false);
    setIsReviewMode(false);
    setExamScore(0);
    setCorrectAnswers(0);
  };

  if (isExamSubmitted && showResults) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <ExamResults
          score={examScore}
          correctAnswers={correctAnswers}
          totalQuestions={currentExam.questions.length}
          timeTaken={Math.floor((Date.now() - examStartTime) / 1000)}
          examQuestions={currentExam.questions}
          userAnswers={selectedAnswers}
          onRetakeExam={handleRetakeExam}
          onReviewAnswers={handleReviewAnswers}
        />
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
          isReviewMode={isReviewMode}
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
          examQuestions={currentExam.questions}
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
