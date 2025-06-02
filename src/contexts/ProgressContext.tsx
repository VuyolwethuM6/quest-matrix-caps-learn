import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { badges } from '@/data/curriculum';
import { subjects } from '@/data/curriculum';

interface ProgressContextType {
  level: number;
  xp: number;
  streakDays: number;
  lastLoginDate: string | null;
  completedLessons: string[];
  completedQuizzes: Record<string, number>;
  earnedBadges: string[];
  showLevelUp: boolean;
  setShowLevelUp: (show: boolean) => void;
  newLevel: number;
  showBadgeEarned: boolean;
  setShowBadgeEarned: (show: boolean) => void;
  newBadgeId: string | null;
  completeLesson: (lessonId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  earnBadge: (badgeId: string) => void;
  recordLogin: () => void;
  getCurrentStreak: () => number;
  getSubjectProgress: (subjectId: string) => number;
  getTopicProgress: (topicId: string) => number;
  clearProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>({});
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [prevLevel, setPrevLevel] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showBadgeEarned, setShowBadgeEarned] = useState(false);
  const [newBadgeId, setNewBadgeId] = useState<string | null>(null);
  const [lastActivityDate, setLastActivityDate] = useState<string | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Calculate level based on XP
  const calculateLevel = (xp: number): number => {
    if (xp <= 0) return 1;
    return Math.floor(Math.sqrt(xp / 50)) + 1;
  };

  // Update level and check for level up in a single effect
  useEffect(() => {
    const newLevel = calculateLevel(xp);
    if (newLevel !== currentLevel) {
      setCurrentLevel(newLevel);
      // Only show level up if we're actually leveling up, not on initial load
      if (newLevel > prevLevel && isInitialized) {
        setNewLevel(newLevel);
        setShowLevelUp(true);
        setPrevLevel(newLevel);
        
        // Check for level badges
        if (newLevel === 5) {
          earnBadge('level-5');
        }
      } else {
        // Just update the level without showing modal
        setPrevLevel(newLevel);
      }
    }
  }, [xp, currentLevel, prevLevel, isInitialized]);

  // Initialize progress document if it doesn't exist
  useEffect(() => {
    const initializeProgress = async () => {
      if (!user) {
        setIsInitialized(false);
        return;
      }

      try {
        const progressRef = doc(db, 'users', user.uid, 'progress', 'overall');
        const progressDoc = await getDoc(progressRef);

        if (!progressDoc.exists()) {
          // Initialize with zero values for new users
          const initialProgress = {
            xp: 0,
            streakDays: 0,
            completedLessons: [],
            completedQuizzes: {},
            earnedBadges: [],
            lastLoginDate: null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };

          await setDoc(progressRef, initialProgress);
          
          // Reset local state to match initial values
          setXp(0);
          setStreakDays(0);
          setCompletedLessons([]);
          setCompletedQuizzes({});
          setEarnedBadges([]);
          setLastLoginDate(null);
          setPrevLevel(1);
          setCurrentLevel(1);
        } else {
          // For existing users, fetch their current progress
          const data = progressDoc.data();
          const initialLevel = calculateLevel(data.xp || 0);
          setXp(data.xp || 0);
          setStreakDays(data.streakDays || 0);
          setCompletedLessons(data.completedLessons || []);
          setCompletedQuizzes(data.completedQuizzes || {});
          setEarnedBadges(data.earnedBadges || []);
          setLastLoginDate(data.lastLoginDate || null);
          setPrevLevel(initialLevel);
          setCurrentLevel(initialLevel);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing progress:', error);
        setIsInitialized(false);
      }
    };

    initializeProgress();
  }, [user]);

  // Update Firestore and localStorage when progress changes
  useEffect(() => {
    const updateProgress = async () => {
      if (!user || !isInitialized) return;

      try {
        const progressRef = doc(db, 'users', user.uid, 'progress', 'overall');
        await updateDoc(progressRef, {
          xp,
          streakDays,
          completedLessons,
          completedQuizzes,
          earnedBadges,
          lastLoginDate,
          updatedAt: serverTimestamp()
        });

        // Save to localStorage
        localStorage.setItem('progress', JSON.stringify({
          level: currentLevel,
          xp,
          completedLessons,
          completedQuizzes,
          earnedBadges,
          lastActivityDate,
          currentStreak
        }));
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    };

    updateProgress();
  }, [user, isInitialized, xp, streakDays, completedLessons, completedQuizzes, earnedBadges, lastLoginDate, currentLevel, lastActivityDate, currentStreak]);

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (!lastActivityDate) {
      setCurrentStreak(1);
      setLastActivityDate(today);
      return;
    }

    const lastDate = new Date(lastActivityDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
      setCurrentStreak(prev => prev + 1);
    } else if (lastDate.toISOString().split('T')[0] !== today) {
      setCurrentStreak(1);
    }
    
    setLastActivityDate(today);
  };

  const checkBadgeEligibility = () => {
    const newBadges: string[] = [];

    // Check level badges
    if (currentLevel >= 5 && !earnedBadges.includes('level-5')) newBadges.push('level-5');
    if (currentLevel >= 10 && !earnedBadges.includes('level_10')) newBadges.push('level_10');
    if (currentLevel >= 20 && !earnedBadges.includes('level_20')) newBadges.push('level_20');
    if (currentLevel >= 30 && !earnedBadges.includes('level_30')) newBadges.push('level_30');

    // Check streak badges
    if (currentStreak >= 3 && !earnedBadges.includes('streak-3')) newBadges.push('streak-3');
    if (currentStreak >= 7 && !earnedBadges.includes('streak_7')) newBadges.push('streak_7');
    if (currentStreak >= 14 && !earnedBadges.includes('streak_14')) newBadges.push('streak_14');
    if (currentStreak >= 30 && !earnedBadges.includes('streak_30')) newBadges.push('streak_30');

    // Check subject completion badges
    subjects.forEach(subject => {
      const subjectProgress = getSubjectProgress(subject.id);
      if (subjectProgress === 100) {
        const badgeId = `subject_${subject.id}`;
        if (!earnedBadges.includes(badgeId)) newBadges.push(badgeId);
      }
    });

    // Check topic completion badges
    subjects.forEach(subject => {
      subject.topics.forEach(topic => {
        const topicProgress = getTopicProgress(topic.id);
        if (topicProgress === 100) {
          const badgeId = `topic_${topic.id}`;
          if (!earnedBadges.includes(badgeId)) newBadges.push(badgeId);
        }
      });
    });

    // Check quiz performance badges
    const quizScores = Object.values(completedQuizzes);
    if (quizScores.some(score => score === 100) && !earnedBadges.includes('quiz_perfect')) {
      newBadges.push('quiz_perfect');
    }
    if (quizScores.some(score => score >= 90) && !earnedBadges.includes('quiz_excellent')) {
      newBadges.push('quiz_excellent');
    }
    if (quizScores.filter(score => score >= 80).length >= 10 && !earnedBadges.includes('quiz_consistent')) {
      newBadges.push('quiz_consistent');
    }

    // Only show the first badge earned in this check
    if (newBadges.length > 0) {
      const firstBadge = newBadges[0];
      setEarnedBadges(prev => [...prev, ...newBadges]);
      setNewBadgeId(firstBadge);
      setShowBadgeEarned(true);
      
      // If there are more badges, schedule them to be shown after a delay
      if (newBadges.length > 1) {
        setTimeout(() => {
          setNewBadgeId(newBadges[1]);
          setShowBadgeEarned(true);
        }, 2000);
      }
    }
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newXp = xp + 10;
      const newLevel = calculateLevel(newXp);
      
      setXp(newXp);
      if (newLevel > currentLevel) {
        setCurrentLevel(newLevel);
        setNewLevel(newLevel);
        setShowLevelUp(true);
      }
      
      // Update completed lessons and check for first lesson badge
      setCompletedLessons(prev => {
        const updated = [...prev, lessonId];
        // If this is the first lesson, earn the badge immediately
        if (updated.length === 1 && !earnedBadges.includes('first-lesson')) {
          setEarnedBadges(prev => [...prev, 'first-lesson']);
          setNewBadgeId('first-lesson');
          setShowBadgeEarned(true);
        }
        return updated;
      });
    }
  };

  const completeQuiz = (quizId: string, score: number) => {
    // First update completed quizzes
    setCompletedQuizzes(prev => {
      const updated = { ...prev, [quizId]: score };
      // If this is the first quiz, earn the badge immediately
      if (Object.keys(updated).length === 1 && !earnedBadges.includes('first-quiz')) {
        setEarnedBadges(prev => [...prev, 'first-quiz']);
        setNewBadgeId('first-quiz');
        setShowBadgeEarned(true);
      }
      return updated;
    });

    // Then update XP and check for level up
    setXp(prev => {
      const newXp = prev + Math.floor(score);
      const newLevel = calculateLevel(newXp);
      if (newLevel > currentLevel) {
        setCurrentLevel(newLevel);
        setNewLevel(newLevel);
        setShowLevelUp(true);
      }
      return newXp;
    });

    // Update streak
    updateStreak();

    // Check for other badges after a short delay
    setTimeout(() => {
      checkBadgeEligibility();
    }, 300);
  };

  const earnBadge = (badgeId: string) => {
    if (!earnedBadges.includes(badgeId)) {
      setEarnedBadges([...earnedBadges, badgeId]);
      setNewBadgeId(badgeId);
      setShowBadgeEarned(true);
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
        const newStreakDays = streakDays + 1;
        setStreakDays(newStreakDays);
        
        // Award bonus XP for streak milestones
        if (newStreakDays === 3) {
          setXp(prev => prev + 30);
          earnBadge('streak-3');
        }
        if (newStreakDays === 7) setXp(prev => prev + 70);
        if (newStreakDays === 14) setXp(prev => prev + 150);
        if (newStreakDays === 30) setXp(prev => prev + 300);
      } else if (lastLoginDate !== null && lastLoginDate !== today) {
        // Reset streak if not consecutive
        setStreakDays(1);
      }
      
      setLastLoginDate(today);
    }
  };

  const getCurrentStreak = () => currentStreak;

  const getSubjectProgress = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return 0;

    const totalLessons = subject.topics.reduce((acc, topic) => 
      acc + topic.subTopics.length, 0);
    
    const completedSubjectLessons = completedLessons.filter(lessonId => 
      lessonId.startsWith(subjectId)).length;

    return Math.round((completedSubjectLessons / totalLessons) * 100);
  };

  const getTopicProgress = (topicId: string) => {
    const topic = subjects.flatMap(s => s.topics).find(t => t.id === topicId);
    if (!topic) return 0;

    const totalSubTopics = topic.subTopics.length;
    const completedTopicLessons = completedLessons.filter(lessonId => 
      lessonId.includes(topicId)).length;

    return Math.round((completedTopicLessons / totalSubTopics) * 100);
  };

  const clearProgress = async () => {
    if (!user) return;

    try {
      // Reset local state
      setXp(0);
      setCurrentLevel(1);
      setPrevLevel(1);
      setCompletedLessons([]);
      setCompletedQuizzes({});
      setEarnedBadges([]);
      setStreakDays(1);
      setLastLoginDate(null);
      setLastActivityDate(null);
      setCurrentStreak(1);

      // Clear Firestore data
      const progressRef = doc(db, 'users', user.uid, 'progress', 'overall');
      await setDoc(progressRef, {
        xp: 0,
        streakDays: 1,
        completedLessons: [],
        completedQuizzes: {},
        earnedBadges: [],
        lastLoginDate: null,
        updatedAt: serverTimestamp()
      });

      // Clear localStorage
      localStorage.removeItem('progress');
    } catch (error) {
      console.error('Error clearing progress:', error);
      throw error;
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        level: currentLevel,
        xp,
        streakDays,
        lastLoginDate,
        completedLessons,
        completedQuizzes,
        earnedBadges,
        showLevelUp,
        newLevel,
        showBadgeEarned,
        newBadgeId,
        setShowLevelUp,
        setShowBadgeEarned,
        completeLesson,
        completeQuiz,
        earnBadge,
        recordLogin,
        getCurrentStreak,
        getSubjectProgress,
        getTopicProgress,
        clearProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
