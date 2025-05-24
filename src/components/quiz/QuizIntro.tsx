
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
    <div className="bg-white rounded-xl p-8 shadow-sm border max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{quiz?.title}</h1>
      <p className="text-muted-foreground mb-8 text-center text-lg">{quiz?.description}</p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-semibold mb-4 text-lg">Quiz Information:</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
            <span className="text-base">{quiz?.questions.length} questions</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
            <span className="text-base">Multiple choice and true/false questions</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
            <span className="text-base">Immediate feedback after each question</span>
          </li>
        </ul>
      </div>
      
      <div className="flex gap-4">
        <Link to={`/curriculum?subject=${subjectId}&topic=${topicId}`} className="flex-1">
          <Button variant="outline" className="w-full h-12 text-base">
            Go Back
          </Button>
        </Link>
        <Button 
          onClick={onStartQuiz} 
          className="flex-1 h-12 text-base bg-blue-600 hover:bg-blue-700"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizIntro;
