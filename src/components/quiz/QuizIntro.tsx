
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/data/models";

interface QuizIntroProps {
  quiz: Quiz;
  subjectId: string;
  topicId: string;
  onStartQuiz: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ quiz, subjectId, topicId, onStartQuiz }) => {
  return (
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
          onClick={onStartQuiz} 
          className="flex-1 bg-quest-primary hover:bg-quest-secondary"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizIntro;
