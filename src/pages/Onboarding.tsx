import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { getAvatars } from "@/data/curriculum";
import { toast } from "react-hot-toast";
import type { Avatar, Grade, Subject } from "@/contexts/UserContext";

const steps = ["welcome", "grade", "subjects", "avatar"];

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useUser();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [avatar, setAvatar] = useState<Avatar>("knight");
  
  const currentStep = steps[currentStepIndex];
  const avatars = getAvatars();
  
  const handleNext = async () => {
    if (currentStepIndex === 3) {
      try {
        const onboardingData = {
          name: userName,
          grade,
          avatar,
          selectedSubjects
        };
        
        await completeOnboarding(onboardingData);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error completing onboarding:', error);
        toast.error('Failed to save your information. Please try again.');
      }
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  
  const canContinue = () => {
    switch (currentStep) {
      case "welcome":
        return userName.trim().length > 0;
      case "grade":
        return grade !== null;
      case "subjects":
        return selectedSubjects.length > 0;
      case "avatar":
        return avatar !== null;
      default:
        return false;
    }
  };
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`h-2 flex-1 mx-1 rounded-full ${
                index <= currentStepIndex
                  ? "bg-quest-primary"
                  : "bg-quest-softPurple"
              }`}
            />
          ))}
        </div>
        
        {/* Step content */}
        <motion.div
          key={currentStep}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {currentStep === "welcome" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Welcome to CAPS Quest!</h1>
              <p className="mb-6 text-muted-foreground">
                Embark on an exciting journey to master your CAPS curriculum.
                Let's start by getting to know you.
              </p>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  What's your name?
                </label>
                <Input
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full"
                />
              </div>
            </>
          )}
          
          {currentStep === "grade" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Select Your Grade</h1>
              <p className="mb-6 text-muted-foreground">
                Choose your current grade level to see relevant content.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {(["8", "9", "10", "11", "12"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g as Grade)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      grade === g
                        ? "border-quest-primary bg-quest-softPurple"
                        : "border-border hover:border-quest-primary"
                    }`}
                  >
                    <span className="text-2xl font-bold block">Grade {g}</span>
                  </button>
                ))}
              </div>
            </>
          )}
          
          {currentStep === "subjects" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Available Subjects</h1>
              <p className="mb-6 text-muted-foreground">
                Select the STEM subjects you want to study:
              </p>
              
              <div className="space-y-4">
                {[
                  { id: "mathematics", name: "Mathematics" },
                  { id: "natural-sciences", name: "Natural Sciences" },
                  { id: "physical-sciences", name: "Physical Sciences" },
                  { id: "life-sciences", name: "Life Sciences" },
                  { id: "technology", name: "Technology" },
                  { id: "engineering-graphics-design", name: "Engineering Graphics & Design" }
                ].map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => {
                      setSelectedSubjects(prev => {
                        const exists = prev.some(s => s.id === subject.id);
                        if (exists) {
                          return prev.filter(s => s.id !== subject.id);
                        }
                        return [...prev, subject];
                      });
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedSubjects.some(s => s.id === subject.id)
                        ? "border-quest-primary bg-quest-softPurple"
                        : "border-border hover:border-quest-primary"
                    }`}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </>
          )}
          
          {currentStep === "avatar" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Choose Your Avatar</h1>
              <p className="mb-6 text-muted-foreground">
                Select a character to represent you on your learning quest.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {avatars.map((avatarOption) => (
                  <button
                    key={avatarOption.id}
                    onClick={() => setAvatar(avatarOption.id as Avatar)}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                      avatar === avatarOption.id
                        ? "border-quest-primary bg-quest-softPurple"
                        : "border-border hover:border-quest-primary"
                    }`}
                  >
                    <span className="text-4xl mb-2">{avatarOption.image}</span>
                    <span className="text-sm font-medium">{avatarOption.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
        
        {/* Navigation buttons */}
        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={!canContinue()}
            className="bg-quest-primary hover:bg-quest-secondary"
          >
            {currentStepIndex === steps.length - 1 ? "Start Quest" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
