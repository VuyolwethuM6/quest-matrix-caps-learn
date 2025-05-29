import React, { useState } from "react";
import { Trophy, BookOpen, Award, LogOut, Calendar, ChevronRight, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import XPProgress from "@/components/XPProgress";
import BadgeCard from "@/components/BadgeCard";
import { useUser } from "@/contexts/UserContext";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { getAvatars, getBadges } from "@/data/curriculum";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { XPInfoTooltip } from '@/components/XPInfoTooltip';

const ProfilePage: React.FC = () => {
  const { name, grade, avatar } = useUser();
  const { xp, level, streakDays, completedLessons, completedQuizzes, earnedBadges, clearProgress } = useProgress();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isResetting, setIsResetting] = useState(false);
  
  const avatarObj = getAvatars().find(a => a.id === avatar);
  const avatarEmoji = avatarObj?.image || "🛡️";
  const badges = getBadges();
  
  // Get the most recent badges (up to 2)
  const recentBadges = badges
    .filter(badge => earnedBadges.includes(badge.id))
    .slice(-2)
    .reverse();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleResetProgress = async () => {
    try {
      setIsResetting(true);
      await clearProgress();
      toast({
        title: "Progress Reset",
        description: "Your progress has been reset successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
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
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>
          
        </div>
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
            <XPInfoTooltip />
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

      {/* Recent Badges Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Award size={18} className="text-quest-orange" /> Recent Badges
          </h2>
          <Link to="/badges" className="text-quest-primary text-sm flex items-center font-medium">
            View More <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {recentBadges.length > 0 ? (
            recentBadges.map(badge => (
              <BadgeCard key={badge.id} badge={badge} />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">No badges earned yet. Keep learning to earn badges!</p>
            </div>
          )}
        </div>
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

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button 
      variant="outline" 
      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
      disabled={isResetting}
    >
      {isResetting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Resetting...
        </>
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" />
          Reset
        </>
      )}
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
    <AlertDialogHeader className="space-y-4">
      <AlertDialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
        Reset Progress
      </AlertDialogTitle>
      <AlertDialogDescription className="text-gray-600 dark:text-gray-300 space-y-3">
        <p>Are you sure you want to reset your progress? This action cannot be undone.</p>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg space-y-2">
          <p className="font-medium text-red-800 dark:text-red-200">This will reset:</p>
          <ul className="list-disc list-inside space-y-1 text-red-700 dark:text-red-300">
            <li>All XP points (currently {xp})</li>
            <li>Completed lessons ({completedLessons.length})</li>
            <li>Quiz scores</li>
            <li>Earned badges ({earnedBadges.length})</li>
            <li>Current streak ({streakDays} days)</li>
          </ul>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
      <AlertDialogCancel className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white border-0">
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction 
        onClick={handleResetProgress}
        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white border-0"
        disabled={isResetting}
      >
        {isResetting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : (
          <>
            <Trash2 className="mr-2 h-4 w-4" />
            Yes, Reset Progress
          </>
        )}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

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
          <p>Viva: Strive for Excellence</p>
          <p>Version 1.0.0 (MVP)</p>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default ProfilePage;
