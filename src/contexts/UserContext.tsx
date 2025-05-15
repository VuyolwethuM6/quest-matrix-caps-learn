
import React, { createContext, useState, useContext, useEffect } from "react";

type Avatar = "knight" | "scholar" | "explorer";

type Grade = "10" | "11" | "12";

interface Subject {
  id: string;
  name: string;
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
  completeOnboarding: () => void;
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
  completeOnboarding: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>(() => {
    const saved = localStorage.getItem("caps_user_name");
    return saved || "";
  });
  
  const [grade, setGrade] = useState<Grade | null>(() => {
    const saved = localStorage.getItem("caps_user_grade");
    return (saved as Grade) || null;
  });
  
  const [avatar, setAvatar] = useState<Avatar>(() => {
    const saved = localStorage.getItem("caps_user_avatar");
    return (saved as Avatar) || "knight";
  });
  
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem("caps_user_subjects");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    const saved = localStorage.getItem("caps_user_onboarded");
    return saved === "true";
  });
  
  const completeOnboarding = () => setIsOnboarded(true);
  
  useEffect(() => {
    localStorage.setItem("caps_user_name", name);
    localStorage.setItem("caps_user_grade", grade || "");
    localStorage.setItem("caps_user_avatar", avatar);
    localStorage.setItem("caps_user_subjects", JSON.stringify(selectedSubjects));
    localStorage.setItem("caps_user_onboarded", String(isOnboarded));
  }, [name, grade, avatar, selectedSubjects, isOnboarded]);

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
