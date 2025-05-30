interface StudyPlan {
  id: string;
  topic: string;
  date: string;
  createdAt: string;
}

// In a real application, this would be stored in a database
let studyPlans: StudyPlan[] = [];

export const createStudyPlan = async (topic: string, date: string): Promise<StudyPlan> => {
  const newPlan: StudyPlan = {
    id: Math.random().toString(36).substr(2, 9),
    topic,
    date,
    createdAt: new Date().toISOString(),
  };

  studyPlans.push(newPlan);
  return newPlan;
};

export const getStudyPlans = async (): Promise<StudyPlan[]> => {
  return studyPlans;
};

export const deleteStudyPlan = async (id: string): Promise<void> => {
  studyPlans = studyPlans.filter(plan => plan.id !== id);
}; 