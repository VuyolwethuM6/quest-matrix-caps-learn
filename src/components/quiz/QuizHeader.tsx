
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface QuizHeaderProps {
  title: string;
  showResults: boolean;
  onNavigateBack: (e: React.MouseEvent) => void;
  navigationLink: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  showResults,
  onNavigateBack,
  navigationLink
}) => {
  return (
    <div className="bg-background border-b">
      <div className="p-4 flex items-center">
        <Link 
          to={navigationLink} 
          onClick={onNavigateBack}
          className="p-2 rounded-full hover:bg-muted"
        >
          <ChevronLeft size={20} />
        </Link>
        <h1 className="ml-2 font-bold">
          {showResults ? 'Quiz Results' : title}
        </h1>
      </div>
    </div>
  );
};

export default QuizHeader;
