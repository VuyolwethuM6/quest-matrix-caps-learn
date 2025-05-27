import React, { useEffect, useRef } from 'react';
import { useProgress } from '@/hooks/useProgress';

interface TimeTrackerProps {
  subjectId: string;
  lessonId: string;
}

export function TimeTracker({ subjectId, lessonId }: TimeTrackerProps) {
  const { updateTimeSpent } = useProgress(subjectId);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Start tracking time when component mounts
    startTimeRef.current = Date.now();

    // Update time spent every minute
    intervalRef.current = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / (1000 * 60));
      if (timeSpent > 0) {
        updateTimeSpent(timeSpent);
        startTimeRef.current = Date.now(); // Reset start time after updating
      }
    }, 60000); // Check every minute

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Update final time spent
      const finalTimeSpent = Math.floor((Date.now() - startTimeRef.current) / (1000 * 60));
      if (finalTimeSpent > 0) {
        updateTimeSpent(finalTimeSpent);
      }
    };
  }, [subjectId, lessonId, updateTimeSpent]);

  return null; // This is a utility component that doesn't render anything
} 