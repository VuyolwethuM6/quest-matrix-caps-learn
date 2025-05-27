import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isOnboarded } = useUser();
  const [showLogo, setShowLogo] = useState(true);
  
  useEffect(() => {
    // Only proceed with navigation after auth state is loaded
    if (authLoading) return;

    const timer = setTimeout(() => {
      setShowLogo(false);
      
      // Wait for exit animation to complete
      setTimeout(() => {
        if (!user) {
          // If not authenticated, go to login
          navigate("/login");
        } else if (!isOnboarded) {
          // If authenticated but not onboarded, go to onboarding
          navigate("/onboarding");
        } else {
          // If authenticated and onboarded, go to dashboard
          navigate("/dashboard");
        }
      }, 500);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, user, isOnboarded, authLoading]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-quest-primary to-quest-purple p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: showLogo ? 1 : 1.1, opacity: showLogo ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="bg-white p-6 rounded-full mb-6 inline-block">
          <img 
            src="/viva-logo.png" 
            alt="Viva Quest Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-3">Viva</h1>
        <h2 className="text-xl text-white opacity-90">Study Smarter. Rise Higher.</h2>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
