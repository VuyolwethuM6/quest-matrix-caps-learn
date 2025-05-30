import React, { useState, useEffect } from "react";
import { User, Video, Calendar, MessageSquare, Star, Clock, Users, Phone, Upload, Trash2, Inbox, FileText } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { InlineWidget } from "react-calendly";
import { createStudyPlan, getStudyPlans, deleteStudyPlan } from "@/services/studyPlans";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { uploadFile } from '../services/fileUpload';
import { toast } from 'react-hot-toast';

const TutorPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [studyTopic, setStudyTopic] = useState("");
  const [studyDate, setStudyDate] = useState("");
  const [studyPlans, setStudyPlans] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    loadStudyPlans();
  }, []);

  const loadStudyPlans = async () => {
    try {
      const plans = await getStudyPlans();
      setStudyPlans(plans);
    } catch (error) {
      console.error('Error loading study plans:', error);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      console.log('Starting file upload process:', { fileName: file.name, size: file.size });
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        return;
      }
      
      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      if (!allowedTypes.includes(fileExtension)) {
        toast.error('Invalid file type. Please upload PDF, DOC, or DOCX files only.');
        return;
      }
      
      const path = `uploads/${user?.uid}/${Date.now()}_${file.name}`;
      console.log('Uploading file to path:', path);
      
      const downloadURL = await uploadFile(file, path);
      console.log('File uploaded successfully:', downloadURL);
      
      toast.success('File uploaded successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error in handleFileUpload:', error);
      toast.error('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInstantHelp = () => {
    window.location.href = "tel:+27733913206";
  };

  const handleCalendlyOpen = (url: string) => {
    setCalendlyUrl(url);
    setShowCalendly(true);
  };

  const handleCreateStudyPlan = async () => {
    if (!studyTopic || !studyDate) return;

    try {
      await createStudyPlan(studyTopic, studyDate);
      toast({
        title: "Study plan created",
        description: "Your study plan has been saved successfully.",
      });
      setStudyTopic("");
      setStudyDate("");
      loadStudyPlans();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create study plan.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStudyPlan = async (id: string) => {
    try {
      await deleteStudyPlan(id);
      toast({
        title: "Study plan deleted",
        description: "The study plan has been removed.",
      });
      loadStudyPlans();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete study plan.",
        variant: "destructive",
      });
    }
  };

  const tutorServices = [
    {
      id: 'document-review',
      title: 'Document Review',
      description: 'Get feedback on your assignments and documents',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-500',
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Inbox className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                disabled={isUploading}
              />
            </label>
          </div>
          {isUploading && (
            <div className="text-center text-sm text-gray-500">
              Uploading...
            </div>
          )}
        </div>
      ),
    },
    {
      icon: <Video size={28} className="text-quest-blue" />,
      title: "Online Tutoring",
      description: "Video sessions with expert tutors",
      action: "Book Online",
      onClick: () => navigate('/tutor/online')
    },
    {
      icon: <Users size={28} className="text-quest-purple" />,
      title: "In-Person Tutoring",
      description: "Face-to-face sessions at your location",
      action: "Schedule Meeting",
      onClick: () => navigate('/tutor/in-person')
    },
    {
      icon: <MessageSquare size={28} className="text-quest-orange" />,
      title: "Get Feedback",
      description: "Submit work for detailed review",
      action: "Request Feedback",
      onClick: () => navigate('/tutor/document-review')
    },
    {
      icon: <Calendar size={28} className="text-green-500" />,
      title: "Study Planning",
      description: "Personalized study schedules",
      action: "Plan Studies",
      onClick: () => navigate('/tutor/study-planning')
    }
  ];

  const renderStudyPlanningContent = () => (
    <Tabs defaultValue="plan" className="w-full">
      <TabsList>
        <TabsTrigger value="plan">Create Plan</TabsTrigger>
        <TabsTrigger value="view">View Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="plan">
        <div className="space-y-3">
          <Label htmlFor="study-topic">Topic</Label>
          <Input 
            id="study-topic" 
            placeholder="e.g. Algebra" 
            value={studyTopic}
            onChange={(e) => setStudyTopic(e.target.value)}
          />
          <Label htmlFor="study-date">Date</Label>
          <Input 
            id="study-date" 
            type="date" 
            value={studyDate}
            onChange={(e) => setStudyDate(e.target.value)}
          />
          <Button
            onClick={handleCreateStudyPlan}
            disabled={!studyTopic || !studyDate}
          >
            Save Plan
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="view">
        <div className="space-y-3">
          {studyPlans.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No study plans created yet.
            </div>
          ) : (
            studyPlans.map((plan) => (
              <Card key={plan.id}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{plan.topic}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(plan.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStudyPlan(plan.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );

  const renderFeedbackContent = () => (
    <div className="space-y-4">
      <Label htmlFor="feedback-upload" className="block">
        Select a file to upload for feedback:
      </Label>
      <Input
        id="feedback-upload"
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.png"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />
      {selectedFile && (
        <div className="text-xs text-muted-foreground">
          Selected: {selectedFile.name}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="bg-gradient-to-br from-quest-primary/90 to-quest-purple/90 p-4 text-white backdrop-blur-md shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Tutor Support</h1>
              <p className="text-sm opacity-90">Expert help when you need it</p>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-300" size={20} />
                <div>
                  <p className="text-sm font-medium">Expert Tutors</p>
                  <p className="text-xs opacity-90">Math • Physics • Chemistry</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-90">Response</p>
                <p className="text-sm font-bold flex items-center gap-1">
                  <Clock size={14} />
                  &lt; 2hrs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Tutoring Services</h2>
        <div className="space-y-3">
          {tutorServices.map((service, index) => (
            <Card key={index} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-0.5">{service.title}</h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs px-3 shrink-0"
                    onClick={service.onClick}
                  >
                    {service.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1 bg-quest-softBlue border-quest-blue text-quest-blue"
            onClick={() => navigate('/tutor/document-review')}
          >
            <MessageSquare size={20} />
            <span className="text-xs">Ask Question</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1 bg-quest-softPurple border-quest-purple text-quest-purple"
            onClick={() => navigate('/tutor/study-planning')}
          >
            <Calendar size={20} />
            <span className="text-xs">View Schedule</span>
          </Button>
        </div>
      </div>

      {/* Emergency Help */}
      <div className="px-4">
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <Phone className="text-orange-600" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-orange-800">Urgent Help?</h3>
                <p className="text-xs text-orange-600">Immediate exam prep assistance</p>
              </div>
              <Button 
                size="sm" 
                className="bg-orange-500 hover:bg-orange-600 text-xs px-3 shrink-0"
                onClick={handleInstantHelp}
              >
                Get Help
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendly Modal */}
      {showCalendly && (
        <Dialog open={showCalendly} onOpenChange={setShowCalendly}>
          <DialogContent className="max-w-3xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Schedule a Session</DialogTitle>
            </DialogHeader>
            <div className="h-full">
              <InlineWidget
                url={calendlyUrl}
                styles={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <NavBar />
    </div>
  );
};

export default TutorPage;
