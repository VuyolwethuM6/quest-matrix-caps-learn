import { Grade } from "@/contexts/UserContext";

export interface GradeConfig {
  grade: Grade;
  availableSubjects: string[];
  subjectNames: Record<string, string>;
}

export const gradeConfigurations: Record<Grade, GradeConfig> = {
  "8": {
    grade: "8",
    availableSubjects: ["mathematics", "natural-sciences", "technology"],
    subjectNames: {
      "mathematics": "Mathematics",
      "natural-sciences": "Natural Sciences",
      "technology": "Technology"
    }
  },
  "9": {
    grade: "9", 
    availableSubjects: ["mathematics", "natural-sciences", "technology"],
    subjectNames: {
      "mathematics": "Mathematics",
      "natural-sciences": "Natural Sciences", 
      "technology": "Technology"
    }
  },
  "10": {
    grade: "10",
    availableSubjects: ["mathematics", "physical-sciences", "life-sciences", "technology", "engineering-graphics-design"],
    subjectNames: {
      "mathematics": "Mathematics",
      "physical-sciences": "Physical Sciences",
      "life-sciences": "Life Sciences",
      "technology": "Technology", 
      "engineering-graphics-design": "Engineering Graphics & Design"
    }
  },
  "11": {
    grade: "11",
    availableSubjects: ["mathematics", "physical-sciences", "life-sciences", "technology", "engineering-graphics-design"],
    subjectNames: {
      "mathematics": "Mathematics",
      "physical-sciences": "Physical Sciences", 
      "life-sciences": "Life Sciences",
      "technology": "Technology",
      "engineering-graphics-design": "Engineering Graphics & Design"
    }
  },
  "12": {
    grade: "12",
    availableSubjects: ["mathematics", "physical-sciences", "life-sciences", "technology", "engineering-graphics-design"],
    subjectNames: {
      "mathematics": "Mathematics",
      "physical-sciences": "Physical Sciences",
      "life-sciences": "Life Sciences", 
      "technology": "Technology",
      "engineering-graphics-design": "Engineering Graphics & Design"
    }
  }
};

export const getSubjectsForGrade = (grade: Grade): string[] => {
  return gradeConfigurations[grade]?.availableSubjects || [];
};

export const getSubjectNameForGrade = (subjectId: string, grade: Grade): string => {
  return gradeConfigurations[grade]?.subjectNames[subjectId] || subjectId;
};

export const isSubjectAvailableForGrade = (subjectId: string, grade: Grade): boolean => {
  return gradeConfigurations[grade]?.availableSubjects.includes(subjectId) || false;
};