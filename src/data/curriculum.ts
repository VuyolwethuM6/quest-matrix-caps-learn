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
          "description": "Learn how forces affect motion using Newton’s three laws.",
          "subTopics": [
            {
              "id": "newtons-first-law",
              "name": "Newton's First Law: Law of Inertia",
              "description": "Objects stay still or keep moving unless a force changes that.",
              "content": [
                {
                  "type": "text",
                  "id": "first-law-intro",
                  "content": "Newton's First Law (Law of Inertia) says: An object at rest stays at rest, and an object in motion keeps moving at constant speed in a straight line — unless acted on by an unbalanced force."
                },
                {
                  "type": "example",
                  "id": "first-law-sa-example",
                  "content": "Example: You're in a taxi on the N1. The driver brakes suddenly — you lurch forward. Why? Your body wants to keep moving (inertia), but the seatbelt applies the unbalanced force to stop you."
                },
                {
                  "type": "text",
                  "id": "first-law-memory-aid",
                  "content": "💡 Easy way to remember: ‘Things keep doing what they’re doing until something messes it up.’"
                },
                {
                  "type": "image",
                  "id": "first-law-image",
                  "content": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Inertia_Example.svg/512px-Inertia_Example.svg.png"
                }
              ],
              "quiz": {
                "id": "first-law-quiz",
                "title": "First Law Quiz",
                "description": "Test your knowledge of inertia and motion",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "You're playing soccer. The ball rolls and eventually stops. Why?",
                    "options": [
                      "It runs out of energy",
                      "Gravity pulls it down",
                      "Friction with the ground slows it down",
                      "It gets tired"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The ball would keep rolling forever if there was no friction. Friction is the unbalanced force that stops it."
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "An object can change direction without a force acting on it.",
                    "correctAnswer": false,
                    "explanation": "A force is required to change speed or direction — any change in motion!"
                  }
                ]
              }
            },
            {
              "id": "newtons-second-law",
              "name": "Newton's Second Law: Force = Mass × Acceleration",
              "description": "Describes how force causes acceleration depending on mass.",
              "content": [
                {
                  "type": "text",
                  "id": "second-law-intro",
                  "content": "Newton’s Second Law explains how force causes motion. The greater the force, the greater the acceleration. But heavier objects accelerate less with the same force."
                },
                {
                  "type": "formula",
                  "id": "second-law-formula",
                  "content": "\\[ F = ma \\]\nWhere:\nF = Force (Newtons)\nm = mass (kg)\na = acceleration (m/s²)"
                },
                {
                  "type": "example",
                  "id": "second-law-local-example",
                  "content": "Example: You push a trolley with groceries (20 kg) at Shoprite. You use 40 N of force.\n\\( a = F/m = 40/20 = 2 \\text{ m/s}^2 \\)"
                },
                {
                  "type": "text",
                  "id": "second-law-memory-hook",
                  "content": "🧠 Think: More push = more zoom. Heavy stuff = harder to zoom."
                },
                {
                  "type": "text",
                  "id": "second-law-exam-example",
                  "content": "🧠 Think: More push = more zoom. Heavy stuff = harder to zoom."
                }
              ],
              "quiz": {
                "id": "second-law-quiz",
                "title": "Second Law Quiz",
                "description": "Test your understanding of how force affects acceleration",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "If you apply 30 N to a 3 kg object, what is its acceleration?",
                    "options": ["10 m/s²", "33 m/s²", "0.1 m/s²", "15 m/s²"],
                    "correctAnswer": 0,
                    "explanation": "a = F/m = 30 / 3 = 10 m/s²"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "A heavier object always moves faster when pushed.",
                    "correctAnswer": false,
                    "explanation": "Heavier objects require more force to accelerate — they usually move slower unless you apply a large force."
                  }
                ]
              }
            },
            {
              "id": "newtons-third-law",
              "name": "Newton's Third Law: Action = Reaction",
              "description": "Every force has an equal and opposite force.",
              "content": [
                {
                  "type": "text",
                  "id": "third-law-intro",
                  "content": "Newton’s Third Law states: For every action, there is an equal and opposite reaction. Forces always come in pairs."
                },
                {
                  "type": "example",
                  "id": "third-law-example",
                  "content": "Example: You jump off the ground. Your legs push down on Earth, and Earth pushes you up — that’s why you lift off."
                },
                {
                  "type": "text",
                  "id": "third-law-hook",
                  "content": "⚖️ Memory Aid: ‘Push back, push forward.’ Like bouncing on a trampoline!"
                }
              ],
              "quiz": {
                "id": "third-law-quiz",
                "title": "Third Law Quiz",
                "description": "Check your understanding of action-reaction forces",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "Which is a correct action-reaction pair?",
                    "options": [
                      "Earth pulls you down — you pull Earth down",
                      "You stand on the floor — the air pushes you",
                      "You run — your shoes make you go",
                      "You push a wall — the wall disappears"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Gravity works both ways! You pull on the Earth just like it pulls you — though the Earth doesn't move much!"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "Forces always act in one direction only.",
                    "correctAnswer": false,
                    "explanation": "For every force, there is an equal force in the opposite direction — that's Newton’s Third Law!"
                  }
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
          "name": "Momentum",
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
                    "explanation": "When objects stick together after collision, it’s an inelastic collision."
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
                  "content": "⚙️ Remember: ‘Work is force with movement.’ No movement = no work!"
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
                    "text": "What is the work done if 50 N of force is applied and the object doesn’t move?",
                    "options": [
                      "50 J",
                      "0 J",
                      "25 J",
                      "Can’t be determined"
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
                  "content": "Example: An ambulance in Soweto drives past. As it approaches, the siren sounds higher-pitched. As it passes and moves away, the pitch drops. That’s the Doppler Effect in action."
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
                  "content": "👂 Think: ‘Closer = higher pitch, Farther = lower pitch.’ Like a passing taxi with loud music!"
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
                      "A moving police car’s siren",
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
              "name": "Electric Charges and Coulomb’s Law",
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
                  "content": "⚡ Think: ‘Same signs fight, opposite signs unite.’ And the closer they are, the stronger the zap!"
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
                    "text": "Coulomb’s Law says the force increases if charges are brought closer.",
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
              "name": "Current, Voltage, Resistance & Ohm’s Law",
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
                  "content": "🔌 Remember: ‘VIR triangle’ — Cover what you want to find!\n\\[ \\text{V} = \\text{I} \\times \\text{R}, \\quad \\text{I} = \\frac{\\text{V}}{\\text{R}}, \\quad \\text{R} = \\frac{\\text{V}}{\\text{I}} \\]"
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
                  "content": "Example: Wrap a wire around a nail, connect it to a battery — you’ve made an electromagnet! It can pick up small metal objects."
                },
                {
                  "type": "text",
                  "id": "right-hand-rule",
                  "content": "✋ Use the Right-Hand Rule: Point your thumb in the direction of current. Your fingers curl in the direction of the magnetic field."
                },
                {
                  "type": "text",
                  "id": "electromagnetic-hook",
                  "content": "🔁 Memory tip: ‘Electric makes Magnetic, Moving Magnetic makes Electric.’ This helps with motors and generators!"
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
                    "text": "You can increase an electromagnet’s strength by adding more loops of wire.",
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
                  "content": "Einstein explained that light comes in small energy packets (photons). If a photon’s energy is big enough, it can eject an electron from the metal."
                },
                {
                  "type": "formula",
                  "id": "photoelectric-formula",
                  "content": "\\[ E_k = hf - \\phi \\]\nWhere:\n\\( E_k \\) = kinetic energy of the ejected electron,\n\\( h \\) = Planck’s constant (\\(6.63 \\times 10^{-34} \\) Js),\n\\( f \\) = frequency of the light,\n\\( \\phi \\) = work function (minimum energy needed to free an electron)."
                },
                {
                  "type": "example",
                  "id": "photoelectric-sa-example",
                  "content": "Example: Blue light can eject electrons from a metal, but red light can’t — even if red light is bright. Why? Because red light has lower frequency and energy. Only high-frequency photons have enough energy to knock electrons out."
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
                    "explanation": "UV light has high frequency and energy. Red light has lower frequency — no matter how bright it is, the photons don’t have enough energy."
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
