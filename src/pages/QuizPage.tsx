import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/hooks/use-toast";
import { getSubjectById, getTopicById, getSubTopicById } from "@/data/curriculum";
import { Question } from "@/data/models";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

const QuizPage: React.FC = () => {
  const { subjectId, topicId, subtopicId } = useParams<{
    subjectId: string;
    topicId: string;
    subtopicId: string;
  }>();
  const navigate = useNavigate();
  const { completeQuiz } = useProgress();
  const { toast } = useToast();

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | number | boolean | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | number | boolean | null)[]>([]);

  // Get quiz data
  const subject = getSubjectById(subjectId || "");
  const topic = getTopicById(subject?.id || "", topicId || "");
  const subtopic = getSubTopicById(subject?.id || "", topic?.id || "", subtopicId || "");
  const quiz = subtopic?.quiz;

  useEffect(() => {
    if (showResults && subject && topic && subtopic) {
      const score = Math.round((correctAnswers / (quiz?.questions.length || 1)) * 100);
      const quizId = `${subject.id}-${topic.id}-${subtopic.id}-quiz`;
      
      toast({
        title: "Quiz Completed",
        description: `You scored ${score}% on the quiz.`,
        duration: 3000,
        className: "bg-quest-softPurple/20 border-quest-primary",
        style: {
          background: "rgba(155, 135, 245, 0.1)",
          borderColor: "var(--quest-primary)",
          color: "var(--quest-primary)",
          backdropFilter: "blur(8px)",
        },
      });
      
      completeQuiz(quizId, score);
    }
  }, [showResults]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setStartTime(Date.now());
    setUserAnswers(new Array(quiz?.questions.length).fill(null));
  };

  const handleAnswerSelect = (answer: string | number | boolean) => {
    if (answerState === 'unanswered') {
      setUserAnswer(answer);
      const currentQuestion = quiz?.questions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion?.correctAnswer;
      
      setAnswerState(isCorrect ? 'correct' : 'incorrect');
      
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }

      // Update userAnswers array
      setUserAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex] = answer;
        return newAnswers;
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer(null);
      setAnswerState('unanswered');
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setUserAnswer(null);
    setAnswerState('unanswered');
    setCorrectAnswers(0);
    setShowResults(false);
    setStartTime(null);
    setUserAnswers([]);
  };

  const handleContinue = () => {
    navigate(`/curriculum?subject=${subjectId}&topic=${topicId}`);
  };

  const handleNavigateBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showResults || !quizStarted) {
      navigate(`/curriculum?subject=${subjectId}&topic=${topicId}`);
    } else {
      setQuizStarted(false);
      setCurrentQuestionIndex(0);
      setUserAnswer(null);
      setAnswerState('unanswered');
      setCorrectAnswers(0);
      setShowResults(false);
      setStartTime(null);
      setUserAnswers([]);
    }
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Quiz not found</h2>
          <p className="text-muted-foreground">The requested quiz could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader
        title={quiz.title}
        showResults={showResults}
        onNavigateBack={handleNavigateBack}
        navigationLink={`/curriculum?subject=${subjectId}&topic=${topicId}`}
      />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {!quizStarted && !showResults && (
            <QuizIntro
              quiz={quiz}
              subjectId={subjectId || ""}
              topicId={topicId || ""}
              onStartQuiz={handleStartQuiz}
            />
          )}
          
          {quizStarted && !showResults && (
            <QuizQuestion
              currentQuestion={quiz.questions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={quiz.questions.length}
              userAnswer={userAnswer}
              answerState={answerState}
              onAnswerSelect={handleAnswerSelect}
              onNextQuestion={handleNextQuestion}
            />
          )}
          
          {showResults && (
            <QuizResults
              score={correctAnswers}
              totalQuestions={quiz.questions.length}
              timeTaken={startTime ? Math.floor((Date.now() - startTime) / 1000) : 0}
              onRetry={handleRetry}
              onContinue={handleContinue}
              questions={quiz.questions}
              userAnswers={userAnswers}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
