
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isOnboarded } = useUser();
  const [showLogo, setShowLogo] = useState(true);
  
  useEffect(() => {
    // Display splash screen for 2 seconds
    const timer = setTimeout(() => {
      setShowLogo(false);
      
      // Wait for exit animation to complete
      setTimeout(() => {
        if (isOnboarded) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }, 500);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, isOnboarded]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-quest-primary to-quest-purple p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: showLogo ? 1 : 1.1, opacity: showLogo ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="bg-white p-6 rounded-full mb-6 inline-block">
          <span className="text-6xl">🎓</span>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-3">CAPS Quest</h1>
        <h2 className="text-xl text-white opacity-90">Master the Matrix</h2>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
