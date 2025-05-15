
import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { Topic } from "@/data/models";

interface TopicCardProps {
  topic: Topic;
  subjectId: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, subjectId }) => {
  const { completedLessons, completedQuizzes } = useProgress();
  
  // Calculate completion percentage for this topic
  const totalSubTopics = topic.subTopics.length;
  let completedSubTopics = 0;
  
  topic.subTopics.forEach(subTopic => {
    const lessonId = `${subjectId}-${topic.id}-${subTopic.id}`;
    const quizId = `${lessonId}-quiz`;
    
    if (completedLessons.includes(lessonId) && completedQuizzes[quizId]) {
      completedSubTopics += 1;
    }
  });
  
  const completionPercentage = totalSubTopics > 0
    ? Math.round((completedSubTopics / totalSubTopics) * 100)
    : 0;
  
  return (
    <Link
      to={`/curriculum?subject=${subjectId}&topic=${topic.id}`}
      className="quest-card hover:border-quest-primary group"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold group-hover:text-quest-primary">{topic.name}</h3>
          <p className="text-sm text-muted-foreground">{topic.description}</p>
        </div>
        <ChevronRight className="text-muted-foreground group-hover:text-quest-primary transition-transform group-hover:translate-x-1" />
      </div>
      
      <div className="mt-4">
        <div className="quest-progress-bar">
          <div
            className="quest-progress-value"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-xs text-right mt-1 text-muted-foreground">
          {completionPercentage}% complete
        </p>
      </div>
    </Link>
  );
};

export default TopicCard;
