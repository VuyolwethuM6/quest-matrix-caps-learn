import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, BookOpen, CheckCircle, PenTool, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/contexts/ProgressContext";
import { subjects } from "@/data/curriculum";
import { ContentBlock, SubTopic, Topic } from "@/data/models";
import MathDisplay from "@/components/MathDisplay";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import LoadingSpinner from "@/components/LoadingSpinner";
import 'katex/dist/katex.min.css';

const LearningModule: React.FC = () => {
  const { subjectId = "", topicId = "", subtopicId = "" } = useParams();
  const { toast } = useToast();
  const { completeLesson, completedLessons } = useProgress();
  
  const [subject, setSubject] = useState<{name: string, id: string} | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [subTopic, setSubTopic] = useState<SubTopic | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Find the selected content
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
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
      } finally {
        // Add a small delay to prevent flickering
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    loadContent();
  }, [subjectId, topicId, subtopicId]);
  
  const handleCompleteLesson = () => {
    if (subject && topic && subTopic) {
      const lessonId = `${subject.id}-${topic.id}-${subTopic.id}`;
      completeLesson(lessonId);
      
      toast({
        title: "Lesson Completed",
        description: "You've earned XP for completing this lesson.",
        duration: 3000, // 3 seconds
        className: "bg-quest-softPurple/20 border-quest-primary",
        style: {
          background: "rgba(155, 135, 245, 0.1)", // quest-softPurple with 10% opacity
          borderColor: "var(--quest-primary)",
          color: "var(--quest-primary)",
          backdropFilter: "blur(8px)",
        },
      });
    }
  };
  
  const handlePracticeAnswer = (blockId: string, selectedIndex: number, correctAnswer: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [blockId]: selectedIndex
    }));
  };

  const isLessonCompleted = subject && topic && subTopic 
    ? completedLessons.includes(`${subject.id}-${topic.id}-${subTopic.id}`)
    : false;
  
  // If content is loading
  if (isLoading) {
    return (
      <LoadingSpinner variant="inline" />
    );
  }
  
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
            <div className="text-foreground leading-relaxed prose">
              <ReactMarkdown 
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ children }) => <p className="whitespace-pre-line">{children}</p>
                }}
              >
                {block.content as string}
              </ReactMarkdown>
            </div>
          </div>
        );
        
      case 'formula':
        return (
          <div key={block.id} className="mb-6">
            <MathDisplay content={block.content as string} className="text-center py-4 bg-quest-softPurple/20 rounded-lg" />
          </div>
        );
        
      case 'example':
        return (
          <div key={block.id} className="mb-6 bg-quest-softBlue/30 p-5 rounded-lg border border-quest-blue/20">
            <h3 className="font-medium mb-2 text-quest-blue flex items-center gap-2">
              <PenTool size={16} /> Example:
            </h3>
            <div className="prose">
              <ReactMarkdown 
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ children }) => <p className="whitespace-pre-line">{children}</p>
                }}
              >
                {block.content as string}
              </ReactMarkdown>
            </div>
          </div>
        );
        
      case 'image':
        return (
          <div key={block.id} className="mb-6">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={block.content as string}
                alt={`Figure ${block.id}`}
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Figure: {block.id}
            </p>
          </div>
        );

      case 'video':
        return (
          <div key={block.id} className="mb-6">
            <div className="rounded-lg overflow-hidden shadow-sm border">
              <div className="aspect-video">
                <iframe
                  src={block.content as string}
                  title="Video content"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Video {index + 1}
            </p>
          </div>
        );

      case 'practice':
        const practiceContent = typeof block.content === 'string' ? JSON.parse(block.content) : block.content;
        return (
          <div key={block.id} className="mb-6 bg-quest-softPurple/20 p-5 rounded-lg border border-quest-purple/20">
            <h3 className="font-medium mb-2 text-quest-purple flex items-center gap-2">
              <PenTool size={16} /> Practice:
            </h3>
            <div className="mb-4 prose">
              <ReactMarkdown 
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ children }) => <p className="whitespace-pre-line">{children}</p>
                }}
              >
                {practiceContent.question}
              </ReactMarkdown>
            </div>
            <div className="space-y-2">
              {practiceContent.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handlePracticeAnswer(block.id, index, practiceContent.correctAnswer)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    selectedAnswers[block.id] === index
                      ? selectedAnswers[block.id] === practiceContent.correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'bg-white hover:bg-quest-softPurple/30'
                  } border`}
                >
                  <ReactMarkdown 
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      p: ({ children }) => <p className="whitespace-pre-line">{children}</p>
                    }}
                  >
                    {option}
                  </ReactMarkdown>
                </button>
              ))}
            </div>
            {selectedAnswers[block.id] !== undefined && (
              <div className={`mt-4 p-3 rounded-lg ${
                selectedAnswers[block.id] === practiceContent.correctAnswer
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    p: ({ children }) => <p className="whitespace-pre-line">{children}</p>
                  }}
                >
                  {practiceContent.explanation}
                </ReactMarkdown>
              </div>
            )}
          </div>
        );

      case 'tip':
        return (
          <div key={block.id} className="mb-6 bg-amber-50 p-5 rounded-lg border border-amber-200">
            <h3 className="font-medium mb-2 text-amber-700 flex items-center gap-2">
              <Lightbulb size={16} className="text-amber-500" /> Memory Tip:
            </h3>
            <div className="text-amber-600 prose">
              <ReactMarkdown 
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ children }) => <p className="whitespace-pre-line">{children}</p>
                }}
              >
                {block.content as string}
              </ReactMarkdown>
            </div>
          </div>
        );
        
      case 'exam-tip':
        return (
          <div key={block.id} className="mb-6 bg-quest-softPurple/20 p-5 rounded-lg border border-quest-purple/20">
            <h3 className="font-medium mb-2 text-quest-purple flex items-center gap-2">
              <BookOpen size={16} /> Exam Tips:
            </h3>
            <div className="prose">
              <ReactMarkdown 
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ children }) => <p className="whitespace-pre-line">{children}</p>
                }}
              >
                {block.content as string}
              </ReactMarkdown>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10 shadow-sm">
        <div className="p-4 flex items-center justify-between bg-gradient-to-r from-quest-softPurple to-white">
          <div className="flex items-center gap-2">
            <Link to={`/curriculum?subject=${subject.id}&topic=${topic.id}`} className="p-2 rounded-full hover:bg-white/30 transition-colors">
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
      <div className="p-6 max-w-3xl mx-auto">
        {subTopic.content.map((block, index) => renderContentBlock(block, index))}
      </div>
      
      {/* Quiz Button */}
      <div className="sticky bottom-0 bg-background border-t p-4">
        <div className="flex gap-4 max-w-3xl mx-auto">
          <Button 
            onClick={handleCompleteLesson}
            disabled={isLessonCompleted}
            className={`flex-1 gap-2 ${
              isLessonCompleted 
                ? 'bg-green-100 text-green-800 hover:bg-green-100 cursor-not-allowed'
                : 'bg-quest-primary hover:bg-quest-secondary'
            }`}
          >
            {isLessonCompleted ? (
              <>
                <CheckCircle size={18} className="text-green-600" /> Completed
              </>
            ) : (
              <>
                <CheckCircle size={18} /> Mark as Complete
              </>
            )}
          </Button>
          
          <Link 
            to={`/quiz/${subject.id}/${topic.id}/${subTopic.id}`}
            className="flex-1"
          >
            <Button 
              variant="outline" 
              className="w-full border-quest-primary text-quest-primary hover:bg-quest-softPurple gap-2"
            >
              <PenTool size={18} /> Take Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
