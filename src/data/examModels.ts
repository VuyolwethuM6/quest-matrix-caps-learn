
export interface ExamQuestion {
  id: string;
  questionText: string;
  diagram?: string; // URL to diagram image
  type: 'mcq' | 'short-answer' | 'essay' | 'calculation' | 'true-false';
  marks: number;
  subQuestions?: SubQuestion[];
  // For simple questions without sub-questions
  options?: string[];
  correctAnswer?: string | number | boolean;
  explanation?: string;
}

export interface SubQuestion {
  id: string;
  questionText: string;
  type: 'mcq' | 'short-answer' | 'calculation' | 'true-false';
  marks: number;
  options?: string[];
  correctAnswer?: string | number | boolean;
  explanation?: string;
}

export interface ExamPaper {
  id: string;
  subject: string;
  year: number;
  paper: 1 | 2;
  duration: number; // in minutes
  totalMarks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: ExamQuestion[];
}
