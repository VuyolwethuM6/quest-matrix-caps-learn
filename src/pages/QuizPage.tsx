
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import NavBar from "@/components/NavBar";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";
import QuizHeader from "@/components/quiz/QuizHeader";
import { Button } from "@/components/ui/button";
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
    resetQuiz
  } = useQuiz(subjectId, topicId, subtopicId);
  
  if (!quiz) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Quiz not found</p>
        <Button onClick={() => navigate(`/learn/${subjectId}/${topicId}/${subtopicId}`)}>
          Return to Lesson
        </Button>
      </div>
    );
  }
  
  // Go back to the lesson page
  const handleBack = () => {
    navigate(`/learn/${subjectId}/${topicId}/${subtopicId}`);
  };
  
  // Retry the quiz
  const handleRetry = () => {
    resetQuiz();
  };
  
  // Render the quiz content based on the current progress stage
  const renderQuizContent = () => {
    switch (quizProgress) {
      case 'intro':
        return (
          <QuizIntro 
            quiz={quiz}
            onStart={startQuiz}
            onBack={handleBack}
          />
        );
      
      case 'question':
        if (!currentQuestion) return null;
        
        return (
          <QuizQuestion
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quiz.questions.length}
            userAnswer={userAnswers[currentQuestionIndex]}
            answerState={answerState}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        );
      
      case 'results':
        return (
          <QuizResults
            score={Number(score)}
            correctAnswers={correctAnswers}
            totalQuestions={quiz.questions.length}
            onRetry={handleRetry}
            onBack={handleBack}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <QuizHeader 
        title={quiz.title}
        onBack={quizProgress === 'intro' ? handleBack : undefined}
      />
      
      <div className="p-6">
        {renderQuizContent()}
      </div>
      
      <NavBar />
    </div>
  );
};

export default QuizPage;
