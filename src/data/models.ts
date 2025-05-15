
export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  subTopics: SubTopic[];
}

export interface SubTopic {
  id: string;
  name: string;
  description: string;
  content: ContentBlock[];
  quiz: Quiz;
}

export type ContentBlockType = 'text' | 'image' | 'formula' | 'example';

export interface ContentBlock {
  type: ContentBlockType;
  id: string;
  content: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export type QuestionType = 'mcq' | 'true-false';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export interface Avatar {
  id: string;
  name: string;
  image: string;
}
