
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, onClose, newLevel }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-quest-primary bg-gradient-to-br from-quest-softPurple to-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-quest-primary">
            Level Up!
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-32 h-32 rounded-full bg-quest-primary text-white flex items-center justify-center mb-6"
          >
            <span className="text-5xl font-bold">{newLevel}</span>
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold mb-2"
          >
            Congratulations!
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground"
          >
            You've reached Level {newLevel}! Keep up the great work on your learning journey.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 animate-pulse-glow"
          >
            <button
              onClick={onClose}
              className="px-8 py-3 bg-quest-primary text-white rounded-full hover:bg-quest-secondary transition-colors"
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
