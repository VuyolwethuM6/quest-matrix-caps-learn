import { TopicPractice } from './topicPracticeModels';

export const topicPractices: TopicPractice[] = [
  {
    id: "newtons-laws-practice-1",
    subject: "Physical Sciences",
    topicId: "newtons-laws",
    subtopicId: "force-diagrams",
    difficulty: "Medium",
    questions: [
      {
        id: "p1",
        questionText: "Draw a free-body diagram for a box being pushed on a rough surface",
        type: "short-answer",
        marks: 5,
        diagram: "/diagrams/box-forces.svg",
        correctAnswer: "Diagram should show: Weight (mg) downward, Normal force (N) upward, Applied force (F) horizontal, Friction force (f) opposite to motion",
        explanation: "A free-body diagram shows all forces acting on an object",
        hints: [
          "Remember to include all forces",
          "Consider the direction of each force",
          "Don't forget about friction"
        ],
        stepByStepSolution: "1. Draw the object\n2. Add weight force\n3. Add normal force\n4. Add applied force\n5. Add friction force",
        commonMistakes: [
          "Forgetting to include friction",
          "Drawing forces in wrong directions",
          "Missing the normal force"
        ],
        relatedConcepts: [
          "Newton's First Law",
          "Friction",
          "Force components"
        ]
      },
      {
        id: "p2",
        questionText: "A 5kg box is being pushed with a force of 20N on a surface with a coefficient of friction of 0.3. Calculate the acceleration of the box.",
        type: "calculation",
        marks: 8,
        correctAnswer: "1.06 m/s²",
        explanation: "Use F = ma and consider both applied force and friction",
        hints: [
          "First calculate the normal force",
          "Then calculate the friction force",
          "Use F = ma to find acceleration"
        ],
        stepByStepSolution: "1. Calculate normal force (N = mg = 5 × 9.8 = 49N)\n2. Calculate friction force (f = μN = 0.3 × 49 = 14.7N)\n3. Net force = Applied force - Friction = 20 - 14.7 = 5.3N\n4. Use F = ma: 5.3 = 5a\n5. Solve for a: a = 1.06 m/s²",
        commonMistakes: [
          "Forgetting to subtract friction force",
          "Using wrong units",
          "Not considering all forces"
        ],
        relatedConcepts: [
          "Newton's Second Law",
          "Friction",
          "Force calculations"
        ]
      }
    ]
  }
]; 