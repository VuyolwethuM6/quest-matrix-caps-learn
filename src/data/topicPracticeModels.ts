import { ExamQuestion } from './examModels';

export interface TopicPractice {
  id: string;
  subject: string;
  topicId: string;
  subtopicId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: PracticeQuestion[];
}

export interface PracticeQuestion extends ExamQuestion {
  hints?: string[];
  stepByStepSolution?: string;
  solutionDiagram?: string;
  commonMistakes?: string[];
  relatedConcepts?: string[];
}

// Helper functions for topic practice
export const topicPracticeHelpers = {
  getPracticeByTopic: (practices: TopicPractice[], topicId: string): TopicPractice[] => {
    return practices.filter(practice => practice.topicId === topicId);
  },
  
  getPracticeBySubtopic: (practices: TopicPractice[], subtopicId: string): TopicPractice[] => {
    return practices.filter(practice => practice.subtopicId === subtopicId);
  },

  getPracticeByDifficulty: (practices: TopicPractice[], difficulty: 'Easy' | 'Medium' | 'Hard'): TopicPractice[] => {
    return practices.filter(practice => practice.difficulty === difficulty);
  },

  getPracticeBySubject: (practices: TopicPractice[], subject: string): TopicPractice[] => {
    return practices.filter(practice => practice.subject === subject);
  }
}; 