
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Award, ChevronRight, Brain } from "lucide-react";
import NavBar from "@/components/NavBar";
import XPProgress from "@/components/XPProgress";
import TopicCard from "@/components/TopicCard";
import BadgeCard from "@/components/BadgeCard";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useProgress } from "@/contexts/ProgressContext";
import { subjects, getBadges } from "@/data/curriculum";
import LevelUpModal from "@/components/LevelUpModal";

const Dashboard: React.FC = () => {
  const { name, avatar, grade } = useUser();
  const { 
    xp, 
    level, 
    streakDays, 
    earnedBadges,
    recordLogin 
  } = useProgress();
  
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [prevLevel, setPrevLevel] = useState(level);
  
  // Check if we should show level up modal
  useEffect(() => {
    if (level > prevLevel) {
      setNewLevel(level);
      setShowLevelUp(true);
      setPrevLevel(level);
    } else if (prevLevel === 0) {
      setPrevLevel(level);
    }
  }, [level, prevLevel]);
  
  // Record login when dashboard is loaded
  useEffect(() => {
    recordLogin();
  }, [recordLogin]);
  
  const avatarEmoji = avatar === "knight" 
    ? "🛡️" 
    : avatar === "scholar" 
    ? "🧙‍♂️" 
    : "🧭";
    
  const recentTopics = [
    subjects[0].topics[0],
    subjects[1].topics[0]
  ];
  
  const badges = getBadges().slice(0, 3);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hello, {name}</h1>
            <p className="opacity-90">Grade {grade}</p>
          </div>
          <div className="quest-avatar w-12 h-12 flex items-center justify-center text-2xl bg-white">
            {avatarEmoji}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
            <XPProgress size="sm" showText={false} />
            <div className="text-sm">
              <p className="font-medium">Level {level}</p>
              <p className="text-xs opacity-90">{xp} XP total</p>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
              🔥
            </div>
            <div className="text-sm">
              <p className="font-medium">{streakDays} day{streakDays !== 1 ? 's' : ''}</p>
              <p className="text-xs opacity-90">Current streak</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Topics */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Continue Learning</h2>
          <Link to="/curriculum" className="text-quest-primary text-sm flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="space-y-3">
          {recentTopics.map((topic, index) => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              subjectId={subjects[index].id} 
            />
          ))}
        </div>
      </div>
      
      {/* Badges */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Badges</h2>
          <Link to="/badges" className="text-quest-primary text-sm flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {badges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
      
      {/* CAPS Buddy (Coming Soon) */}
      <div className="p-4">
        <div className="quest-card bg-gradient-to-br from-quest-softBlue to-white border border-dashed border-quest-blue">
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-quest-blue/20 flex items-center justify-center mb-3">
              <Brain size={24} className="text-quest-blue" />
            </div>
            
            <h3 className="text-lg font-bold mb-1">Ask CAPS Buddy</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Get instant help with your studies from our AI tutor
            </p>
            
            <Button variant="outline" disabled className="bg-white/50 border-quest-blue text-quest-blue">
              Coming Soon!
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <Link to="/curriculum" className="quest-card bg-quest-softPurple hover:bg-quest-softPurple/80">
            <div className="flex flex-col items-center">
              <BookOpen size={32} className="text-quest-primary mb-2" />
              <span className="font-medium">Start Learning</span>
            </div>
          </Link>
          
          <Link to="/badges" className="quest-card bg-quest-softPeach hover:bg-quest-softPeach/80">
            <div className="flex flex-col items-center">
              <Award size={32} className="text-quest-orange mb-2" />
              <span className="font-medium">View Badges</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Level Up Modal */}
      <LevelUpModal 
        isOpen={showLevelUp} 
        onClose={() => setShowLevelUp(false)} 
        newLevel={newLevel}
      />
      
      <NavBar />
    </div>
  );
};

export default Dashboard;
