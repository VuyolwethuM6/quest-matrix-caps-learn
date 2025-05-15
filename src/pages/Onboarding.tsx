
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { getAvatars } from "@/data/curriculum";

const steps = ["welcome", "grade", "subjects", "avatar"];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { setName, setGrade, setAvatar, setSelectedSubjects, completeOnboarding } = useUser();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<"10" | "11" | "12" | null>(null);
  const [selectedAvatar, setSelectedAvatarState] = useState("");
  
  const currentStep = steps[currentStepIndex];
  const avatars = getAvatars();
  
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Save all the data and complete onboarding
      setName(userName);
      if (selectedGrade) setGrade(selectedGrade);
      setAvatar(selectedAvatar as any);
      setSelectedSubjects([
        { id: "mathematics", name: "Mathematics" },
        { id: "physical-sciences", name: "Physical Sciences" },
      ]);
      completeOnboarding();
      navigate("/dashboard");
    }
  };
  
  const canContinue = () => {
    switch (currentStep) {
      case "welcome":
        return userName.trim().length > 0;
      case "grade":
        return selectedGrade !== null;
      case "subjects":
        return true; // Pre-selected subjects for MVP
      case "avatar":
        return selectedAvatar !== "";
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
                {(["10", "11", "12"] as const).map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedGrade === grade
                        ? "border-quest-primary bg-quest-softPurple"
                        : "border-border hover:border-quest-primary"
                    }`}
                  >
                    <span className="text-2xl font-bold block">Grade {grade}</span>
                  </button>
                ))}
              </div>
            </>
          )}
          
          {currentStep === "subjects" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Available Subjects</h1>
              <p className="mb-6 text-muted-foreground">
                For this MVP version, we're focusing on these core subjects:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border-2 border-quest-primary bg-quest-softPurple flex items-center gap-3">
                  <span className="text-xl">🧮</span>
                  <span className="font-medium">Mathematics</span>
                </div>
                
                <div className="p-4 rounded-xl border-2 border-quest-primary bg-quest-softPurple flex items-center gap-3">
                  <span className="text-xl">⚗️</span>
                  <span className="font-medium">Physical Sciences</span>
                </div>
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
                {avatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatarState(avatar.id)}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                      selectedAvatar === avatar.id
                        ? "border-quest-primary bg-quest-softPurple"
                        : "border-border hover:border-quest-primary"
                    }`}
                  >
                    <span className="text-4xl mb-2">{avatar.image}</span>
                    <span className="text-sm font-medium">{avatar.name}</span>
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
};

export default Onboarding;
