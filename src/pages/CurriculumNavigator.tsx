
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, BookOpen, GraduationCap } from "lucide-react";
import NavBar from "@/components/NavBar";
import TopicCard from "@/components/TopicCard";
import SubTopicCard from "@/components/SubTopicCard";
import { subjects } from "@/data/curriculum";

const CurriculumNavigator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  
  // Set initial selection from URL params
  useEffect(() => {
    const subjectParam = searchParams.get("subject");
    const topicParam = searchParams.get("topic");
    
    if (subjectParam) {
      setSelectedSubjectId(subjectParam);
      
      if (topicParam) {
        setSelectedTopicId(topicParam);
      }
    }
  }, [searchParams]);
  
  const selectedSubject = subjects.find(subject => subject.id === selectedSubjectId);
  const selectedTopic = selectedSubject?.topics.find(topic => topic.id === selectedTopicId);
  
  const renderSubjects = () => (
    <>
      <div className="bg-gradient-to-b from-quest-softPurple to-transparent pt-6 pb-8 px-6 rounded-b-2xl mb-4">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <GraduationCap className="text-quest-primary" />
          Subject Library
        </h1>
        <p className="text-muted-foreground text-sm">Choose a subject to start learning</p>
      </div>
      
      <div className="space-y-4 px-4">
        {subjects.map(subject => (
          <div
            key={subject.id}
            onClick={() => {
              setSelectedSubjectId(subject.id);
              setSelectedTopicId(null); // Reset topic selection when changing subject
            }}
            className={`rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedSubjectId === subject.id 
                ? "border-quest-primary bg-quest-softPurple/30" 
                : "border-border bg-card hover:bg-accent/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${subject.color} text-white flex items-center justify-center`}>
                {subject.icon === "calculator" ? "🧮" : "⚗️"}
              </div>
              <div>
                <h2 className="text-lg font-bold">{subject.name}</h2>
                <p className="text-sm text-muted-foreground">{subject.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
  const renderTopics = () => {
    if (!selectedSubject) return null;
    
    return (
      <>
        <div className="bg-gradient-to-b from-quest-softPurple to-transparent pt-6 pb-8 px-6 rounded-b-2xl mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedSubjectId(null);
                setSelectedTopicId(null);
              }}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{selectedSubject.name}</h1>
              <p className="text-sm text-muted-foreground">Select a topic to continue</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 px-4 pb-20">
          {selectedSubject.topics.map(topic => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              subjectId={selectedSubject.id} 
              onClick={() => setSelectedTopicId(topic.id)}
            />
          ))}
        </div>
      </>
    );
  };
  
  const renderSubTopics = () => {
    if (!selectedSubject || !selectedTopic) return null;
    
    return (
      <>
        <div className="bg-gradient-to-b from-quest-softPurple to-transparent pt-6 pb-8 px-6 rounded-b-2xl mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedTopicId(null)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{selectedTopic.name}</h1>
              <p className="text-sm text-muted-foreground">{selectedSubject.name}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 px-4 pb-20">
          {selectedTopic.subTopics.map(subTopic => (
            <SubTopicCard
              key={subTopic.id}
              subTopic={subTopic}
              subjectId={selectedSubject.id}
              topicId={selectedTopic.id}
            />
          ))}
        </div>
      </>
    );
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {selectedTopicId && selectedSubject 
        ? renderSubTopics() 
        : selectedSubjectId 
        ? renderTopics() 
        : renderSubjects()}
      <NavBar />
    </div>
  );
};

export default CurriculumNavigator;
