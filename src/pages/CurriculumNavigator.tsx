
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
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
    } else if (subjects.length > 0) {
      setSelectedSubjectId(subjects[0].id);
    }
    
    if (topicParam) {
      setSelectedTopicId(topicParam);
    }
  }, [searchParams]);
  
  const selectedSubject = subjects.find(subject => subject.id === selectedSubjectId);
  const selectedTopic = selectedSubject?.topics.find(topic => topic.id === selectedTopicId);
  
  const renderSubjects = () => (
    <>
      <h1 className="text-2xl font-bold mb-4">Subject Library</h1>
      <div className="space-y-4">
        {subjects.map(subject => (
          <div
            key={subject.id}
            onClick={() => setSelectedSubjectId(subject.id)}
            className={`quest-card cursor-pointer ${
              selectedSubjectId === subject.id ? "border-quest-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${subject.color} text-white flex items-center justify-center`}>
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
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setSelectedSubjectId(null)}
            className="p-2 rounded-full hover:bg-muted"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">{selectedSubject.name}</h1>
        </div>
        
        <div className="space-y-4">
          {selectedSubject.topics.map(topic => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              subjectId={selectedSubject.id} 
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
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setSelectedTopicId(null)}
            className="p-2 rounded-full hover:bg-muted"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{selectedTopic.name}</h1>
            <p className="text-sm text-muted-foreground">{selectedSubject.name}</p>
          </div>
        </div>
        
        <div className="space-y-4">
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
      <div className="p-6">
        {selectedTopicId && selectedSubject ? renderSubTopics() : selectedSubjectId ? renderTopics() : renderSubjects()}
      </div>
      <NavBar />
    </div>
  );
};

export default CurriculumNavigator;
