import { Subject } from './models';

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Develop problem-solving skills through algebra, geometry, and calculus',
    icon: 'calculator',
    color: 'bg-quest-blue',
    topics: [
      {
        id: 'algebra',
        name: 'Algebra',
        description: 'Learn about equations, expressions, and functions',
        subTopics: [
          {
            id: 'quadratic-equations',
            name: 'Quadratic Equations',
            description: 'Solving and graphing quadratic equations',
            content: [
              {
                type: 'text',
                id: 'quadratic-intro',
                content: 'A quadratic equation is a second-order polynomial equation in a single variable x with the general form: \\[ax^2 + bx + c = 0\\] where a ≠ 0. The solutions to this equation are called the roots or zeros of the function.'
              },
              {
                type: 'formula',
                id: 'quadratic-formula',
                content: 'The quadratic formula states that the solution to ax^2 + bx + c = 0 is: \\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]'
              },
              {
                type: 'text',
                id: 'discriminant',
                content: 'The expression under the square root (b^2 - 4ac) is called the discriminant. It determines the nature of the roots: If b^2 - 4ac > 0, there are two distinct real roots. If b^2 - 4ac = 0, there is one repeated real root. If b^2 - 4ac < 0, there are no real roots; the solutions are complex numbers.'
              },
              {
                type: 'example',
                id: 'quadratic-example',
                content: 'Example: Solve x^2 - 5x + 6 = 0\n\nStep 1: Identify a = 1, b = -5, c = 6\n\nStep 2: Apply the quadratic formula:\nx = (-(-5) ± √((-5)^2 - 4(1)(6)))/(2(1))\nx = (5 ± √(25 - 24))/2\nx = (5 ± √1)/2\nx = (5 ± 1)/2\nx = 3 or x = 2\n\nThe roots are x = 2 and x = 3.'
              },
              {
                type: 'image',
                id: 'quadratic-graph',
                content: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format'
              }
            ],
            quiz: {
              id: 'quadratic-quiz',
              title: 'Quadratic Equations Quiz',
              description: 'Test your understanding of quadratic equations',
              questions: [
                {
                  id: 'q1',
                  type: 'mcq',
                  text: 'What is the discriminant of the equation x^2 - 4x + 4 = 0?',
                  options: ['0', '4', '16', '-16'],
                  correctAnswer: 0,
                  explanation: 'For x^2 - 4x + 4 = 0, a = 1, b = -4, c = 4. The discriminant is b^2 - 4ac = (-4)^2 - 4(1)(4) = 16 - 16 = 0.'
                },
                {
                  id: 'q2',
                  type: 'true-false',
                  text: 'A quadratic equation always has exactly two real roots.',
                  correctAnswer: false,
                  explanation: 'A quadratic equation can have two distinct real roots, one repeated real root (discriminant = 0), or no real roots (discriminant < 0).'
                },
                {
                  id: 'q3',
                  type: 'mcq',
                  text: 'Which of the following is the solution to x^2 + 3x - 10 = 0?',
                  options: ['x = 2, x = -5', 'x = 3, x = -5', 'x = 2, x = -3', 'x = 5, x = -2'],
                  correctAnswer: 0,
                  explanation: 'Using the quadratic formula with a = 1, b = 3, c = -10: x = (-3 ± √(9 + 40))/2 = (-3 ± √49)/2 = (-3 ± 7)/2, which gives x = 2 or x = -5.'
                }
              ]
            }
          },
          {
            id: 'linear-equations',
            name: 'Linear Equations',
            description: 'Understanding and solving linear equations',
            content: [
              {
                type: 'text',
                id: 'linear-intro',
                content: 'A linear equation is an equation that forms a straight line when graphed. In standard form, it looks like: \\[ax + b = c\\] where a, b, and c are constants and a ≠ 0.'
              },
              {
                type: 'example',
                id: 'linear-example',
                content: 'Example: Solve 2x + 5 = 13\n\nStep 1: Subtract 5 from both sides\n2x = 8\n\nStep 2: Divide both sides by 2\nx = 4\n\nThe solution is x = 4.'
              }
            ],
            quiz: {
              id: 'linear-quiz',
              title: 'Linear Equations Quiz',
              description: 'Test your understanding of linear equations',
              questions: [
                {
                  id: 'q1',
                  type: 'mcq',
                  text: 'What is the solution to 3x - 7 = 2x + 5?',
                  options: ['x = 12', 'x = -12', 'x = 3', 'x = -3'],
                  correctAnswer: 0,
                  explanation: '3x - 7 = 2x + 5\n3x - 2x = 5 + 7\nx = 12'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'geometry',
        name: 'Geometry',
        description: 'Explore shapes, sizes, properties of space',
        subTopics: [
          {
            id: 'trigonometry',
            name: 'Trigonometry',
            description: 'Study of relationships between angles and sides of triangles',
            content: [
              {
                type: 'text',
                id: 'trig-intro',
                content: 'Trigonometry is the study of relationships between the sides and angles of triangles. The primary trigonometric functions are sine, cosine, and tangent.'
              },
              {
                type: 'formula',
                id: 'trig-formulas',
                content: 'In a right triangle with angle θ:\n\\[\\sin(\\theta) = \\frac{opposite}{hypotenuse}\\]\n\\[\\cos(\\theta) = \\frac{adjacent}{hypotenuse}\\]\n\\[\\tan(\\theta) = \\frac{opposite}{adjacent} = \\frac{\\sin(\\theta)}{\\cos(\\theta)}\\]'
              }
            ],
            quiz: {
              id: 'trig-quiz',
              title: 'Trigonometry Quiz',
              description: 'Test your knowledge of basic trigonometry',
              questions: [
                {
                  id: 'q1',
                  type: 'true-false',
                  text: 'The sine of 30 degrees is 1/2.',
                  correctAnswer: true,
                  explanation: 'sin(30°) = 1/2 is a fundamental trigonometric value.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'physical-sciences',
    name: 'Physical Sciences',
    description: 'Explore the fundamental laws governing matter, energy, and their interactions',
    icon: 'atom',
    color: 'bg-quest-purple',
    topics: [
      {
        id: 'mechanics',
        name: 'Mechanics',
        description: 'Study of motion and forces',
        subTopics: [
          {
            id: 'newtons-laws',
            name: "Newton's Laws of Motion",
            description: 'Three fundamental laws describing the relationship between motion and forces',
            content: [
              {
                type: 'text',
                id: 'newton-intro',
                content: "Newton's three laws of motion are fundamental principles in classical mechanics that describe the relationship between an object and the forces acting upon it."
              },
              {
                type: 'text',
                id: 'first-law',
                content: "Newton's First Law: An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This is also known as the law of inertia."
              },
              {
                type: 'text',
                id: 'second-law',
                content: "Newton's Second Law: The rate of change of momentum of an object is directly proportional to the force applied, and occurs in the direction of the applied force. Mathematically: F = ma, where F is the force applied, m is the mass of the object, and a is the acceleration."
              },
              {
                type: 'formula',
                id: 'second-law-formula',
                content: '\\[F = m \\times a\\]'
              },
              {
                type: 'text',
                id: 'third-law',
                content: "Newton's Third Law: For every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body."
              }
            ],
            quiz: {
              id: 'newton-quiz',
              title: "Newton's Laws Quiz",
              description: 'Test your understanding of the laws of motion',
              questions: [
                {
                  id: 'q1',
                  type: 'mcq',
                  text: "Which of Newton's laws is also known as the law of inertia?",
                  options: ['First Law', 'Second Law', 'Third Law', 'Fourth Law'],
                  correctAnswer: 0,
                  explanation: "Newton's First Law is also known as the law of inertia, stating that an object will remain at rest or in uniform motion unless acted upon by an external force."
                },
                {
                  id: 'q2',
                  type: 'true-false',
                  text: "According to Newton's Second Law, force equals mass times acceleration.",
                  correctAnswer: true,
                  explanation: "Newton's Second Law is expressed mathematically as F = ma, where F is force, m is mass, and a is acceleration."
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

// Helper functions to get data by ID
export const getSubjectById = (subjectId: string): Subject | undefined => {
  return subjects.find(subject => subject.id === subjectId);
};

export const getTopicById = (subjectId: string, topicId: string) => {
  const subject = getSubjectById(subjectId);
  return subject?.topics.find(topic => topic.id === topicId);
};

export const getSubTopicById = (subjectId: string, topicId: string, subtopicId: string) => {
  const topic = getTopicById(subjectId, topicId);
  return topic?.subTopics.find(subtopic => subtopic.id === subtopicId);
};

export const getBadges = (): Badge[] => [
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    condition: 'Complete 1 lesson'
  },
  {
    id: 'first-quiz',
    name: 'Quiz Whiz',
    description: 'Complete your first quiz',
    icon: '🧠',
    condition: 'Complete 1 quiz'
  },
  {
    id: 'streak-3',
    name: 'On Fire',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    condition: 'Login for 3 consecutive days'
  },
  {
    id: 'level-5',
    name: 'Rising Star',
    description: 'Reach Level 5',
    icon: '⭐',
    condition: 'Reach level 5'
  }
];

export const getAvatars = (): Avatar[] => [
  {
    id: 'knight',
    name: 'Knowledge Knight',
    image: '🛡️'
  },
  {
    id: 'scholar',
    name: 'Sage Scholar',
    image: '🧙‍♂️'
  },
  {
    id: 'explorer',
    name: 'Eager Explorer',
    image: '🧭'
  }
];

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
};

export type Avatar = {
  id: string;
  name: string;
  image: string;
};

export default subjects;
