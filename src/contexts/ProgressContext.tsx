
import React, { createContext, useState, useContext, useEffect } from "react";

interface ProgressContextType {
  xp: number;
  level: number;
  streakDays: number;
  lastLoginDate: string | null;
  completedLessons: string[];
  completedQuizzes: Record<string, number>;
  earnedBadges: string[];
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  earnBadge: (badgeId: string) => void;
  recordLogin: () => void;
}

const calculateLevel = (xp: number): number => {
  // Simple level calculation - each level requires 100 * level XP
  return Math.floor(Math.sqrt(xp / 50)) + 1;
};

const defaultContext: ProgressContextType = {
  xp: 0,
  level: 1,
  streakDays: 0,
  lastLoginDate: null,
  completedLessons: [],
  completedQuizzes: {},
  earnedBadges: [],
  addXP: () => {},
  completeLesson: () => {},
  completeQuiz: () => {},
  earnBadge: () => {},
  recordLogin: () => {},
};

const ProgressContext = createContext<ProgressContextType>(defaultContext);

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem("caps_progress_xp");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [level, setLevel] = useState<number>(() => {
    return calculateLevel(xp);
  });
  
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem("caps_progress_streak");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(() => {
    return localStorage.getItem("caps_progress_last_login");
  });
  
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem("caps_progress_lessons");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("caps_progress_quizzes");
    return saved ? JSON.parse(saved) : {};
  });
  
  const [earnedBadges, setEarnedBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem("caps_progress_badges");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Update level when XP changes
  useEffect(() => {
    const newLevel = calculateLevel(xp);
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }, [xp, level]);
  
  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("caps_progress_xp", String(xp));
    localStorage.setItem("caps_progress_streak", String(streakDays));
    localStorage.setItem("caps_progress_lessons", JSON.stringify(completedLessons));
    localStorage.setItem("caps_progress_quizzes", JSON.stringify(completedQuizzes));
    localStorage.setItem("caps_progress_badges", JSON.stringify(earnedBadges));
    if (lastLoginDate) {
      localStorage.setItem("caps_progress_last_login", lastLoginDate);
    }
  }, [xp, streakDays, completedLessons, completedQuizzes, earnedBadges, lastLoginDate]);
  
  const addXP = (amount: number) => {
    setXp((prev) => prev + amount);
  };
  
  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      addXP(20); // Award XP for completing a lesson
    }
  };
  
  const completeQuiz = (quizId: string, score: number) => {
    const prevScore = completedQuizzes[quizId] || 0;
    const newScore = Math.max(prevScore, score);
    
    setCompletedQuizzes({...completedQuizzes, [quizId]: newScore});
    
    // Add XP based on score improvement
    if (newScore > prevScore) {
      const xpGain = Math.round((newScore - prevScore) * 5);
      addXP(xpGain);
    }
  };
  
  const earnBadge = (badgeId: string) => {
    if (!earnedBadges.includes(badgeId)) {
      setEarnedBadges([...earnedBadges, badgeId]);
      addXP(50); // Award XP for earning a badge
    }
  };
  
  const recordLogin = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (lastLoginDate !== today) {
      // Check if yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastLoginDate === yesterdayStr) {
        // Increment streak
        setStreakDays(prev => prev + 1);
        
        // Award bonus XP for streak milestones
        if ((streakDays + 1) === 3) addXP(30);
        if ((streakDays + 1) === 7) addXP(70);
        if ((streakDays + 1) === 14) addXP(150);
        if ((streakDays + 1) === 30) addXP(300);
      } else if (lastLoginDate !== null && lastLoginDate !== today) {
        // Reset streak if not consecutive
        setStreakDays(1);
      }
      
      setLastLoginDate(today);
    }
  };
  
  return (
    <ProgressContext.Provider
      value={{
        xp,
        level,
        streakDays,
        lastLoginDate,
        completedLessons,
        completedQuizzes,
        earnedBadges,
        addXP,
        completeLesson,
        completeQuiz,
        earnBadge,
        recordLogin,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
