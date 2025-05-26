import React, { useState } from "react";
import { FileText, Clock, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { subjects } from "@/data/curriculum";

// Sample exam data - in a real app this would come from a database
const examPapers = [
  {
    id: "math-2023-p1",
    subject: "Mathematics",
    year: 2023,
    paper: 1,
    duration: 180,
    questions: 15,
    difficulty: "Medium"
  },
  {
    id: "math-2023-p2",
    subject: "Mathematics", 
    year: 2023,
    paper: 2,
    duration: 180,
    questions: 12,
    difficulty: "Hard"
  },
  {
    id: "math-2022-p1",
    subject: "Mathematics",
    year: 2022,
    paper: 1,
    duration: 180,
    questions: 15,
    difficulty: "Medium"
  },
  {
    id: "math-2022-p2",
    subject: "Mathematics",
    year: 2022,
    paper: 2,
    duration: 180,
    questions: 12,
    difficulty: "Hard"
  },
  {
    id: "physics-2023-p1",
    subject: "Physical Sciences",
    year: 2023,
    paper: 1,
    duration: 180,
    questions: 20,
    difficulty: "Medium"
  },
  {
    id: "physics-2023-p2",
    subject: "Physical Sciences",
    year: 2023,
    paper: 2,
    duration: 180,
    questions: 15,
    difficulty: "Hard"
  }
];

const ExamsPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const navigate = useNavigate();
  
  // Filter exams based on selected subject
  const filteredExams = selectedSubject === "all" 
    ? examPapers 
    : examPapers.filter(exam => {
        const subject = subjects.find(s => s.name === exam.subject);
        return subject?.id === selectedSubject;
      });
  
  // Group exams by year
  const examsByYear = filteredExams.reduce((acc, exam) => {
    if (!acc[exam.year]) {
      acc[exam.year] = [];
    }
    acc[exam.year].push(exam);
    return acc;
  }, {} as Record<number, typeof examPapers>);
  
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
      <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Exam Papers</h1>
        <p className="opacity-90">Practice with past exam papers to prepare for your tests</p>
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
      
      {/* Exam Papers */}
      <div className="px-4 space-y-6">
        {Object.entries(examsByYear)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, exams]) => (
            <div key={year}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-quest-primary" />
                {year} Papers
              </h2>
              
              <div className="space-y-3">
                {exams
                  .sort((a, b) => a.paper - b.paper)
                  .map(exam => (
                    <Card key={exam.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{exam.subject}</h3>
                              <Badge variant="outline">Paper {exam.paper}</Badge>
                              <Badge className={getDifficultyColor(exam.difficulty)}>
                                {exam.difficulty}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {exam.duration} min
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {exam.questions} questions
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            className="ml-4"
                            onClick={() => navigate(`/exam/${exam.id}`)}
                          >
                            Start Exam
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        
        {filteredExams.length === 0 && (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Exam Papers Available</h3>
            <p className="text-muted-foreground">
              There are no exam papers available for the selected subject.
            </p>
          </Card>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default ExamsPage;
