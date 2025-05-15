
import React from "react";
import { CheckCircle, Circle, BookOpen, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { SubTopic } from "@/data/models";

interface SubTopicCardProps {
  subTopic: SubTopic;
  subjectId: string;
  topicId: string;
}

const SubTopicCard: React.FC<SubTopicCardProps> = ({
  subTopic,
  subjectId,
  topicId,
}) => {
  const { completedLessons, completedQuizzes } = useProgress();
  
  const lessonId = `${subjectId}-${topicId}-${subTopic.id}`;
  const quizId = `${lessonId}-quiz`;
  
  const lessonCompleted = completedLessons.includes(lessonId);
  const quizCompleted = completedQuizzes[quizId] !== undefined;
  const quizScore = completedQuizzes[quizId] || 0;
  
  return (
    <div className="quest-card flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{subTopic.name}</h3>
        {lessonCompleted && quizCompleted ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <Circle className="text-muted" size={20} />
        )}
      </div>
      
      <p className="text-sm text-muted-foreground">{subTopic.description}</p>
      
      <div className="flex flex-col gap-2 mt-auto">
        <Link
          to={`/learn/${subjectId}/${topicId}/${subTopic.id}`}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
        >
          <BookOpen size={18} className="text-quest-primary" />
          <span className="text-sm">
            {lessonCompleted ? "Review Lesson" : "Start Lesson"}
          </span>
          {lessonCompleted && <CheckCircle size={16} className="text-green-500 ml-auto" />}
        </Link>
        
        <Link
          to={`/quiz/${subjectId}/${topicId}/${subTopic.id}`}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
        >
          <PenSquare size={18} className="text-quest-orange" />
          <span className="text-sm">
            {quizCompleted ? "Retake Quiz" : "Take Quiz"}
          </span>
          {quizCompleted && (
            <span className="ml-auto text-xs py-1 px-2 bg-green-100 text-green-800 rounded-full">
              {quizScore}%
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SubTopicCard;
