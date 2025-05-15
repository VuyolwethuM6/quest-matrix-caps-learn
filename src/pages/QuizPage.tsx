
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";
import QuizHeader from "@/components/quiz/QuizHeader";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/hooks/useQuiz";
import { useToast } from "@/hooks/use-toast";

const QuizPage: React.FC = () => {
  const { subjectId = "", topicId = "", subtopicId = "" } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    toast({
      title: "Quiz Reset",
      description: "Let's try again!"
    });
  };
  
  // Render the quiz content based on the current progress stage
  const renderQuizContent = () => {
    switch (quizProgress) {
      case 'intro':
        return (
          <QuizIntro 
            quiz={quiz}
            subjectId={subjectId}
            topicId={topicId}
            onStartQuiz={startQuiz}
          />
        );
      
      case 'question':
        if (!currentQuestion) return null;
        
        return (
          <QuizQuestion
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            userAnswer={userAnswers[currentQuestionIndex]}
            answerState={answerState}
            onAnswerSelect={handleAnswer}
            onNextQuestion={handleNextQuestion}
          />
        );
      
      case 'results':
        return (
          <QuizResults
            score={Number(score)}
            correctAnswers={correctAnswers}
            totalQuestions={quiz.questions.length}
            onRetakeQuiz={handleRetry}
            onContinueLearning={handleBack}
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
        showResults={quizProgress === 'results'}
        onNavigateBack={handleBack}
        navigationLink={`/learn/${subjectId}/${topicId}/${subtopicId}`}
      />
      
      <div className="p-6 max-w-3xl mx-auto">
        {renderQuizContent()}
      </div>
      
      <NavBar />
    </div>
  );
};

export default QuizPage;
