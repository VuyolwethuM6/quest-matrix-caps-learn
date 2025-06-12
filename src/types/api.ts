export interface Subject {
  id: string;
  name: string;
  schedule: string;
}

export interface SubjectMarks {
  currentMarks: string;
  targetMarks: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  guardianName: string;
  guardianContact: string;
  selectedSubjects: string[];
  marks: {
    [key: string]: SubjectMarks;
  };
  paymentDate: string;
}

export interface ApiResponse {
  message?: string;
  error?: string;
  details?: string;
} 