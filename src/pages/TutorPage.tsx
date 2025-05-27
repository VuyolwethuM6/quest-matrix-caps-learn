
import React from "react";
import { GraduationCap, Video, Calendar, MessageSquare, Star, Clock, Users } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TutorPage: React.FC = () => {
  const tutorServices = [
    {
      icon: <Video size={32} className="text-quest-blue" />,
      title: "Online Tutoring",
      description: "Get personalized help through video sessions",
      action: "Book Online Session"
    },
    {
      icon: <Users size={32} className="text-quest-purple" />,
      title: "In-Person Tutoring",
      description: "Face-to-face tutoring sessions at your location",
      action: "Schedule Meeting"
    },
    {
      icon: <MessageSquare size={32} className="text-quest-orange" />,
      title: "Get Feedback",
      description: "Submit your work for detailed feedback",
      action: "Request Feedback"
    },
    {
      icon: <Calendar size={32} className="text-green-500" />,
      title: "Study Planning",
      description: "Create a personalized study schedule",
      action: "Plan Studies"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <GraduationCap size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tutor Support</h1>
            <p className="opacity-90">Get personalized help from expert tutors</p>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-300" size={24} />
              <div>
                <p className="font-medium">Expert Tutors Available</p>
                <p className="text-sm opacity-90">Mathematics • Physics • Chemistry</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Response Time</p>
              <p className="font-bold flex items-center gap-1">
                <Clock size={16} />
                &lt; 2 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Tutoring Services</h2>
        <div className="grid gap-4">
          {tutorServices.map((service, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {service.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Quick Help</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 bg-quest-softBlue border-quest-blue text-quest-blue"
          >
            <MessageSquare size={24} />
            <span className="text-sm">Ask Question</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 bg-quest-softPurple border-quest-purple text-quest-purple"
          >
            <Calendar size={24} />
            <span className="text-sm">View Schedule</span>
          </Button>
        </div>
      </div>

      {/* Emergency Help */}
      <div className="p-6">
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="text-orange-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-orange-800">Need Urgent Help?</h3>
                <p className="text-sm text-orange-600">Get immediate assistance for exam prep</p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Get Help Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default TutorPage;
