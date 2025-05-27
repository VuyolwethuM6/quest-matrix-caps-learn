import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Avatar = "knight" | "scholar" | "explorer";
export type Grade = "10" | "11" | "12";

export interface Subject {
  id: string;
  name: string;
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

      // Save to Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        isOnboarded: true,
        updatedAt: serverTimestamp()
      });

      setIsOnboarded(true);
    } catch (error) {
      console.error('Error saving onboarding data:', error);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
