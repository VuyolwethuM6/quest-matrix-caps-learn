
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Question, Quiz } from "@/data/models";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";
import QuizHeader from "@/components/quiz/QuizHeader";
import { useQuiz } from "@/hooks/useQuiz";

const QuizPage: React.FC = () => {
  const { subjectId = "", topicId = "", subtopicId = "" } = useParams();
  const navigate = useNavigate();
  
  const {
    quiz,
    quizProgress,
    currentQuestionIndex,
    currentQuestion,
    userAnswers,
    answerState,
    score,
    correctAnswers,
    handleAnswer,
    handleNextQuestion,
    startQuiz,
    resetQuiz,
    setQuizProgress
  } = useQuiz(subjectId, topicId, subtopicId);

  const handleHeaderNavigation = (e: React.MouseEvent) => {
    if (quizProgress !== 'intro') {
      e.preventDefault();
      if (quizProgress === 'results') {
        navigate(`/curriculum?subject=${subjectId}&topic=${topicId}`);
      } else {
        setQuizProgress('intro');
      }
    }
  };

  const handleContinueLearning = () => {
    navigate(`/curriculum?subject=${subjectId}&topic=${topicId}`);
  };
  
  // If quiz is not found
  if (!quiz) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Quiz not found</p>
        <Link to="/curriculum">
          <Button>Return to Curriculum</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <QuizHeader 
        title={quiz.title}
        showResults={quizProgress === 'results'}
        onNavigateBack={handleHeaderNavigation}
        navigationLink={quizProgress === 'intro' ? `/curriculum?subject=${subjectId}&topic=${topicId}` : '#'}
      />
      
      {/* Quiz Content */}
      {quizProgress === 'intro' && (
        <QuizIntro 
          quiz={quiz}
          subjectId={subjectId}
          topicId={topicId}
          onStartQuiz={startQuiz}
        />
      )}

      {quizProgress === 'question' && currentQuestion && (
        <QuizQuestion
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
          userAnswer={userAnswers[currentQuestionIndex]}
          answerState={answerState}
          onAnswerSelect={handleAnswer}
          onNextQuestion={handleNextQuestion}
        />
      )}

      {quizProgress === 'results' && (
        <QuizResults
          score={score}
          correctAnswers={correctAnswers}
          totalQuestions={quiz.questions.length}
          onRetakeQuiz={resetQuiz}
          onContinueLearning={handleContinueLearning}
        />
      )}
    </div>
  );
};

export default QuizPage;
