
import React from "react";
import { CheckCircle, Circle, BookOpen, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { SubTopic } from "@/data/models";
import { Card } from "@/components/ui/card";

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
    <Card className="p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{subTopic.name}</h3>
        {lessonCompleted && quizCompleted ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <Circle className="text-muted-foreground" size={20} />
        )}
      </div>
      
      <p className="text-sm text-muted-foreground">{subTopic.description}</p>
      
      <div className="flex flex-col gap-2 mt-auto">
        <Link
          to={`/learn/${subjectId}/${topicId}/${subTopic.id}`}
          className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-quest-primary/10 flex items-center justify-center">
            <BookOpen size={16} className="text-quest-primary" />
          </div>
          <span className="font-medium">
            {lessonCompleted ? "Review Lesson" : "Start Lesson"}
          </span>
          {lessonCompleted && <CheckCircle size={16} className="text-green-500 ml-auto" />}
        </Link>
        
        <Link
          to={`/quiz/${subjectId}/${topicId}/${subTopic.id}`}
          className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-quest-orange/10 flex items-center justify-center">
            <PenSquare size={16} className="text-quest-orange" />
          </div>
          <span className="font-medium">
            {quizCompleted ? "Retake Quiz" : "Take Quiz"}
          </span>
          {quizCompleted && (
            <span className="ml-auto text-xs py-1 px-2 bg-green-100 text-green-800 rounded-full">
              {quizScore}%
            </span>
          )}
        </Link>
      </div>
    </Card>
  );
};

export default SubTopicCard;
