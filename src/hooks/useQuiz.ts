
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { getSubjectById, getTopicById, getSubTopicById } from "@/data/curriculum";
import { Question } from "@/data/models";

export const useQuiz = () => {
  const { subjectId, topicId, subtopicId } = useParams<{
    subjectId: string;
    topicId: string;
    subtopicId: string;
  }>();
  const navigate = useNavigate();
  const { updateProgress } = useProgress();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Get quiz data
  const subject = getSubjectById(subjectId || "");
  const topic = getTopicById(subject?.id || "", topicId || "");
  const subtopic = getSubTopicById(
    subject?.id || "",
    topic?.id || "",
    subtopicId || ""
  );

  const questions = subtopic?.quiz?.questions || [];

  const currentQuestion: Question | undefined = questions[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setIsAnswerSubmitted(true);

    if (selectedAnswer === currentQuestion?.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = (correctAnswers: number, totalQuestions: number): number => {
    // Prevent division by zero
    if (totalQuestions === 0) return 0;
    // Ensure both values are numbers and calculate percentage
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const score = calculateScore(correctAnswers, questions.length);

  useEffect(() => {
    if (quizCompleted && subject && topic && subtopic) {
      const quizId = `${subject.id}-${topic.id}-${subtopic.id}-quiz`;
      // Use updateProgress instead of markQuizCompleted since that's what's available in the context
      updateProgress({
        type: 'quiz_completed',
        id: quizId,
        score: score
      });
    }
  }, [quizCompleted, subject, topic, subtopic, updateProgress, score]);

  const handleReturnToCurriculum = () => {
    navigate(`/curriculum?subject=${subjectId}&topic=${topicId}`);
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: questions.length,
    selectedAnswer,
    isAnswerSubmitted,
    quizCompleted,
    correctAnswers,
    score,
    handleSelectAnswer,
    handleSubmitAnswer,
    handleNextQuestion,
    handleReturnToCurriculum,
    subject,
    topic,
    subtopic,
  };
};
