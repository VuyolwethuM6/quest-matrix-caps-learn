import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subjects } from "@/data/curriculum";
import { topicPractices } from "@/data/topicPracticeData";
import { topicPracticeHelpers } from "@/data/topicPracticeModels";
import NavBar from "@/components/NavBar";

const TopicsPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const navigate = useNavigate();
  
  // Filter practices based on selected subject
  const filteredPractices = selectedSubject === "all" 
    ? topicPractices 
    : topicPracticeHelpers.getPracticeBySubject(topicPractices, selectedSubject);
  
  // Group practices by topic
  const practicesByTopic = filteredPractices.reduce((acc, practice) => {
    if (!acc[practice.topicId]) {
      acc[practice.topicId] = [];
    }
    acc[practice.topicId].push(practice);
    return acc;
  }, {} as Record<string, typeof topicPractices>);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Topic Practice</h1>
          <p className="opacity-90">Practice specific topics to improve your understanding</p>
        </div>
        
        {/* Subject Filter */}
        <div className="px-4 relative -mt-6 mb-6">
          <Card className="p-4 shadow-sm bg-white">
            <Tabs defaultValue="all" onValueChange={setSelectedSubject}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All Subjects</TabsTrigger>
                {subjects.map(subject => (
                  <TabsTrigger key={subject.id} value={subject.id} className="flex-1">
                    {subject.name.split(' ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </Card>
        </div>
      </div>
      
      {/* Topic Practices */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {Object.entries(practicesByTopic).map(([topicId, practices]) => {
          const topic = subjects
            .flatMap(s => s.topics)
            .find(t => t.id === topicId);
          
          if (!topic) return null;
          
          return (
            <div key={topicId}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-quest-primary" />
                {topic.name}
              </h2>
              
              <div className="space-y-3">
                {practices.map(practice => (
                  <Card key={practice.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold">{practice.subject}</h3>
                            <Badge className={getDifficultyColor(practice.difficulty)}>
                              {practice.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {practice.questions.length} questions
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full sm:w-auto"
                          onClick={() => navigate(`/topic-practice/${practice.id}`)}
                        >
                          Start Practice
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <NavBar />
    </div>
  );
};

export default TopicsPage; 