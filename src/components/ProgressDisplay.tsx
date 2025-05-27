import React from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Progress } from '@/contexts/UserContext';

interface ProgressDisplayProps {
  subjectId: string;
}

export function ProgressDisplay({ subjectId }: ProgressDisplayProps) {
  const { progress, loading, error } = useProgress(subjectId);

  if (loading) {
    return <div>Loading progress...</div>;
  }

  if (error) {
    return <div>Error loading progress: {error.message}</div>;
  }

  if (!progress) {
    return <div>No progress data available</div>;
  }

  const completedLessonsCount = progress.completedLessons.length;
  const totalQuizzes = Object.keys(progress.quizScores).length;
  const averageQuizScore = totalQuizzes > 0
    ? Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / totalQuizzes
    : 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Progress Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Completed Lessons</p>
            <p className="text-2xl font-bold">{completedLessonsCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Quiz Score</p>
            <p className="text-2xl font-bold">{averageQuizScore.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time Spent</p>
            <p className="text-2xl font-bold">{progress.totalTimeSpent} min</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Accessed</p>
            <p className="text-2xl font-bold">
              {new Date(progress.lastAccessed).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {totalQuizzes > 0 && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">Quiz Scores</h3>
          <div className="space-y-2">
            {Object.entries(progress.quizScores).map(([quizId, score]) => (
              <div key={quizId} className="flex justify-between items-center">
                <span className="text-sm">{quizId}</span>
                <span className="font-medium">{score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 