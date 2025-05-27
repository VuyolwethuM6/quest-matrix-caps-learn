import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import type { Progress } from '@/contexts/UserContext';

export function useProgress(subjectId: string) {
  const { updateProgress, getProgress } = useUser();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const data = await getProgress(subjectId);
        setProgress(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch progress'));
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [subjectId, getProgress]);

  const markLessonComplete = async (lessonId: string) => {
    if (!progress) return;

    try {
      const updatedProgress: Partial<Progress> = {
        completedLessons: [...progress.completedLessons, lessonId]
      };
      await updateProgress(subjectId, updatedProgress);
      setProgress(prev => prev ? { ...prev, ...updatedProgress } : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update progress'));
    }
  };

  const updateQuizScore = async (quizId: string, score: number) => {
    if (!progress) return;

    try {
      const updatedProgress: Partial<Progress> = {
        quizScores: { ...progress.quizScores, [quizId]: score }
      };
      await updateProgress(subjectId, updatedProgress);
      setProgress(prev => prev ? { ...prev, ...updatedProgress } : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update quiz score'));
    }
  };

  const updateTimeSpent = async (minutes: number) => {
    if (!progress) return;

    try {
      const updatedProgress: Partial<Progress> = {
        totalTimeSpent: progress.totalTimeSpent + minutes
      };
      await updateProgress(subjectId, updatedProgress);
      setProgress(prev => prev ? { ...prev, ...updatedProgress } : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update time spent'));
    }
  };

  return {
    progress,
    loading,
    error,
    markLessonComplete,
    updateQuizScore,
    updateTimeSpent
  };
} 