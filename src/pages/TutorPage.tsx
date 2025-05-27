
import React from "react";
import { User, Video, Calendar, MessageSquare, Star, Clock, Users, Phone } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TutorPage: React.FC = () => {
  const tutorServices = [
    {
      icon: <Video size={28} className="text-quest-blue" />,
      title: "Online Tutoring",
      description: "Video sessions with expert tutors",
      action: "Book Online"
    },
    {
      icon: <Users size={28} className="text-quest-purple" />,
      title: "In-Person Tutoring",
      description: "Face-to-face sessions at your location",
      action: "Schedule Meeting"
    },
    {
      icon: <MessageSquare size={28} className="text-quest-orange" />,
      title: "Get Feedback",
      description: "Submit work for detailed review",
      action: "Request Feedback"
    },
    {
      icon: <Calendar size={28} className="text-green-500" />,
      title: "Study Planning",
      description: "Personalized study schedules",
      action: "Plan Studies"
    }
  ];

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
                  <Button variant="outline" size="sm" className="text-xs px-3 shrink-0">
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
          >
            <MessageSquare size={20} />
            <span className="text-xs">Ask Question</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1 bg-quest-softPurple border-quest-purple text-quest-purple"
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
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs px-3 shrink-0">
                Get Help
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
