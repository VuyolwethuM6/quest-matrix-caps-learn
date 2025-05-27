import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ProgressContextType {
  xp: number;
  level: number;
  streakDays: number;
  completedLessons: string[];
  completedQuizzes: { [key: string]: number };
  earnedBadges: string[];
  lastLoginDate: string | null;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  earnBadge: (badgeId: string) => void;
  recordLogin: () => void;
}

const defaultContext: ProgressContextType = {
  xp: 0,
  level: 1,
  streakDays: 0,
  completedLessons: [],
  completedQuizzes: {},
  earnedBadges: [],
  lastLoginDate: null,
  addXP: () => {},
  completeLesson: () => {},
  completeQuiz: () => {},
  earnBadge: () => {},
  recordLogin: () => {},
};

const ProgressContext = createContext<ProgressContextType>(defaultContext);

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [xp, setXp] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<{ [key: string]: number }>({});
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);

  // Calculate level based on XP
  const calculateLevel = (xp: number): number => {
    if (xp <= 0) return 1;
    return Math.floor(Math.sqrt(xp / 50)) + 1;
  };

  // Calculate current level
  const level = calculateLevel(xp);

  // Initialize progress document if it doesn't exist
  useEffect(() => {
    const initializeProgress = async () => {
      if (!user) return;

      try {
        const progressRef = doc(db, 'users', user.uid, 'progress', 'overall');
        const progressDoc = await getDoc(progressRef);

        if (!progressDoc.exists()) {
          await setDoc(progressRef, {
            xp: 0,
            streakDays: 0,
            completedLessons: [],
            completedQuizzes: {},
            earnedBadges: [],
            lastLoginDate: null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      } catch (error) {
        console.error('Error initializing progress:', error);
      }
    };

    initializeProgress();
  }, [user]);

  // Fetch progress from Firestore when user changes
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setXp(0);
        setStreakDays(0);
        setCompletedLessons([]);
        setCompletedQuizzes({});
        setEarnedBadges([]);
        setLastLoginDate(null);
        return;
      }

      try {
        const progressDoc = await getDoc(doc(db, 'users', user.uid, 'progress', 'overall'));
        if (progressDoc.exists()) {
          const data = progressDoc.data();
          setXp(data.xp || 0);
          setStreakDays(data.streakDays || 0);
          setCompletedLessons(data.completedLessons || []);
          setCompletedQuizzes(data.completedQuizzes || {});
          setEarnedBadges(data.earnedBadges || []);
          setLastLoginDate(data.lastLoginDate || null);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [user]);

  // Update Firestore when progress changes
  useEffect(() => {
    const updateProgress = async () => {
      if (!user) return;

      try {
        const progressRef = doc(db, 'users', user.uid, 'progress', 'overall');
        const progressDoc = await getDoc(progressRef);

        if (!progressDoc.exists()) {
          // Create the document if it doesn't exist
          await setDoc(progressRef, {
            xp,
            streakDays,
            completedLessons,
            completedQuizzes,
            earnedBadges,
            lastLoginDate,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        } else {
          // Update existing document
          await updateDoc(progressRef, {
            xp,
            streakDays,
            completedLessons,
            completedQuizzes,
            earnedBadges,
            lastLoginDate,
            updatedAt: serverTimestamp()
          });
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    };

    updateProgress();
  }, [user, xp, streakDays, completedLessons, completedQuizzes, earnedBadges, lastLoginDate]);

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
        completedLessons,
        completedQuizzes,
        earnedBadges,
        lastLoginDate,
        addXP,
        completeLesson,
        completeQuiz,
        earnBadge,
        recordLogin
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
