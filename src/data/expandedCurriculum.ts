import { Subject } from './models';

// Expanded curriculum to include all STEM subjects for grades 8-12
export const expandedSubjects: Subject[] = [
  {
    "id": "natural-sciences",
    "name": "Natural Sciences",
    "description": "Foundation science for grades 8-9",
    "icon": "microscope",
    "color": "bg-quest-green",
    "grades": ["8", "9"],
    "topics": [
      {
        "id": "matter-materials",
        "name": "Matter and Materials",
        "description": "Understanding the basic properties of matter",
        "grade": "8",
        "subTopics": [
          {
            "id": "atoms-elements",
            "name": "Atoms and Elements",
            "description": "Learn about the building blocks of matter",
            "content": [
              {
                "type": "text",
                "id": "atoms-intro",
                "content": "Atoms are the smallest units of matter that retain the properties of an element."
              }
            ],
            "quiz": {
              "id": "atoms-quiz",
              "title": "Atoms and Elements Quiz",
              "description": "Test your understanding of atoms and elements",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is the smallest unit of matter?",
                  "options": ["Molecule", "Atom", "Compound", "Element"],
                  "correctAnswer": 1,
                  "explanation": "An atom is the smallest unit of matter that retains the properties of an element."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "id": "technology",
    "name": "Technology",
    "description": "Design and innovation through technology",
    "icon": "gear",
    "color": "bg-quest-orange",
    "grades": ["8", "9", "10", "11", "12"],
    "topics": [
      {
        "id": "design-process",
        "name": "Design Process",
        "description": "Learn the systematic approach to solving problems",
        "grade": "8",
        "subTopics": [
          {
            "id": "problem-identification",
            "name": "Problem Identification",
            "description": "How to identify and define problems",
            "content": [
              {
                "type": "text",
                "id": "problem-intro",
                "content": "The design process begins with identifying a problem or need."
              }
            ],
            "quiz": {
              "id": "design-quiz",
              "title": "Design Process Quiz", 
              "description": "Test your understanding of the design process",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is the first step in the design process?",
                  "options": ["Testing", "Problem identification", "Building", "Research"],
                  "correctAnswer": 1,
                  "explanation": "The design process begins with identifying and defining the problem."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "id": "life-sciences",
    "name": "Life Sciences",
    "description": "Study of living organisms and life processes",
    "icon": "dna",
    "color": "bg-quest-teal",
    "grades": ["10", "11", "12"],
    "topics": [
      {
        "id": "cell-biology",
        "name": "Cell Biology",
        "description": "Understanding cellular structure and function",
        "grade": "10",
        "subTopics": [
          {
            "id": "cell-structure",
            "name": "Cell Structure",
            "description": "Learn about organelles and their functions",
            "content": [
              {
                "type": "text",
                "id": "cell-intro",
                "content": "Cells are the basic units of life, containing specialized structures called organelles."
              }
            ],
            "quiz": {
              "id": "cell-quiz",
              "title": "Cell Structure Quiz",
              "description": "Test your knowledge of cell organelles",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "Which organelle controls the cell's activities?",
                  "options": ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
                  "correctAnswer": 1,
                  "explanation": "The nucleus contains DNA and controls cellular activities."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "id": "engineering-graphics-design",
    "name": "Engineering Graphics & Design",
    "description": "Technical drawing and design principles",
    "icon": "drafting-compass",
    "color": "bg-quest-slate",
    "grades": ["10", "11", "12"],
    "topics": [
      {
        "id": "technical-drawing",
        "name": "Technical Drawing",
        "description": "Learn the fundamentals of engineering drawing",
        "grade": "10",
        "subTopics": [
          {
            "id": "drawing-standards",
            "name": "Drawing Standards",
            "description": "Understanding technical drawing conventions",
            "content": [
              {
                "type": "text",
                "id": "standards-intro",
                "content": "Technical drawings follow standardized conventions for clarity and consistency."
              }
            ],
            "quiz": {
              "id": "drawing-quiz",
              "title": "Drawing Standards Quiz",
              "description": "Test your knowledge of technical drawing standards",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What type of line is used for hidden edges?",
                  "options": ["Solid line", "Dashed line", "Dotted line", "Chain line"],
                  "correctAnswer": 1,
                  "explanation": "Dashed lines represent hidden or invisible edges in technical drawings."
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

// Helper function to get subjects available for a specific grade
export const getSubjectsForGrade = (grade: string): Subject[] => {
  return expandedSubjects.filter(subject => subject.grades.includes(grade));
};

// Helper function to get content filtered by grade
export const getGradeFilteredContent = (subjects: Subject[], userGrade: string, userSubjects: string[]): Subject[] => {
  return subjects
    .filter(subject => 
      userSubjects.includes(subject.id) && 
      subject.grades.includes(userGrade)
    )
    .map(subject => ({
      ...subject,
      topics: subject.topics.filter(topic => 
        !topic.grade || topic.grade === userGrade
      )
    }));
};