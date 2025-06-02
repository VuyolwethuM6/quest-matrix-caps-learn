export const getBadges = (): Badge[] => [
  // Level Badges
  {
    id: 'level_10',
    name: 'Level 10 Achiever',
    description: 'Reached level 10',
    icon: '🎯',
    color: 'bg-blue-100 text-blue-800',
    requirement: { type: 'level', value: 10 }
  },
  {
    id: 'level_20',
    name: 'Level 20 Master',
    description: 'Reached level 20',
    icon: '🎯',
    color: 'bg-purple-100 text-purple-800',
    requirement: { type: 'level', value: 20 }
  },
  {
    id: 'level_30',
    name: 'Level 30 Legend',
    description: 'Reached level 30',
    icon: '🎯',
    color: 'bg-indigo-100 text-indigo-800',
    requirement: { type: 'level', value: 30 }
  },

  // Streak Badges
  {
    id: 'streak_7',
    name: '7-Day Streak',
    description: 'Maintained a 7-day learning streak',
    icon: '🔥',
    color: 'bg-orange-100 text-orange-800',
    requirement: { type: 'streak', value: 7 }
  },
  {
    id: 'streak_14',
    name: '14-Day Streak',
    description: 'Maintained a 14-day learning streak',
    icon: '🔥',
    color: 'bg-red-100 text-red-800',
    requirement: { type: 'streak', value: 14 }
  },
  {
    id: 'streak_30',
    name: '30-Day Streak',
    description: 'Maintained a 30-day learning streak',
    icon: '🔥',
    color: 'bg-pink-100 text-pink-800',
    requirement: { type: 'streak', value: 30 }
  },

  // Subject Completion Badges
  {
    id: 'subject_math',
    name: 'Mathematics Master',
    description: 'Completed all Mathematics topics',
    icon: '📐',
    color: 'bg-green-100 text-green-800',
    requirement: { type: 'subject_completion', value: 'mathematics' }
  },
  {
    id: 'subject_physics',
    name: 'Physics Pro',
    description: 'Completed all Physics topics',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-800',
    requirement: { type: 'subject_completion', value: 'physics' }
  },

  // Topic Completion Badges
  {
    id: 'topic_algebra',
    name: 'Algebra Ace',
    description: 'Completed all Algebra subtopics',
    icon: '📊',
    color: 'bg-blue-100 text-blue-800',
    requirement: { type: 'topic_completion', value: 'algebra' }
  },
  {
    id: 'topic_mechanics',
    name: 'Mechanics Master',
    description: 'Completed all Mechanics subtopics',
    icon: '⚙️',
    color: 'bg-purple-100 text-purple-800',
    requirement: { type: 'topic_completion', value: 'mechanics' }
  },

  // Quiz Performance Badges
  {
    id: 'quiz_perfect',
    name: 'Perfect Score',
    description: 'Achieved 100% on any quiz',
    icon: '💯',
    color: 'bg-green-100 text-green-800',
    requirement: { type: 'quiz_score', value: 100 }
  },
  {
    id: 'quiz_excellent',
    name: 'Excellent Performance',
    description: 'Achieved 90% or higher on any quiz',
    icon: '⭐',
    color: 'bg-yellow-100 text-yellow-800',
    requirement: { type: 'quiz_score', value: 90 }
  },
  {
    id: 'quiz_consistent',
    name: 'Consistent Learner',
    description: 'Completed 10 quizzes with 80% or higher',
    icon: '📈',
    color: 'bg-blue-100 text-blue-800',
    requirement: { type: 'quiz_consistency', value: { count: 10, score: 80 } }
  }
]; 