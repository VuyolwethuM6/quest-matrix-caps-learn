import { Subject } from './models';
import { Info, Lightbulb } from "lucide-react";

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
                content: 'The expression under the square root \\(b^2 - 4ac\\) is called the discriminant. It determines the nature of the roots: If \\(b^2 - 4ac > 0\\), there are two distinct real roots. If \\(b^2 - 4ac = 0\\), there is one repeated real root. If \\(b^2 - 4ac < 0\\), there are no real roots; the solutions are complex numbers.'
              },
              {
                type: 'example',
                id: 'quadratic-example',
                content: 'Example: Solve \\(x^2 - 5x + 6 = 0\\)\n\nStep 1: Identify \\(a = 1\\), \\(b = -5\\), \\(c = 6\\)\n\nStep 2: Apply the quadratic formula:\n\\[x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(1)(6)}}{2(1)}\\]\n\\[x = \\frac{5 \\pm \\sqrt{25 - 24}}{2}\\]\n\\[x = \\frac{5 \\pm \\sqrt{1}}{2}\\]\n\\[x = \\frac{5 \\pm 1}{2}\\]\n\\[x = 3 \\text{ or } x = 2\\]\n\nThe roots are \\(x = 2\\) and \\(x = 3\\).'
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
      ,
      {
        id: 'functions',
        name: 'Functions',
        description: 'Study of mathematical relationships and their properties',
        subTopics: [
          {
            id: 'function-basics',
            name: 'Function Basics',
            description: 'Understanding the fundamental concepts of functions',
            content: [
              {
                type: 'text',
                id: 'function-intro',
                content: 'A function is a relation between a set of inputs (domain) and a set of possible outputs (range) where each input is related to exactly one output. Functions are typically written as f(x) where x is the input.'
              },
              {
                type: 'formula',
                id: 'function-notation',
                content: 'Function notation: \\[f(x) = y\\] where x is the input and y is the output.'
              },
              {
                type: 'example',
                id: 'function-example',
                content: 'Example: Let f(x) = 2x + 3\n\nWhen x = 2:\nf(2) = 2(2) + 3 = 7\n\nWhen x = -1:\nf(-1) = 2(-1) + 3 = 1'
              },
              {
                type: 'image',
                id: 'function-graph',
                content: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format'
              }
            ],
            quiz: {
              id: 'function-basics-quiz',
              title: 'Function Basics Quiz',
              description: 'Test your understanding of basic function concepts',
              questions: [
                {
                  id: 'q1',
                  type: 'mcq',
                  text: 'What is the output of f(x) = 3x - 2 when x = 4?',
                  options: ['10', '12', '14', '16'],
                  correctAnswer: 0,
                  explanation: 'f(4) = 3(4) - 2 = 12 - 2 = 10'
                },
                {
                  id: 'q2',
                  type: 'true-false',
                  text: 'In a function, each input can have multiple outputs.',
                  correctAnswer: false,
                  explanation: 'A function must have exactly one output for each input.'
                }
              ]
            }
          },
          {
            id: 'function-types',
            name: 'Types of Functions',
            description: 'Explore different types of functions and their properties',
            content: [
              {
                type: 'text',
                id: 'function-types-intro',
                content: 'There are several types of functions, each with unique properties and characteristics. Common types include linear, quadratic, exponential, and trigonometric functions.'
              },
              {
                type: 'formula',
                id: 'function-types-formulas',
                content: 'Common function types:\n\nLinear: \\[f(x) = mx + b\\]\nQuadratic: \\[f(x) = ax^2 + bx + c\\]\nExponential: \\[f(x) = a^x\\]\nTrigonometric: \\[f(x) = \\sin(x), \\cos(x), \\tan(x)\\]'
              }
            ],
            quiz: {
              id: 'function-types-quiz',
              title: 'Types of Functions Quiz',
              description: 'Test your knowledge of different function types',
              questions: [
                {
                  id: 'q1',
                  type: 'mcq',
                  text: 'Which of the following is a linear function?',
                  options: ['f(x) = x²', 'f(x) = 2x + 3', 'f(x) = sin(x)', 'f(x) = 2^x'],
                  correctAnswer: 1,
                  explanation: 'f(x) = 2x + 3 is a linear function because it has the form f(x) = mx + b.'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'patterns',
        name: 'Patterns',
        description: 'Discover and analyze mathematical patterns and sequences',
        subTopics: [
          {
            id: 'arithmetic-sequences',
            name: 'Arithmetic Sequences',
            description: 'Study of sequences with constant differences between terms',
            content: [
              {
                type: 'text',
                id: 'arithmetic-intro',
                content: 'An arithmetic sequence is a sequence of numbers where the difference between consecutive terms is constant. This constant difference is called the common difference.'
              },
              {
                type: 'formula',
                id: 'arithmetic-formula',
                content: 'The nth term of an arithmetic sequence: \\[a_n = a_1 + (n-1)d\\]\nwhere:\n\\(a_n\\) is the nth term\n\\(a_1\\) is the first term\nd is the common difference'
              },
              {
                type: 'example',
                id: 'arithmetic-example',
                content: 'Example: Find the 10th term of the sequence 3, 7, 11, 15, ...\n\nStep 1: Identify \\(a_1 = 3\\) and \\(d = 4\\)\n\nStep 2: Use the formula:\n\\(a_{10} = 3 + (10-1)4\\)\n\\(a_{10} = 3 + 36\\)\n\\(a_{10} = 39\\)'
              }
            ],
            quiz: {
              id: 'arithmetic-quiz',
              title: 'Arithmetic Sequences Quiz',
              description: 'Test your understanding of arithmetic sequences',
              questions: [
                {
                  id: 'q1',
                  type: 'mcq',
                  text: 'What is the common difference in the sequence 2, 5, 8, 11, ...?',
                  options: ['2', '3', '4', '5'],
                  correctAnswer: 1,
                  explanation: 'The difference between consecutive terms is 3 (5-2=3, 8-5=3, 11-8=3).'
                }
              ]
            }
          },
          {
            id: 'geometric-sequences',
            name: 'Geometric Sequences',
            description: 'Study of sequences with constant ratios between terms',
            content: [
              {
                type: 'text',
                id: 'geometric-intro',
                content: 'A geometric sequence is a sequence of numbers where the ratio between consecutive terms is constant. This constant ratio is called the common ratio.'
              },
              {
                type: 'formula',
                id: 'geometric-formula',
                content: 'The nth term of a geometric sequence: \\[a_n = a_1 \\times r^{n-1}\\]\nwhere:\n\\(a_n\\) is the nth term\n\\(a_1\\) is the first term\nr is the common ratio'
              },
              {
                type: 'example',
                id: 'geometric-example',
                content: 'Example: Find the 6th term of the sequence 2, 6, 18, 54, ...\n\nStep 1: Identify \\(a_1 = 2\\) and \\(r = 3\\)\n\nStep 2: Use the formula:\n\\(a_6 = 2 \\times 3^{6-1}\\)\n\\(a_6 = 2 \\times 3^5\\)\n\\(a_6 = 2 \\times 243\\)\n\\(a_6 = 486\\)'
              }
            ],
            quiz: {
              id: 'geometric-quiz',
              title: 'Geometric Sequences Quiz',
              description: 'Test your understanding of geometric sequences',
              questions: [
                {
                  id: 'q1',
                  type: 'mcq',
                  text: 'What is the common ratio in the sequence 3, 6, 12, 24, ...?',
                  options: ['2', '3', '4', '6'],
                  correctAnswer: 0,
                  explanation: 'The ratio between consecutive terms is 2 (6/3=2, 12/6=2, 24/12=2).'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  //Physical Sciences content

  {
    id: 'physical-sciences',
    name: 'Physical Sciences',
    description: 'Explore the fundamental laws governing matter, energy, and their interactions',
    icon: 'atom',
    color: 'bg-quest-purple',
    topics: [
        {
          "id": "newtons-laws",
          "name": "Newton's Laws of Motion",
          "description": "Learn how forces affect motion using Newton's three laws.",
          "subTopics": [
            {
              "id": "newtons-first-law",
              "name": "Newton's First Law",
              "description": "Objects stay still or keep moving straight unless a force changes things!",
              "content": [
                {
                  "type": "text",
                  "id": "first-law-intro",
                  "content": "***Newton's First Law states:** *An object continues in a state of rest or uniform velocity (constant speed in a straight line) unless acted upon by a net (resultant) force.* \n\n *Newton’s first law of motion is sometimes referred to as the law of* **inertia.** \n\n"
                },
                {
                  "type": "text",
                  "id": "first-law-inertia",
                  "content": "***Inertia:** *is the tendency of an object to resist any change in its state of rest or uniform motion. (Uniform motion is motion with constant velocity)*"
                },
                {
                  "type": "text",
                  "id": "first-law-mass",
                  "content": "The **mass** of an object is the measure of its inertia"
                },
                {
                  "type": "example",
                  "id": "first-law-sa-example",
                  "content": " In a Pretoria minibus taxi, when the driver suddenly accelerates, your body wants to stay at rest (thanks to **inertia**). You feel like you're sliding backward—not because you're really moving backward, but because your body is resisting the forward motion. The seat (and hopefully your seatbelt) applies a force to change your motion."
                },
                {
                  "type": "text",
                  "id": "resultant",
                  "content": "📌**Tip:** *Refer to the diagram below for a visual summary of these points — it's a great way to understand what the law really means!*"
                },
                {
                  "type": "image",
                  "id": "resulant-force",
                  "content": "/public/assests/resultant-force.PNG"
                },
                {
                  "type": "text",
                  "id": "first-law-practise-statement",
                  "content": "**Now that we have learnt about Newtown law lets tackle some basic questions!**"
                },
                {
                  "type": "practice",
                  "id": "first-law-practice-1",
                  "content": {
                    "question": "A car is moving at a **constant velocity** of 60 km/h. What is the net force acting on the car?",
                    "options": [
                      "Zero - because constant velocity means balanced forces",
                      "60 N in the direction of motion",
                      "The weight of the car",
                      "The force of the engine"
                    ],
                    "correctAnswer": 0,
                    "explanation": "According to Newton's First Law, an object moving at constant velocity has no net force acting on it. The forces are balanced - the engine force equals the opposing forces (friction, air resistance)."
                  }
                },
                {
                  "type": "practice",
                  "id": "first-law-practice-2",
                  "content": {
                    "question": "When a moving car **suddenly stops**, why do passengers **continue to move** forward?",
                    "options": [
                      "The car's brakes push them forward",
                      "They are trying to maintain their constant velocity (inertia)",
                      "The seat pushes them forward",
                      "Gravity pulls them forward"
                    ],
                    "correctAnswer": 1,
                    "explanation": "This is a classic example of inertia (Newton's First Law). The passengers' bodies tend to maintain their constant velocity when the car stops. Without a seatbelt, there's no force to stop their forward motion."
                  }
                },
                {
                  "type": "practice",
                  "id": "first-law-practice-3",
                  "content": {
                    "question": "How do safety belts help prevent injury during sudden stops?",
                    "options": [
                      "They make the car stop more slowly",
                      "They provide the unbalanced force needed to stop the passenger's motion",
                      "They reduce the car's speed",
                      "They make the passenger lighter"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Safety belts provide the necessary unbalanced force to stop the passenger's forward motion (Newton's First Law). Without a seatbelt, the passenger would continue moving forward until hitting the dashboard or windshield."
                  }
                },
                {
                  "type": "practice",
                  "id": "first-law-practice",
                  "content": {
                    "question": "A crate of oranges sits still on a Durban market stall. Why doesn’t it move?",
                    "options": [
                      "The stall’s upward force equals the crate’s weight",
                      "The crate is glued to the stall",
                      "The air holds it down",
                      "The crate has no mass"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The normal force from the stall balances the crate’s weight (gravity), so the net force is zero, and it stays at rest."
                  }
                },
                {
                  "type": "tip",
                  "id": "first-law-memory-aid",
                  "content": " **Things don’t move or stop unless something makes them!** \n *Like that ball you kicked in the street — it only stops because the road, a wall, or a parked car gets in the way*"
                }
              ],
              "quiz": {
                "id": "first-law-quiz",
                "title": "Newton's First Law Quiz",
                "description": "Test your understanding of inertia and balanced forces!",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "What is the net force on a car moving at a constant 80 km/h on the N1? (From document, page 8)",
                    "options": [
                      "Zero",
                      "100 N",
                      "500 N",
                      "Depends on the car’s mass"
                    ],
                    "correctAnswer": 0,
                    "explanation": "A car at constant velocity has no net force (F_net = 0 N), as forces like engine and friction balance out. (From document, page 8)"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "An object can change direction without a net force acting on it.",
                    "correctAnswer": false,
                    "explanation": "Newton’s First Law says any change in velocity (speed or direction) requires a net force. (From document, page 7)"
                  },

                ]
              }
            },
            {
              "id": "newtons-second-law",
              "name": "Newton's Second Law: Force = Mass × Acceleration",
              "description": "The push you give and the object’s heft decide how fast it zips!",
              "content": [
                {
                  "type": "text",
                  "id": "second-law-intro",
                  "content": "Newton’s Second Law states: A net force (F_net) on an object causes it to accelerate in the direction of the force. The acceleration (a) is directly proportional to the force and inversely proportional to the mass (m). Formula: F_net = ma. (From document, page 4)"
                },
                {
                  "type": "formula",
                  "id": "second-law-formula",
                  "content": "\\[ F_{\\text{net}} = ma \\]\nWhere:\n- \\( F_{\\text{net}} \\) = Net force (Newtons, N)\n- \\( m \\) = Mass (kg)\n- \\( a \\) = Acceleration (m/s²)"
                },
                {
                  "type": "example",
                  "id": "second-law-sa-example",
                  "content": "Example: At a Cape Town market, you push a 10 kg crate of fish with 32 N. Friction is 7 N. Net force = 32 N - 7 N = 25 N. Acceleration = \\( F_{\\text{net}}/m = 25/10 = 2.5 \\text{ m/s}^2 \\) to the right. (From document, page 8)"
                },
                {
                  "type": "image",
                  "id": "second-law-diagram",
                  "content": "Free-body diagram: For the 10 kg crate, arrows show:\n- 32 N applied force right\n- 7 N friction left\n- Normal force up\n- Weight (10 × 9.8 = 98 N) down\nNet force = 25 N right. (From document, page 8)"
                },
                {
                  "type": "text",
                  "id": "second-law-memory-hook",
                  "content": "🧠 Memory Trick: 'More push, more zoom! Heavier stuff, less zoom.' Think of pushing a light trolley vs. a heavy one at Pick n Pay!"
                },
                {
                  "type": "practice",
                  "id": "second-law-practice",
                  "content": {
                    "question": "A 4.5 kg laundry cart is pushed with 60 N. What’s the acceleration? (Ignore friction) (From document, page 10)",
                    "options": [
                      "13.33 m/s²",
                      "6 m/s²",
                      "60 m/s²",
                      "0.075 m/s²"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\\( F_{\\text{net}} = ma \\), so \\( a = F/m = 60/4.5 = 13.33 \\text{ m/s}^2 \\). (From document, page 10)"
                  }
                },
                {
                  "type": "example",
                  "id": "second-law-vertical-example",
                  "content": "Example: A crane in Durban lifts a 335 kg pallet of bricks at 3.33 m/s². Net force = \\( F_{\\text{net}} = ma = 335 × 3.33 = 1115.55 \\text{ N} \\) upwards. (From document, page 11)"
                }
              ],
              "quiz": {
                "id": "second-law-quiz",
                "title": "Newton’s Second Law Quiz",
                "description": "Test your skills with force, mass, and acceleration!",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "A 380 kg pile of rubble is pushed with 900 kN. What’s the acceleration? (Ignore friction) (From document, page 17)",
                    "options": [
                      "2368.42 m/s²",
                      "2.37 m/s²",
                      "900 m/s²",
                      "0.42 m/s²"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\\( a = F/m = 900,000/380 = 2368.42 \\text{ m/s}^2 \\). (From document, page 17)"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "If mass doubles and force stays the same, acceleration halves. (From document, page 8)",
                    "correctAnswer": true,
                    "explanation": "\\( a = F/m \\), so if mass doubles, acceleration is halved (inversely proportional)."
                  },

                ]
              }
            },
            {
              "id": "newtons-third-law",
              "name": "Newton's Third Law: Action = Reaction",
              "description": "Every push gets an equal push back — on a different object!",
              "content": [
                {
                  "type": "text",
                  "id": "third-law-intro",
                  "content": "Newton’s Third Law states: When object A exerts a force on object B, object B exerts an equal and opposite force on object A. These forces are equal in magnitude, opposite in direction, act on different objects, and occur simultaneously. They don’t cancel out. (From document, page 4)"
                },
                {
                  "type": "example",
                  "id": "third-law-sa-example",
                  "content": "Example: At a Soweto market, you push a cart of vegetables. Your hands push the cart (action), and the cart pushes your hands back (reaction). You move because your feet push on the ground, which pushes you back. (From document, page 9)"
                },
                {
                  "type": "text",
                  "id": "third-law-properties",
                  "content": "Properties of action-reaction pairs:\n• Equal magnitude\n• Opposite direction\n• Act on different objects\n• Simultaneous\n• Don’t cancel out (different objects)."
                },
                {
                  "type": "text",
                  "id": "third-law-points",
                  "content": "Properties of action-reaction pairs:\n\n* Equal magnitude\n* Opposite direction\n* Act on different objects\n* Simultaneous\n* Don't cancel out (different objects)"
                },
                {
                  "type": "image",
                  "id": "third-law-diagram",
                  "content": "Diagram: A learner presses a book against a table. Action: book pushes down on table. Reaction: table pushes up on book. (From document, page 17)"
                },
                {
                  "type": "text",
                  "id": "third-law-memory-hook",
                  "content": "⚖️ Memory Trick: 'Push me, I push you back!' Like bouncing on a Cape Town trampoline — you push down, it pushes up!"
                },
                {
                  "type": "practice",
                  "id": "third-law-practice",
                  "content": {
                    "question": "A hammer hits a nail. What’s the reaction force? (From document, page 18)",
                    "options": [
                      "Nail pushes back on hammer",
                      "Hammer pushes on ground",
                      "Nail’s weight pulls down",
                      "Air resists the hammer"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Hammer exerts force on nail (action); nail exerts equal force back on hammer (reaction). (From document, page 18, Q1.3)"
                  }
                }
              ],
              "quiz": {
                "id": "third-law-quiz",
                "title": "Newton’s Third Law Quiz",
                "description": "Can you identify action-reaction pairs?",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "A brick on a scaffold is held up by the scaffold’s force. What’s the reaction force? (From document, page 18)",
                    "options": [
                      "Earth pulls brick down",
                      "Brick pushes down on scaffold",
                      "Scaffold pushes Earth",
                      "Air pushes brick"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Scaffold pushes up on brick (action); brick pushes down on scaffold (reaction). (From document, page 18, Q1.2)"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "Action-reaction forces act on the same object and cancel out. (From document, page 10)",
                    "correctAnswer": false,
                    "explanation": "They act on different objects, so they don’t cancel out."
                  },

                ]
              }
            },
            {
              "id": "force-diagrams",
              "name": "Force and Free-Body Diagrams",
              "description": "Master drawing forces to ace your exams!",
              "content": [
                {
                  "type": "text",
                  "id": "diagrams-intro",
                  "content": "Force diagrams show all forces acting on an object with arrows. Free-body diagrams replace the object with a dot, showing forces acting on it. Label forces correctly (e.g., F_applied, F_friction, w, N) and ensure arrows touch the dot in free-body diagrams. (From document, page 6)"
                },
                {
                  "type": "example",
                  "id": "diagrams-sa-example",
                  "content": "Example: A 7 kg block is pushed with 250 N at 30° on a rough surface with 45 N friction. Force diagram: shows block with arrows for 250 N at 30°, friction left, weight down, normal force up. Free-body diagram: same forces on a dot. (From document, page 6)"
                },
                {
                  "type": "image",
                  "id": "diagrams-example",
                  "content": "Diagram: For the 7 kg block:\n- Force diagram: Arrows for 250 N at 30°, 45 N friction left, weight (7 × 9.8 = 68.6 N) down, normal force up.\n- Free-body diagram: Same forces, but block is a dot. (From document, page 6)"
                },
                {
                  "type": "text",
                  "id": "diagrams-tips",
                  "content": "Tips:\n- Label forces (e.g., F_applied, F_friction, w, N).\n- Arrows must touch the dot in free-body diagrams.\n- Match number of forces to marks (e.g., 4 marks = 4 forces).\n- Use SI units (kg, N, m/s²). (From document, page 1)"
                },
                {
                  "type": "practice",
                  "id": "diagrams-practice",
                  "content": {
                    "question": "A 10 kg toolbox is pushed with 23 N left. Which force is NOT in its free-body diagram? (From document, page 18)",
                    "options": [
                      "Normal force",
                      "Weight",
                      "Applied force",
                      "Table’s force on floor"
                    ],
                    "correctAnswer": 3,
                    "explanation": "Free-body diagram shows forces on the toolbox: normal force, weight (98 N), applied force (23 N), friction (if present). Table’s force on floor acts on the table. (From document, page 18, Q2)"
                  }
                }
              ],
              "quiz": {
                "id": "diagrams-quiz",
                "title": "Force and Free-Body Diagrams Quiz",
                "description": "Test your diagram-drawing skills!",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "A wheelbarrow is pushed with 35 N at 30° with 14 N friction. What’s the net force? (From document, page 18)",
                    "options": [
                      "49 N",
                      "21 N",
                      "16.31 N",
                      "44.31 N"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Horizontal force = \\( 35 \\cos 30° = 30.31 \\text{ N} \\). Net force = \\( 30.31 - 14 = 16.31 \\text{ N} \\). (From document, page 18, Q1.4)"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "In a free-body diagram, force arrows must touch the dot. (From document, page 1)",
                    "correctAnswer": true,
                    "explanation": "Arrows must touch the dot to show they act on the object, or marks are lost."
                  },

                ]
              }
            },
            {
              "id": "revision-concepts",
              "name": "Revision: Key Forces and Concepts",
              "description": "Brush up on forces like weight, friction, and tension!",
              "content": [
                {
                  "type": "text",
                  "id": "revision-intro",
                  "content": "Key concepts from Grades 10 and 11:\n- **Mass**: Amount of matter (kg).\n- **Weight**: Gravitational force, \\( w = mg \\), g = 9.8 m/s².\n- **Normal force (N)**: Perpendicular force from a surface.\n- **Frictional force (F_f)**: Opposes motion; static (\\( f_s = \\mu_s F_N \\)) or kinetic (\\( f_k = \\mu_k F_N \\)).\n- **Tension (T)**: Force in a string or rope. (From document, page 5)"
                },
                {
                  "type": "example",
                  "id": "revision-weight-example",
                  "content": "Example: A 10 kg crate in a Joburg warehouse has weight \\( w = mg = 10 × 9.8 = 98 \\text{ N} \\). If mass is given in grams, convert to kg first. (From document, page 5)"
                },
                {
                  "type": "example",
                  "id": "revision-angle-example",
                  "content": "Example: A 250 N force at 30° to the horizontal is applied to a block. Horizontal component = \\( F_x = 250 \\cos 30° = 216.5 \\text{ N} \\). Vertical component = \\( F_y = 250 \\sin 30° = 125 \\text{ N} \\). (From document, page 6)"
                },
                {
                  "type": "text",
                  "id": "revision-memory-hook",
                  "content": "🧠 Memory Trick: 'Weight pulls down, normal pushes up, friction fights motion!' Think of a heavy box sliding across a shop floor in Soweto."
                },
                {
                  "type": "practice",
                  "id": "revision-practice",
                  "content": {
                    "question": "What’s the weight of a 5 kg crate? (From document, page 5)",
                    "options": [
                      "49 N",
                      "5 N",
                      "50 N",
                      "9.8 N"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\\( w = mg = 5 × 9.8 = 49 \\text{ N} \\). Weight is the gravitational force. (From document, page 5)"
                  }
                }
              ],
              "quiz": {
                "id": "revision-quiz",
                "title": "Revision Concepts Quiz",
                "description": "Test your knowledge of forces and calculations!",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "A 60 kg crate is pulled with 190 N at 30°. What’s the horizontal force component? (From document, page 20)",
                    "options": [
                      "164.54 N",
                      "95 N",
                      "190 N",
                      "28 N"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\\( F_x = 190 \\cos 30° = 164.54 \\text{ N} \\). (From document, page 20)"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "Weight and mass are the same thing. (From document, page 5)",
                    "correctAnswer": false,
                    "explanation": "Mass is the amount of matter (kg); weight is the gravitational force (\\( w = mg \\), in N)."
                  },

                ]
              }
            }
          ]
        },
        //Vertical Projectile Motion content
        {
          "id": "vertical-projectile-motion",
          "name": "Vertical Projectile Motion",
          "description": "Understand the motion of objects moving vertically under the influence of gravity.",
          "subTopics": [
            {
              "id": "vertical-motion-concepts",
              "name": "Key Concepts",
              "description": "Explore the fundamental principles of vertical projectile motion.",
              "content": [
                {
                  "type": "text",
                  "id": "vertical-motion-intro",
                  "content": "Vertical projectile motion involves objects moving straight up or down under the influence of gravity. The motion is symmetrical: the time taken to rise is equal to the time taken to fall back to the same level."
                },
                {
                  "type": "formula",
                  "id": "vertical-motion-formulas",
                  "content": "Key equations:\n\n\\[ v = u + at \\]\n\\[ s = ut + \\frac{1}{2}at^2 \\]\n\\[ v^2 = u^2 + 2as \\]\n\nWhere:\n- \\( v \\): final velocity (m/s)\n- \\( u \\): initial velocity (m/s)\n- \\( a \\): acceleration (m/s²) (\\( -9.8 \\) m/s² for downward motion)\n- \\( t \\): time (s)\n- \\( s \\): displacement (m)"
                },
                {
                  "type": "example",
                  "id": "vertical-motion-example",
                  "content": "Example: A ball is thrown vertically upward with an initial velocity of 20 m/s. Calculate the maximum height reached.\n\nAt maximum height, final velocity \\( v = 0 \\).\n\nUsing \\( v^2 = u^2 + 2as \\):\n\n\\[ 0 = (20)^2 + 2(-9.8)(s) \\]\n\\[ 0 = 400 - 19.6s \\]\n\\[ s = \\frac{400}{19.6} \\approx 20.41 \\text{ m} \\]"
                },
                {
                  "type": "text",
                  "id": "vertical-motion-tip",
                  "content": "🎯 Tip: Always take upward direction as positive and downward as negative to maintain consistency in sign conventions."
                },
                {
                  "type": "image",
                  "id": "vertical-motion-diagram",
                  "content": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Vertical_projectile_motion.svg/512px-Vertical_projectile_motion.svg.png"
                }
              ],
              "quiz": {
                "id": "vertical-motion-quiz",
                "title": "Vertical Projectile Motion Quiz",
                "description": "Assess your understanding of vertical projectile motion concepts.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "An object is thrown upward with a velocity of 15 m/s. How long does it take to reach the maximum height?",
                    "options": ["1.5 s", "2.0 s", "1.0 s", "3.0 s"],
                    "correctAnswer": 0,
                    "explanation": "At maximum height, \\( v = 0 \\). Using \\( v = u + at \\):\n\\[ 0 = 15 + (-9.8)t \\]\n\\[ t = \\frac{15}{9.8} \\approx 1.53 \\text{ s} \\]"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "The acceleration due to gravity is zero at the maximum height of the projectile.",
                    "correctAnswer": false,
                    "explanation": "Acceleration due to gravity is constant at \\( -9.8 \\) m/s² throughout the motion, including at the maximum height."
                  }
                ]
              }
            }
          ]
        },
      
        //Momentum content
        {
          "id": "momentum",
          "name": "Momentum & Impulse",
          "description": "Explore the principles of momentum and its conservation in isolated systems.",
          "subTopics": [
            {
              "id": "momentum-concepts",
              "name": "Key Concepts",
              "description": "Understand momentum, impulse, and the principle of conservation of momentum.",
              "content": [
                {
                  "type": "text",
                  "id": "momentum-definition",
                  "content": "Momentum is the product of an object's mass and its velocity. It tells us how much motion the object has and how hard it is to stop."
                },
                {
                  "type": "formula",
                  "id": "momentum-formula",
                  "content": "\\[ p = mv \\] where:\np = momentum (kg·m/s)\nm = mass (kg)\nv = velocity (m/s)"
                },
                {
                  "type": "text",
                  "id": "momentum-impulse",
                  "content": "Impulse is the change in momentum. It is equal to the force applied multiplied by the time it is applied for."
                },
                {
                  "type": "formula",
                  "id": "impulse-formula",
                  "content": "\\[ \\text{Impulse} = F\\Delta t = \\Delta p \\]"
                },
                {
                  "type": "text",
                  "id": "conservation-of-momentum",
                  "content": "In a closed system with no external forces, total momentum before an event equals total momentum after:\n\\[ m_1v_{1i} + m_2v_{2i} = m_1v_{1f} + m_2v_{2f} \\]"
                },
                {
                  "type": "example",
                  "id": "momentum-example-collision",
                  "content": "Two trolleys collide: Trolley A (2 kg) moves at 3 m/s, and Trolley B (2 kg) is stationary. After collision, A and B stick and move together.\n\nInitial total momentum: \\( p = 2 \\times 3 + 2 \\times 0 = 6 \\text{ kg·m/s} \\)\nFinal momentum: \\( p = (2 + 2)v \\Rightarrow 4v = 6 \\Rightarrow v = 1.5 \\text{ m/s} \\)"
                },
                {
                  "type": "text",
                  "id": "momentum-memory-hook",
                  "content": "💥 Easy way to remember: 'Momentum = Mass in Motion!'"
                }
              ],
              "quiz": {
                "id": "momentum-quiz",
                "title": "Momentum Quiz",
                "description": "Check your understanding of momentum and collisions.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "What is the momentum of a 5 kg ball moving at 2 m/s?",
                    "options": [
                      "2.5 kg·m/s",
                      "10 kg·m/s",
                      "7 kg·m/s",
                      "0.4 kg·m/s"
                    ],
                    "correctAnswer": 1,
                    "explanation": "p = mv = 5 × 2 = 10 kg·m/s"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "Momentum is always conserved in any type of collision.",
                    "correctAnswer": true,
                    "explanation": "In isolated systems with no external forces, total momentum is always conserved."
                  },
                  {
                    "id": "q3",
                    "type": "mcq",
                    "text": "If two objects stick together after a collision, it is:",
                    "options": [
                      "Elastic",
                      "Inelastic",
                      "Static",
                      "Explosive"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When objects stick together after collision, it's an inelastic collision."
                  }
                ]
              }
            }
          ]
        },

        //Work and Energy content
        {
          "id": "work-energy-power",
          "name": "Work, Energy & Power",
          "description": "Explore how energy is transferred and used to do work and how power measures the rate of energy transfer.",
          "subTopics": [
            {
              "id": "work-energy-concepts",
              "name": "Key Concepts",
              "description": "Understand the definitions and formulas of work, energy, and power.",
              "content": [
                {
                  "type": "text",
                  "id": "work-definition",
                  "content": "Work is done when a force moves an object in the direction of the force. No movement, no work!"
                },
                {
                  "type": "formula",
                  "id": "work-formula",
                  "content": "\\[ W = Fd \\cos(\\theta) \\] where:\\nW = work (Joules)\\nF = force (Newtons)\\nd = distance (m)\\n\\(\\theta\\) = angle between force and direction of motion"
                },
                {
                  "type": "text",
                  "id": "energy-definition",
                  "content": "Energy is the ability to do work. It exists in different forms like kinetic and potential energy."
                },
                {
                  "type": "formula",
                  "id": "kinetic-energy-formula",
                  "content": "\\[ E_k = \\frac{1}{2}mv^2 \\]"
                },
                {
                  "type": "formula",
                  "id": "potential-energy-formula",
                  "content": "\\[ E_p = mgh \\]"
                },
                {
                  "type": "text",
                  "id": "power-definition",
                  "content": "Power is how fast work is done or energy is transferred."
                },
                {
                  "type": "formula",
                  "id": "power-formula",
                  "content": "\\[ P = \\frac{W}{t} \\] or \\[ P = Fv \\]"
                },
                {
                  "type": "example",
                  "id": "work-example-local",
                  "content": "A street vendor pushes a cart with 100 N of force for 10 m. \\( W = Fd = 100 \\times 10 = 1000 \\text{ J} \\)"
                },
                {
                  "type": "text",
                  "id": "work-memory-hook",
                  "content": "⚙️ Remember: 'Work is force with movement.' No movement = no work!"
                }
              ],
              "quiz": {
                "id": "work-energy-quiz",
                "title": "Work, Energy & Power Quiz",
                "description": "Test your knowledge of work, energy, and power.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "What is the work done if 50 N of force is applied and the object doesn't move?",
                    "options": [
                      "50 J",
                      "0 J",
                      "25 J",
                      "Can't be determined"
                    ],
                    "correctAnswer": 1,
                    "explanation": "No movement means no work. W = Fd = 50 × 0 = 0 J."
                  },
                  {
                    "id": "q2",
                    "type": "mcq",
                    "text": "What is the kinetic energy of a 2 kg object moving at 3 m/s?",
                    "options": [
                      "12 J",
                      "9 J",
                      "6 J",
                      "18 J"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Eₖ = ½mv² = ½ × 2 × 3² = 9 J"
                  },
                  {
                    "id": "q3",
                    "type": "true-false",
                    "text": "Power is energy divided by time.",
                    "correctAnswer": true,
                    "explanation": "Yes, P = W/t, where W is energy transferred or work done."
                  }
                ]
              }
            }
          ]
        },
        
        // Doppler Effect content
        {
          "id": "waves-doppler-effect",
          "name": "Waves: Doppler Effect",
          "description": "Understand how motion affects the frequency of sound and light waves.",
          "subTopics": [
            {
              "id": "doppler-effect-concepts",
              "name": "Doppler Effect",
              "description": "Learn how the observed frequency of a wave changes when the source or observer is moving.",
              "content": [
                {
                  "type": "text",
                  "id": "doppler-intro",
                  "content": "The Doppler Effect happens when the source of a wave or the observer is moving. The wave frequency appears higher if they move closer, and lower if they move apart."
                },
                {
                  "type": "example",
                  "id": "doppler-example-sa",
                  "content": "Example: An ambulance in Soweto drives past. As it approaches, the siren sounds higher-pitched. As it passes and moves away, the pitch drops. That's the Doppler Effect in action."
                },
                {
                  "type": "formula",
                  "id": "doppler-formula-source",
                  "content": "\\[ f_L = f_S \\left( \\frac{v}{v \\mp v_S} \\right) \\] — when the source is moving, observer is stationary.\nUse minus (–) when source moves **towards** listener, plus (+) when **away**."
                },
                {
                  "type": "formula",
                  "id": "doppler-formula-observer",
                  "content": "\\[ f_L = f_S \\left( \\frac{v \\pm v_L}{v} \\right) \\] — when the listener moves, source is stationary.\nUse plus (+) when listener moves **towards** source, minus (–) when **away**."
                },
                {
                  "type": "text",
                  "id": "doppler-memory-hook",
                  "content": "👂 Think: 'Closer = higher pitch, Farther = lower pitch.' Like a passing taxi with loud music!"
                }
              ],
              "quiz": {
                "id": "doppler-quiz",
                "title": "Doppler Effect Quiz",
                "description": "Test your understanding of frequency changes due to motion.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "When a sound source moves toward you, what happens to the sound?",
                    "options": [
                      "It gets softer",
                      "Its frequency increases",
                      "Its frequency decreases",
                      "It echoes"
                    ],
                    "correctAnswer": 1,
                    "explanation": "As the source approaches, wave crests bunch up — this increases frequency (higher pitch)."
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "If you move away from a siren, it sounds lower in pitch.",
                    "correctAnswer": true,
                    "explanation": "Yes — moving away spreads out the waves, lowering frequency (and pitch)."
                  },
                  {
                    "id": "q3",
                    "type": "mcq",
                    "text": "Which situation does **not** involve the Doppler Effect?",
                    "options": [
                      "A moving police car's siren",
                      "You walking toward a speaker",
                      "Watching a music video on TV",
                      "A car honking as it passes you"
                    ],
                    "correctAnswer": 2,
                    "explanation": "TV sound is recorded and not affected by relative motion — no Doppler Effect involved."
                  }
                ]
              }
            }
          ]
        },

        // Electrostatics content
        {
          "id": "electrostatics",
          "name": "Electrostatics",
          "description": "Explore how electric charges interact and create forces without touching.",
          "subTopics": [
            {
              "id": "electrostatic-principles",
              "name": "Electric Charges and Coulomb's Law",
              "description": "Understand how like and unlike charges interact and how force depends on distance and charge size.",
              "content": [
                {
                  "type": "text",
                  "id": "electrostatics-intro",
                  "content": "Electrostatics deals with electric charges at rest. Like charges repel, and opposite charges attract — all without touching!"
                },
                {
                  "type": "example",
                  "id": "electrostatics-example-sa",
                  "content": "Example: After taking off your wool beanie in Cape Town, your hair stands up. Why? Electrons move, and hairs become similarly charged — they repel each other!"
                },
                {
                  "type": "formula",
                  "id": "coulombs-law",
                  "content": "\\[ F = k \\frac{|q_1 q_2|}{r^2} \\]\nWhere:\nF = force between charges (N)\nq₁ and q₂ = the charges (C)\nr = distance between charges (m)\nk = 9 × 10^9 Nm²/C²"
                },
                {
                  "type": "text",
                  "id": "electrostatics-memory-hook",
                  "content": "⚡ Think: 'Same signs fight, opposite signs unite.' And the closer they are, the stronger the zap!"
                }
              ],
              "quiz": {
                "id": "electrostatics-quiz",
                "title": "Electrostatics Quiz",
                "description": "Check your knowledge of electric charges and their interactions.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "What happens when two negative charges are brought close together?",
                    "options": [
                      "They attract",
                      "They disappear",
                      "They repel",
                      "They combine"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Like charges repel — both being negative means they push away from each other."
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "Coulomb's Law says the force increases if charges are brought closer.",
                    "correctAnswer": true,
                    "explanation": "Yes — force is inversely proportional to the square of the distance: \\( F \\propto 1/r^2 \\)."
                  },
                  {
                    "id": "q3",
                    "type": "mcq",
                    "text": "If q₁ = 3 μC, q₂ = -2 μC, and r = 0.2 m, what is the electrostatic force? Use \\( k = 9 × 10^9 \\)",
                    "options": [
                      "1.35 N (attractive)",
                      "1.35 N (repulsive)",
                      "135 N (attractive)",
                      "135 N (repulsive)"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Convert to Coulombs: \\( q_1 = 3 × 10^{-6} \\), \\( q_2 = -2 × 10^{-6} \\).\n\\[ F = \\frac{(9×10^9)(6×10^{-12})}{(0.2)^2} = 1.35 \\text{ N} \\] Attractive since charges are opposite."
                  }
                ]
              }
            }
          ]
        },

        //Electric Circuits content
        {
          "id": "electric-circuits",
          "name": "Electric Circuits",
          "description": "Learn how current, voltage, and resistance work in electric circuits.",
          "subTopics": [
            {
              "id": "basic-circuit-principles",
              "name": "Current, Voltage, Resistance & Ohm's Law",
              "description": "Understand how electricity flows, what pushes it, and what resists it.",
              "content": [
                {
                  "type": "text",
                  "id": "circuits-intro",
                  "content": "Electric circuits are paths for electric current to flow. Current is the flow of charges, voltage is the push (energy), and resistance slows the flow."
                },
                {
                  "type": "example",
                  "id": "circuit-example-sa",
                  "content": "Example: Imagine water flowing through a pipe. The water = current, the pump = voltage, and the narrow pipe = resistance."
                },
                {
                  "type": "formula",
                  "id": "ohms-law",
                  "content": "\\[ V = IR \\]\nWhere:\nV = voltage (volts, V)\nI = current (amperes, A)\nR = resistance (ohms, \\( \\Omega \\))"
                },
                {
                  "type": "text",
                  "id": "circuit-memory-hook",
                  "content": "🔌 Remember: 'VIR triangle' — Cover what you want to find!\n\\[ \\text{V} = \\text{I} \\times \\text{R}, \\quad \\text{I} = \\frac{\\text{V}}{\\text{R}}, \\quad \\text{R} = \\frac{\\text{V}}{\\text{I}} \\]"
                }
              ],
              "quiz": {
                "id": "electric-circuits-quiz",
                "title": "Electric Circuits Quiz",
                "description": "Test your understanding of basic circuit principles.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "Which statement is true about current in a series circuit?",
                    "options": [
                      "It decreases after every resistor",
                      "It splits at every junction",
                      "It is the same everywhere",
                      "It gets stronger with more resistors"
                    ],
                    "correctAnswer": 2,
                    "explanation": "In a series circuit, current stays the same through all components because there's only one path."
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "Voltage is shared across components in a parallel circuit.",
                    "correctAnswer": false,
                    "explanation": "Voltage is the same across each branch in a parallel circuit."
                  },
                  {
                    "id": "q3",
                    "type": "mcq",
                    "text": "A 12 V battery powers a 4 \\( \\Omega \\) resistor. What is the current?",
                    "options": [
                      "48 A",
                      "3 A",
                      "0.3 A",
                      "16 A"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Using \\( I = \\frac{V}{R} = \\frac{12}{4} = 3 \\text{ A} \\)"
                  }
                ]
              }
            }
          ]
        },

        //Electrodynamics content
        {
          "id": "electrodynamics",
          "name": "Electrodynamics",
          "description": "Learn how moving charges create magnetic fields and how electric motors and generators work.",
          "subTopics": [
            {
              "id": "electric-magnetic-fields",
              "name": "Electric Current and Magnetic Fields",
              "description": "Explore how electricity and magnetism are linked through motion.",
              "content": [
                {
                  "type": "text",
                  "id": "electrodynamics-intro",
                  "content": "When an electric current flows through a wire, it creates a magnetic field around the wire. This is the foundation of electrodynamics."
                },
                {
                  "type": "example",
                  "id": "current-magnet-example",
                  "content": "Example: Wrap a wire around a nail, connect it to a battery — you've made an electromagnet! It can pick up small metal objects."
                },
                {
                  "type": "text",
                  "id": "right-hand-rule",
                  "content": "✋ Use the Right-Hand Rule: Point your thumb in the direction of current. Your fingers curl in the direction of the magnetic field."
                },
                {
                  "type": "text",
                  "id": "electromagnetic-hook",
                  "content": "🔁 Memory tip: 'Electric makes Magnetic, Moving Magnetic makes Electric.' This helps with motors and generators!"
                }
              ],
              "quiz": {
                "id": "electrodynamics-quiz",
                "title": "Electromagnetism Quiz",
                "description": "Test how much you know about the relationship between electricity and magnetism.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "What happens when current flows through a straight conductor?",
                    "options": [
                      "It heats up only",
                      "A magnetic field forms around it",
                      "It produces light",
                      "It moves in circles"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A magnetic field forms around the conductor — this is the basis of electromagnets and motors."
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "You can increase an electromagnet's strength by adding more loops of wire.",
                    "correctAnswer": true,
                    "explanation": "More loops mean more magnetic field lines — a stronger electromagnet!"
                  }
                ]
              }
            },
            {
              "id": "motors-generators",
              "name": "Electric Motors and Generators",
              "description": "Learn how energy is converted between electrical and mechanical using magnetic fields.",
              "content": [
                {
                  "type": "text",
                  "id": "motor-generator-intro",
                  "content": "Motors convert electrical energy to mechanical motion. Generators do the opposite: they turn movement into electricity."
                },
                {
                  "type": "example",
                  "id": "motor-sa-example",
                  "content": "Example: A washing machine drum spins because a motor turns electrical energy into motion. A wind turbine turns wind motion into electricity — it's a generator!"
                },
                {
                  "type": "text",
                  "id": "motor-generator-hook",
                  "content": "⚙️ Hook: Motor = plug in to spin. Generator = spin to get power!"
                }
              ],
              "quiz": {
                "id": "motors-generators-quiz",
                "title": "Motors and Generators Quiz",
                "description": "Check your understanding of how energy is converted using electromagnetism.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "What does a generator do?",
                    "options": [
                      "Uses electricity to create motion",
                      "Produces electricity from motion",
                      "Heats up a circuit",
                      "Stores charge in a battery"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Generators turn mechanical energy (like spinning) into electrical energy."
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "An electric motor needs magnets and current to work.",
                    "correctAnswer": true,
                    "explanation": "Motors rely on magnetic fields and electric current to produce motion."
                  }
                ]
              }
            }
          ]
        },

        //Photoelectric Effect content
        {
          "id": "photoelectric-effect",
          "name": "Photoelectric Effect",
          "description": "Learn how light can knock electrons off metal surfaces and what this tells us about the nature of light.",
          "subTopics": [
            {
              "id": "photoelectric-concept",
              "name": "What is the Photoelectric Effect?",
              "description": "Understand how light behaves like a stream of particles that can release electrons.",
              "content": [
                {
                  "type": "text",
                  "id": "photoelectric-intro",
                  "content": "The photoelectric effect is when light hits a metal surface and knocks electrons loose. This proves that light has particle-like behavior — called photons."
                },
                {
                  "type": "text",
                  "id": "einstein-light-particle",
                  "content": "Einstein explained that light comes in small energy packets (photons). If a photon's energy is big enough, it can eject an electron from the metal."
                },
                {
                  "type": "formula",
                  "id": "photoelectric-formula",
                  "content": "\\[ E_k = hf - \\phi \\]\nWhere:\n\\( E_k \\) = kinetic energy of the ejected electron,\n\\( h \\) = Planck's constant (\\(6.63 \\times 10^{-34} \\) Js),\n\\( f \\) = frequency of the light,\n\\( \\phi \\) = work function (minimum energy needed to free an electron)."
                },
                {
                  "type": "example",
                  "id": "photoelectric-sa-example",
                  "content": "Example: Blue light can eject electrons from a metal, but red light can't — even if red light is bright. Why? Because red light has lower frequency and energy. Only high-frequency photons have enough energy to knock electrons out."
                },
                {
                  "type": "text",
                  "id": "photoelectric-hook",
                  "content": "💡 Hook: Think of photons as tiny soccer balls — only the fast ones (high frequency) can kick out the goalie (electron)!"
                }
              ],
              "quiz": {
                "id": "photoelectric-quiz",
                "title": "Photoelectric Effect Quiz",
                "description": "Test your understanding of how light can release electrons.",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "Which factor affects whether light can eject an electron from metal?",
                    "options": [
                      "The brightness of the light",
                      "The frequency of the light",
                      "The size of the metal",
                      "The temperature of the room"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Only frequency affects the energy of photons. Brightness affects number of photons, not their energy."
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "A dim UV light can eject electrons, but a bright red light might not.",
                    "correctAnswer": true,
                    "explanation": "UV light has high frequency and energy. Red light has lower frequency — no matter how bright it is, the photons don't have enough energy."
                  }
                ]
              }
            }
          ]
        }        
        //
          
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
