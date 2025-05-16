
import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { Topic } from "@/data/models";
import { Card } from "@/components/ui/card";

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
    <Card className="p-4 hover:border-quest-primary group transition-all shadow-sm hover:shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold group-hover:text-quest-primary">{topic.name}</h3>
          <p className="text-sm text-muted-foreground">{topic.description}</p>
        </div>
        <Link to={`/curriculum?subject=${subjectId}&topic=${topic.id}`}>
          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-quest-primary/10 group-hover:text-quest-primary transition-all">
            <ChevronRight className="h-5 w-5" />
          </div>
        </Link>
      </div>
      
      <div className="mt-4">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-quest-primary transition-all"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-xs text-right mt-1 text-muted-foreground">
          {completionPercentage}% complete
        </p>
      </div>
    </Card>
  );
};

export default TopicCard;
