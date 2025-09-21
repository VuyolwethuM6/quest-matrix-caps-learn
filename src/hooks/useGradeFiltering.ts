import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { subjects } from "@/data/curriculum";
import { expandedSubjects, getGradeFilteredContent } from "@/data/expandedCurriculum";
import { Subject } from "@/data/models";

export const useGradeFiltering = () => {
  const { grade, selectedSubjects } = useUser();
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    if (!grade || !selectedSubjects.length) {
      setFilteredSubjects([]);
      return;
    }

    // Combine existing curriculum with expanded subjects
    const allSubjects = [...subjects, ...expandedSubjects];
    
    // Get user's selected subjects as string array
    const userSubjectIds = selectedSubjects.map(s => s.id);
    
    // Filter content based on user's grade and selected subjects
    const filtered = getGradeFilteredContent(allSubjects, grade, userSubjectIds);
    
    setFilteredSubjects(filtered);
  }, [grade, selectedSubjects]);

  return {
    filteredSubjects,
    availableSubjects: filteredSubjects
  };
};