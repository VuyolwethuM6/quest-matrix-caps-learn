import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, updateDoc, serverTimestamp, collection, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Avatar = "knight" | "scholar" | "explorer";
export type Grade = "10" | "11" | "12";

export interface Subject {
  id: string;
  name: string;
}

export interface Progress {
  subjectId: string;
  completedLessons: string[];
  quizScores: {
    [quizId: string]: number;
  };
  lastAccessed: Date;
  totalTimeSpent: number; // in minutes
}

interface OnboardingData {
  name: string;
  grade: Grade | null;
  avatar: Avatar;
  selectedSubjects: Subject[];
}

interface UserContextType {
  name: string;
  grade: Grade | null;
  avatar: Avatar;
  selectedSubjects: Subject[];
  setName: (name: string) => void;
  setGrade: (grade: Grade) => void;
  setAvatar: (avatar: Avatar) => void;
  setSelectedSubjects: (subjects: Subject[]) => void;
  isOnboarded: boolean;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  updateProgress: (subjectId: string, progress: Partial<Progress>) => Promise<void>;
  getProgress: (subjectId: string) => Promise<Progress | null>;
}

const defaultContext: UserContextType = {
  name: "",
  grade: null,
  avatar: "knight",
  selectedSubjects: [],
  setName: () => {},
  setGrade: () => {},
  setAvatar: () => {},
  setSelectedSubjects: () => {},
  isOnboarded: false,
  completeOnboarding: async () => {},
  updateProgress: async () => {},
  getProgress: async () => null,
};

const UserContext = createContext<UserContextType>(defaultContext);

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user } = useAuth();
  
  const [name, setName] = useState<string>("");
  
  const [grade, setGrade] = useState<Grade | null>(null);
  
  const [avatar, setAvatar] = useState<Avatar>("knight");
  
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  // Fetch user data from Firestore when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setName("");
        setGrade(null);
        setAvatar("knight");
        setSelectedSubjects([]);
        setIsOnboarded(false);
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setName(data.name || "");
        setGrade(data.grade || null);
        setAvatar(data.avatar || "knight");
        setSelectedSubjects(data.selectedSubjects || []);
        setIsOnboarded(data.isOnboarded || false);
      }
    };

    fetchUserData();
  }, [user]);
  
  const completeOnboarding = async (data: OnboardingData) => {
    if (!user) return;

    try {
      // Update local state
      setName(data.name);
      setGrade(data.grade);
      setAvatar(data.avatar);
      setSelectedSubjects(data.selectedSubjects);

      // Save to Firestore using setDoc with merge: true
      await setDoc(doc(db, 'users', user.uid), {
        ...data,
        isOnboarded: true,
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Initialize progress for each selected subject
      const progressPromises = data.selectedSubjects.map(subject => {
        const initialProgress: Progress = {
          subjectId: subject.id,
          completedLessons: [],
          quizScores: {},
          lastAccessed: new Date(),
          totalTimeSpent: 0
        };
        return setDoc(doc(db, 'users', user.uid, 'progress', subject.id), initialProgress);
      });

      await Promise.all(progressPromises);
      setIsOnboarded(true);
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      throw error;
    }
  };

  const updateProgress = async (subjectId: string, progress: Partial<Progress>) => {
    if (!user) return;

    try {
      const progressRef = doc(db, 'users', user.uid, 'progress', subjectId);
      const progressDoc = await getDoc(progressRef);

      if (!progressDoc.exists()) {
        // Initialize progress if it doesn't exist
        const initialProgress: Progress = {
          subjectId,
          completedLessons: [],
          quizScores: {},
          lastAccessed: new Date(),
          totalTimeSpent: 0,
          ...progress
        };
        await setDoc(progressRef, initialProgress);
      } else {
        // Update existing progress
        await updateDoc(progressRef, {
          ...progress,
          lastAccessed: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  };

  const getProgress = async (subjectId: string): Promise<Progress | null> => {
    if (!user) return null;

    try {
      const progressDoc = await getDoc(doc(db, 'users', user.uid, 'progress', subjectId));
      if (progressDoc.exists()) {
        return progressDoc.data() as Progress;
      }
      return null;
    } catch (error) {
      console.error('Error fetching progress:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        name,
        grade,
        avatar,
        selectedSubjects,
        setName,
        setGrade,
        setAvatar,
        setSelectedSubjects,
        isOnboarded,
        completeOnboarding,
        updateProgress,
        getProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
