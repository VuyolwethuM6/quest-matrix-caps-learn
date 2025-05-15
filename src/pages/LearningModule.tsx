
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/contexts/ProgressContext";
import { subjects } from "@/data/curriculum";
import { ContentBlock, SubTopic, Topic } from "@/data/models";
import MathDisplay from "@/components/MathDisplay";

const LearningModule: React.FC = () => {
  const { subjectId = "", topicId = "", subtopicId = "" } = useParams();
  const { toast } = useToast();
  const { completeLesson } = useProgress();
  
  const [subject, setSubject] = useState<{name: string, id: string} | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [subTopic, setSubTopic] = useState<SubTopic | null>(null);
  
  // Find the selected content
  useEffect(() => {
    const selectedSubject = subjects.find(s => s.id === subjectId);
    if (selectedSubject) {
      setSubject({ name: selectedSubject.name, id: selectedSubject.id });
      
      const selectedTopic = selectedSubject.topics.find(t => t.id === topicId);
      if (selectedTopic) {
        setTopic(selectedTopic);
        
        const selectedSubTopic = selectedTopic.subTopics.find(st => st.id === subtopicId);
        if (selectedSubTopic) {
          setSubTopic(selectedSubTopic);
        }
      }
    }
  }, [subjectId, topicId, subtopicId]);
  
  const handleCompleteLesson = () => {
    if (subject && topic && subTopic) {
      const lessonId = `${subject.id}-${topic.id}-${subTopic.id}`;
      completeLesson(lessonId);
      
      toast({
        title: "Lesson Completed!",
        description: "You've earned XP for completing this lesson.",
      });
    }
  };
  
  // If content is not found
  if (!subject || !topic || !subTopic) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Content not found</p>
        <Link to="/curriculum">
          <Button>Return to Curriculum</Button>
        </Link>
      </div>
    );
  }
  
  // Render different content block types
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={block.id} className="mb-6">
            <p className="text-foreground leading-relaxed">{block.content}</p>
          </div>
        );
        
      case 'formula':
        return (
          <div key={block.id} className="mb-6">
            <MathDisplay content={block.content} className="text-center py-4" />
          </div>
        );
        
      case 'example':
        return (
          <div key={block.id} className="mb-6 bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Example:</h3>
            <pre className="whitespace-pre-wrap text-sm">{block.content}</pre>
          </div>
        );
        
      case 'image':
        return (
          <div key={block.id} className="mb-6">
            <img 
              src={block.content}
              alt={`Figure ${index + 1}`}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Figure {index + 1}
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/curriculum?subject=${subject.id}&topic=${topic.id}`} className="p-2 rounded-full hover:bg-muted">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-bold">{subTopic.name}</h1>
              <p className="text-xs text-muted-foreground">{subject.name} • {topic.name}</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-quest-softPurple flex items-center justify-center">
            <BookOpen size={18} className="text-quest-primary" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">{subTopic.name}</h2>
        {subTopic.content.map(renderContentBlock)}
      </div>
      
      {/* Quiz Button */}
      <div className="p-6 border-t sticky bottom-0 bg-background">
        <div className="flex gap-4">
          <Button 
            onClick={handleCompleteLesson}
            className="flex-1 bg-quest-primary hover:bg-quest-secondary"
          >
            Mark as Complete
          </Button>
          
          <Link 
            to={`/quiz/${subject.id}/${topic.id}/${subTopic.id}`}
            className="flex-1"
          >
            <Button 
              variant="outline" 
              className="w-full border-quest-primary text-quest-primary hover:bg-quest-softPurple"
            >
              Take Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
