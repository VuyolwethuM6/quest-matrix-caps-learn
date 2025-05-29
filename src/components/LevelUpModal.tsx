import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, onClose, newLevel }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-sm mx-auto rounded-2xl border-quest-primary bg-gradient-to-br from-quest-softPurple to-white p-4 sm:p-6">
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={150}
            gravity={0.3}
          />
        )}
        
        <DialogHeader className="px-2 sm:px-4">
          <DialogTitle className="text-center text-lg sm:text-xl font-bold text-quest-primary">
            Level Up!
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-3 sm:py-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-quest-primary text-white flex items-center justify-center mb-3 sm:mb-4"
          >
            <span className="text-3xl sm:text-4xl font-bold">{newLevel}</span>
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg font-bold mb-1"
          >
            Congratulations!
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 px-2"
          >
            You've reached Level {newLevel}! Keep up the great work.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2"
          >
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-quest-primary text-white rounded-full hover:bg-quest-secondary transition-colors text-sm active:scale-95 touch-manipulation"
            >
              Continue Quest
            </button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelUpModal;