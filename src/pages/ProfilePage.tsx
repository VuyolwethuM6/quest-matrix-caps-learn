
import React from "react";
import { Trophy, BookOpen, Award, LogOut, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import XPProgress from "@/components/XPProgress";
import BadgeCard from "@/components/BadgeCard";
import { useUser } from "@/contexts/UserContext";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getAvatars, getBadges } from "@/data/curriculum";

const ProfilePage: React.FC = () => {
  const { name, grade, avatar } = useUser();
  const { xp, level, streakDays, completedLessons, completedQuizzes, earnedBadges } = useProgress();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const avatarObj = getAvatars().find(a => a.id === avatar);
  const avatarEmoji = avatarObj?.image || "🛡️";
  const badges = getBadges();
  
  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    
    toast({
      title: "Logged out successfully",
      description: "Your progress is saved. You can log back in anytime.",
    });
    
    // Redirect to splash screen
    navigate("/login", { replace: true });
  };
  
  const stats = [
    { name: "Lessons Completed", value: completedLessons.length, icon: <BookOpen size={18} className="text-quest-blue" /> },
    { name: "Quizzes Completed", value: Object.keys(completedQuizzes).length, icon: <Trophy size={18} className="text-quest-orange" /> },
    { name: "Badges Earned", value: earnedBadges.length, icon: <Award size={18} className="text-quest-purple" /> },
    { name: "Day Streak", value: streakDays, icon: <Calendar size={18} className="text-green-500" /> },
  ];
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-6 pb-16 text-white">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <div className="flex flex-col items-center">
          <div className="quest-avatar w-24 h-24 flex items-center justify-center text-5xl bg-white mb-4">
            {avatarEmoji}
          </div>
          <h2 className="text-xl font-bold mb-1">{name}</h2>
          <p className="opacity-90">Grade {grade} Student</p>
        </div>
      </div>
      
      {/* Stats Card */}
      <div className="px-6 relative -mt-10 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <XPProgress size="lg" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                    {stat.icon}
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.name}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Award size={18} className="text-quest-orange" /> Your Badges
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {badges.slice(0, 6).map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
        {badges.length > 6 && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              +{badges.length - 6} more badges available
            </p>
          </div>
        )}
      </div>
      
      {/* Account Section */}
      <div className="px-6">
        <h2 className="text-lg font-bold mb-4">Account</h2>
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Reset Progress</p>
                <p className="text-sm text-muted-foreground">Start your learning journey fresh</p>
              </div>
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                Reset
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Log Out</p>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
        
        {/* App Info */}
        <div className="text-center text-xs text-muted-foreground mt-8">
          <p>CAPS Quest: Master the Matrix</p>
          <p>Version 1.0.0 (MVP)</p>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default ProfilePage;
