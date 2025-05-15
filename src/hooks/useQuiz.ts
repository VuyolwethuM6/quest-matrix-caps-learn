
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/contexts/ProgressContext";
import { subjects } from "@/data/curriculum";
import { Quiz, Question, SubTopic } from "@/data/models";

type QuizProgress = 'intro' | 'question' | 'results';
type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export const useQuiz = (subjectId: string, topicId: string, subtopicId: string) => {
  const { toast } = useToast();
  const { completeQuiz } = useProgress();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizProgress, setQuizProgress] = useState<QuizProgress>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | number | boolean | null)[]>([]);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);

  // Find the quiz for this subtopic
  useEffect(() => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      const topic = subject.topics.find(t => t.id === topicId);
      if (topic) {
        const subTopic = topic.subTopics.find(st => st.id === subtopicId) as SubTopic;
        if (subTopic && subTopic.quiz) {
          setQuiz(subTopic.quiz);
          // Initialize user answers array
          setUserAnswers(new Array(subTopic.quiz.questions.length).fill(null));
        }
      }
    }
  }, [subjectId, topicId, subtopicId]);
  
  const currentQuestion = quiz?.questions[currentQuestionIndex];
  
  const handleAnswer = (answer: string | number | boolean) => {
    if (answerState !== 'unanswered' || !currentQuestion) return;
    
    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);
    
    // Check if answer is correct
    const isCorrect = answer === currentQuestion.correctAnswer;
    setAnswerState(isCorrect ? 'correct' : 'incorrect');
  };
  
  const handleNextQuestion = () => {
    if (!quiz) return;
    
    setAnswerState('unanswered');
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score - ensure we're using numbers for the calculation
      const correctAnswers = userAnswers.reduce((count: number, answer, index) => {
        if (quiz.questions[index]) {
          return String(answer) === String(quiz.questions[index].correctAnswer) ? count + 1 : count;
        }
        return count;
      }, 0);
      
      // Make sure both parts of the division are numbers
      const totalQuestions = quiz.questions.length;
      const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
      setScore(finalScore);
      
      // Save quiz completion
      const quizId = `${subjectId}-${topicId}-${subtopicId}-quiz`;
      completeQuiz(quizId, finalScore);
      
      // Show results
      setQuizProgress('results');
    }
  };
  
  const startQuiz = () => {
    setQuizProgress('question');
  };

  const resetQuiz = () => {
    setQuizProgress('intro');
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quiz?.questions.length || 0).fill(null));
    setAnswerState('unanswered');
  };

  // Calculate correct answers for results display
  const correctAnswers = userAnswers.reduce((count: number, answer, index) => {
    if (quiz && quiz.questions[index]) {
      return String(answer) === String(quiz.questions[index].correctAnswer) ? count + 1 : count;
    }
    return count;
  }, 0);

  return {
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
  };
};
