import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, BookOpen, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createStudyPlan, getStudyPlans, deleteStudyPlan } from '@/services/studyPlans';
import NavBar from '@/components/NavBar';

const StudyPlanningPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [studyTopic, setStudyTopic] = useState('');
  const [studyDate, setStudyDate] = useState('');
  const [studyPlans, setStudyPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudyPlans();
  }, []);

  const loadStudyPlans = async () => {
    try {
      const plans = await getStudyPlans();
      setStudyPlans(plans);
    } catch (error) {
      console.error('Error loading study plans:', error);
      toast({
        title: "Error",
        description: "Failed to load study plans",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStudyPlan = async () => {
    if (!studyTopic || !studyDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await createStudyPlan(studyTopic, studyDate);
      toast({
        title: "Success",
        description: "Study plan created successfully"
      });
      setStudyTopic('');
      setStudyDate('');
      loadStudyPlans();
    } catch (error) {
      console.error('Error creating study plan:', error);
      toast({
        title: "Error",
        description: "Failed to create study plan",
        variant: "destructive"
      });
    }
  };

  const handleDeleteStudyPlan = async (id: string) => {
    try {
      await deleteStudyPlan(id);
      toast({
        title: "Success",
        description: "Study plan deleted successfully"
      });
      loadStudyPlans();
    } catch (error) {
      console.error('Error deleting study plan:', error);
      toast({
        title: "Error",
        description: "Failed to delete study plan",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/tutor')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Study Planning</h1>
              <p className="text-sm text-muted-foreground">Create and manage your study schedule</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Create New Plan */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Create New Study Plan</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="study-topic">Topic</Label>
                  <Input
                    id="study-topic"
                    placeholder="e.g., Mathematics - Algebra"
                    value={studyTopic}
                    onChange={(e) => setStudyTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="study-date">Date</Label>
                  <Input
                    id="study-date"
                    type="date"
                    value={studyDate}
                    onChange={(e) => setStudyDate(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleCreateStudyPlan}
                  disabled={!studyTopic || !studyDate}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Study Plans List */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Your Study Schedule</h2>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : studyPlans.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No study plans created yet</p>
                  <p className="text-sm">Create your first study plan above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {studyPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{plan.topic}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(plan.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteStudyPlan(plan.id)}
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Study Tips</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <span className="text-green-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Break it down</h3>
                    <p className="text-sm text-muted-foreground">
                      Divide your study material into smaller, manageable chunks
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Regular breaks</h3>
                    <p className="text-sm text-muted-foreground">
                      Take short breaks every 45-60 minutes to maintain focus
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <span className="text-green-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Active recall</h3>
                    <p className="text-sm text-muted-foreground">
                      Test yourself regularly to reinforce your learning
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default StudyPlanningPage; 