
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/useQuiz";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/hooks/use-toast";
import { BookOpenCheck, BookOpen, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import NavBar from "@/components/NavBar";

const QuizPage: React.FC = () => {
  const { toast } = useToast();
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
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
  } = useQuiz();
  
  useEffect(() => {
    if (quizCompleted) {
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}% on the quiz.`,
      });
    }
  }, [quizCompleted, score, toast]);
  
  if (!currentQuestion) {
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
            <p className="text-lg">{currentQuestion.text}</p>
            
            <div className="grid gap-2">
              {currentQuestion.options && currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`justify-start ${selectedAnswer === option ? 'bg-quest-primary/10 text-quest-primary' : ''}`}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={isAnswerSubmitted}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="justify-between flex-wrap">
            <Button
              variant="ghost"
              onClick={handleReturnToCurriculum}
            >
              <BookOpen className="mr-2" size={16} />
              Back to Lesson
            </Button>
            
            {quizCompleted ? (
              <div className="text-center w-full mt-4">
                <h2 className="text-3xl font-bold mb-4">Results</h2>
                <p className="text-lg mb-4">
                  You scored {score}% on the quiz!
                </p>
                
                <div className="flex justify-center gap-4">
                  <Button onClick={() => window.location.reload()}>
                    <XCircle className="mr-2" size={16} />
                    Retake Quiz
                  </Button>
                  <Button onClick={handleReturnToCurriculum}>
                    <BookOpenCheck className="mr-2" size={16} />
                    Back to Lesson
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {isAnswerSubmitted ? (
                  <Button onClick={handleNextQuestion}>
                    Next Question
                  </Button>
                ) : (
                  <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                    Submit Answer
                  </Button>
                )}
              </>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <NavBar />
    </div>
  );
};

export default QuizPage;
