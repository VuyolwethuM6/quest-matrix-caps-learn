import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/contexts/ProgressContext";
import { subjects } from "@/data/curriculum";
import { Question, Quiz, SubTopic } from "@/data/models";
import MathDisplay from "@/components/MathDisplay";

type QuizProgress = 'intro' | 'question' | 'results';
type AnswerState = 'unanswered' | 'correct' | 'incorrect';

const QuizPage: React.FC = () => {
  const { subjectId = "", topicId = "", subtopicId = "" } = useParams();
  const navigate = useNavigate();
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
      // Calculate final score
      const correctAnswers = userAnswers.reduce((count: number, answer, index) => {
        // Convert to string for comparison when needed to avoid type mismatch
        return String(answer) === String(quiz.questions[index].correctAnswer) ? count + 1 : count;
      }, 0);
      
      const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
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
  
  const renderQuizIntro = () => (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-2">{quiz?.title}</h1>
      <p className="text-muted-foreground mb-6">{quiz?.description}</p>
      
      <div className="bg-muted p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Quiz Information:</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>{quiz?.questions.length} questions</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Multiple choice and true/false questions</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Immediate feedback after each question</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-auto flex gap-4">
        <Link to={`/curriculum?subject=${subjectId}&topic=${topicId}`} className="flex-1">
          <Button variant="outline" className="w-full">Go Back</Button>
        </Link>
        <Button 
          onClick={startQuiz} 
          className="flex-1 bg-quest-primary hover:bg-quest-secondary"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
  
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-medium">Question {currentQuestionIndex + 1}/{quiz?.questions.length}</h2>
          <div className="px-3 py-1 bg-quest-softPurple text-quest-primary rounded-full text-sm">
            {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'True or False'}
          </div>
        </div>
        
        <MathDisplay content={currentQuestion.text} className="text-lg font-medium mb-6" />
        
        {answerState !== 'unanswered' && (
          <div className={`p-4 rounded-lg mb-6 ${
            answerState === 'correct' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {answerState === 'correct' ? (
                <>
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="font-medium text-green-600">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle size={18} className="text-red-600" />
                  <span className="font-medium text-red-600">Incorrect</span>
                </>
              )}
            </div>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
        
        {currentQuestion.type === 'mcq' && (
          <RadioGroup
            value={userAnswers[currentQuestionIndex]?.toString() ?? ""}
            className="space-y-3"
            disabled={answerState !== 'unanswered'}
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  onClick={() => handleAnswer(index)}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="text-base cursor-pointer py-2"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {currentQuestion.type === 'true-false' && (
          <RadioGroup
            value={userAnswers[currentQuestionIndex]?.toString() ?? ""}
            className="space-y-3"
            disabled={answerState !== 'unanswered'}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="true"
                id="option-true"
                onClick={() => handleAnswer(true)}
              />
              <Label
                htmlFor="option-true"
                className="text-base cursor-pointer py-2"
              >
                True
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="false"
                id="option-false"
                onClick={() => handleAnswer(false)}
              />
              <Label
                htmlFor="option-false"
                className="text-base cursor-pointer py-2"
              >
                False
              </Label>
            </div>
          </RadioGroup>
        )}
        
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleNextQuestion}
            disabled={answerState === 'unanswered'}
            className="bg-quest-primary hover:bg-quest-secondary"
          >
            {currentQuestionIndex < (quiz?.questions.length || 0) - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </div>
      </div>
    );
  };
  
  const renderResults = () => {
    const correctAnswers = userAnswers.reduce((count: number, answer, index) => {
      // Convert to string for comparison when needed to avoid type mismatch
      return quiz && String(answer) === String(quiz.questions[index].correctAnswer) ? count + 1 : count;
    }, 0);
    
    const totalQuestions = quiz?.questions.length || 0;
    
    return (
      <div className="p-6 flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-6">Quiz Results</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-quest-softPurple flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-quest-primary">{score}%</span>
            </div>
            
            <p className="font-medium text-lg mb-2">
              {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good job!' : 'Keep practicing!'}
            </p>
            
            <p className="text-muted-foreground mb-4">
              You got {correctAnswers} out of {totalQuestions} questions correct
            </p>
            
            {score >= 80 && (
              <div className="flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-full">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Topic Mastered</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-auto flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => {
              // Reset quiz state
              setQuizProgress('intro');
              setCurrentQuestionIndex(0);
              setUserAnswers(new Array(quiz?.questions.length || 0).fill(null));
              setAnswerState('unanswered');
            }}
            className="flex-1"
          >
            Retake Quiz
          </Button>
          
          <Button 
            onClick={() => navigate(`/curriculum?subject=${subjectId}&topic=${topicId}`)}
            className="flex-1 bg-quest-primary hover:bg-quest-secondary"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    );
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
      <div className="bg-background border-b">
        <div className="p-4 flex items-center">
          <Link 
            to={quizProgress === 'intro' ? `/curriculum?subject=${subjectId}&topic=${topicId}` : '#'} 
            onClick={(e) => {
              if (quizProgress !== 'intro') {
                e.preventDefault();
                if (quizProgress === 'results') {
                  navigate(`/curriculum?subject=${subjectId}&topic=${topicId}`);
                } else {
                  setQuizProgress('intro');
                }
              }
            }}
            className="p-2 rounded-full hover:bg-muted"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="ml-2 font-bold">
            {quizProgress === 'results' ? 'Quiz Results' : quiz.title}
          </h1>
        </div>
      </div>
      
      {/* Quiz Content */}
      {quizProgress === 'intro' && renderQuizIntro()}
      {quizProgress === 'question' && renderQuestion()}
      {quizProgress === 'results' && renderResults()}
    </div>
  );
};

export default QuizPage;
