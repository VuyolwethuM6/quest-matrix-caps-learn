
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Award, ChevronRight, Brain, Rocket, Flame, Star, Shield, Compass} from "lucide-react";
import NavBar from "@/components/NavBar";
import XPProgress from "@/components/XPProgress";
import TopicCard from "@/components/TopicCard";
import BadgeCard from "@/components/BadgeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
    ? <Shield size={24} color="green"/>
    : avatar === "scholar" 
    ? <BookOpen size={24} color="red"/>
    : <Compass size={24} color="blue"/>;
    
  const recentTopics = [
    subjects[0].topics[0],
    subjects[1].topics[0]
  ];
  
  const badges = getBadges().slice(0, 3);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-6 text-white rounded-b-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hello, {name}</h1>
            <p className="opacity-90">Grade {grade}</p>
          </div>
          <div className="quest-avatar w-14 h-14 flex items-center justify-center text-2xl bg-white rounded-full shadow-md">
            {avatarEmoji}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 flex-1 shadow-sm">
            <XPProgress size="sm" showText={false}/>
            <div className="text-sm">
              <p className="font-medium">Level {level}</p>
              <p className="text-xs opacity-90">{xp} XP total</p>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 flex-1 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
            <Flame color="orange" size={24} />
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
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Rocket size={18} className="text-quest-primary" /> Continue Learning
          </h2>
          <Link to="/curriculum" className="text-quest-primary text-sm flex items-center font-medium">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="space-y-3">
          {recentTopics.map((topic, index) => (
            <Link 
              key={topic.id}
              to={`/learn/${subjects[index].id}/${topic.id}/${topic.subTopics[0].id}`}
              className="block"
            >
              <TopicCard 
                topic={topic} 
                subjectId={subjects[index].id} 
              />
            </Link>
          ))}
        </div>
      </div>
      
      {/* Badges */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Award size={18} className="text-quest-orange" /> Recent Badges
          </h2>
          <Link to="/badges" className="text-quest-primary text-sm flex items-center font-medium">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="hidden sm:grid sm:grid-cols-3 gap-3">
          {badges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
        
        <div className="sm:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {badges.map((badge) => (
                <CarouselItem key={badge.id} className="pl-2 md:pl-4 basis-1/2">
                  <BadgeCard badge={badge} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
      
      {/* CAPS Buddy */}
      <div className="p-4">
        <Card className="bg-gradient-to-br from-quest-softBlue to-white border-quest-blue/30 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-quest-blue/20 flex items-center justify-center mb-3">
                <Brain size={24} className="text-quest-blue" />
              </div>
              
              <h3 className="text-lg font-bold mb-1">Ask CAPS Buddy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant help with your studies from our AI tutor
              </p>
              
              <Link to="/caps-buddy">
                <Button
                  variant="outline" 
                  className="bg-white/50 border-quest-blue text-quest-blue"
                >
                  Chat with Vito 
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <Link to="/curriculum" className="bg-quest-softPurple hover:bg-quest-softPurple/90 transition-colors rounded-xl p-4 shadow-sm">
            <div className="flex flex-col items-center">
              <BookOpen size={32} className="text-quest-primary mb-2" />
              <span className="font-medium">Start Learning</span>
            </div>
          </Link>
          
          <Link to="/badges" className="bg-quest-softPeach hover:bg-quest-softPeach/90 transition-colors rounded-xl p-4 shadow-sm">
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
