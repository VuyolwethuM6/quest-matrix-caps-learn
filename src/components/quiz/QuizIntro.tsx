import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Award, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizIntroProps {
  quiz: {
    title: string;
    description: string;
    questions: any[];
  };
  subjectId: string;
  topicId: string;
  onStartQuiz: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ quiz, subjectId, topicId, onStartQuiz }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-quest-primary to-quest-purple bg-clip-text text-transparent">
          {quiz?.title}
        </h1>
        <p className="text-muted-foreground text-lg">{quiz?.description}</p>
      </div>
      
      <Card className="mb-8 border-2 border-quest-primary/10">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-quest-primary/10 flex items-center justify-center">
                <BookOpen className="text-quest-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-semibold">{quiz?.questions.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-quest-orange/10 flex items-center justify-center">
                <Clock className="text-quest-orange" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-semibold">~{Math.ceil(quiz?.questions.length * 1.5)} mins</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-quest-purple/10 flex items-center justify-center">
                <Award className="text-quest-purple" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Passing Score</p>
                <p className="font-semibold">70%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 text-lg">What to expect:</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Multiple Choice Questions</p>
                <p className="text-sm text-muted-foreground">Test your understanding with carefully crafted questions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Immediate Feedback</p>
                <p className="text-sm text-muted-foreground">Get instant feedback after each question</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Detailed Explanations</p>
                <p className="text-sm text-muted-foreground">Learn from comprehensive explanations for each answer</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to={`/curriculum?subject=${subjectId}&topic=${topicId}`} className="flex-1">
          <Button variant="outline" className="w-full h-12 text-base">
            Go Back
          </Button>
        </Link>
        <Button 
          onClick={onStartQuiz} 
          className="flex-1 h-12 text-base bg-gradient-to-r from-quest-primary to-quest-purple hover:from-quest-primary/90 hover:to-quest-purple/90 text-white"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizIntro;
