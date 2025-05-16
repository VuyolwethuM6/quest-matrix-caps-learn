import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useQuiz } from "@/hooks/useQuiz";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/hooks/use-toast";
import { BookOpenCheck, BookOpen, XCircle } from "lucide-react";
import { questions } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import NavBar from "@/components/NavBar";

interface RouteParams {
  subjectId: string;
  topicId: string;
  subtopicId: string;
}

const QuizPage: React.FC = () => {
  const { subjectId, topicId, subtopicId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const lessonId = `${subjectId}-${topicId}-${subtopicId}`;
  const quizId = `${lessonId}-quiz`;
  
  const {
    currentQuestionIndex,
    selectedAnswer,
    score,
    question,
    options,
    handleAnswerSelection,
    handleNextQuestion,
    resetQuiz,
    isQuizFinished,
  } = useQuiz(subjectId!, topicId!, subtopicId!);
  
  const { markQuizCompleted } = useProgress();
  
  useEffect(() => {
    if (isQuizFinished) {
      markQuizCompleted(quizId, score);
      
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}% on the quiz.`,
      });
    }
  }, [isQuizFinished, markQuizCompleted, quizId, score, toast]);
  
  if (!question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading Quiz...</CardTitle>
            <CardDescription>Please wait, fetching quiz questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={0} />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Quiz Time!</h1>
        <p className="opacity-90">Test your knowledge on this lesson.</p>
      </div>
      
      <div className="container mx-auto mt-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Question {currentQuestionIndex + 1}
            </CardTitle>
            <CardDescription>
              Answer the question below to the best of your ability.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-lg">{question}</p>
            
            <div className="grid gap-2">
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`justify-start ${selectedAnswer === option ? 'bg-quest-primary/10 text-quest-primary' : ''}`}
                  onClick={() => handleAnswerSelection(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(`/learn/${subjectId}/${topicId}/${subtopicId}`)}
            >
              <BookOpen className="mr-2" size={16} />
              Back to Lesson
            </Button>
            
            {isQuizFinished ? (
              <QuizResults score={Number(score)} onRestart={resetQuiz} lessonId={lessonId} />
            ) : (
              <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                Next Question
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <NavBar />
    </div>
  );
};

interface QuizResultsProps {
  score: number;
  onRestart: () => void;
  lessonId: string;
}

const QuizResults: React.FC<QuizResultsProps> = ({ score, onRestart, lessonId }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Results</h2>
      <p className="text-lg mb-4">
        You scored {score}% on the quiz!
      </p>
      
      <div className="flex justify-center gap-4">
        <Button onClick={onRestart}>
          <XCircle className="mr-2" size={16} />
          Retake Quiz
        </Button>
        <Button onClick={() => navigate(`/learn/${lessonId.split('-').slice(0, 3).join('/')}`)}>
          <BookOpenCheck className="mr-2" size={16} />
          Back to Lesson
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;
