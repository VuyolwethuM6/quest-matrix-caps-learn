import { ExamPaper } from './examModels';

export const physicsPaper1_2023: ExamPaper = {
  id: "physics-paper1-2023",
  subject: "Physical Sciences",
  year: 2023,
  paper: 1,
  duration: 180, // 3 hours in minutes
  totalMarks: 150,
  difficulty: "Medium",
  topics: [
    {
      id: "newtons-laws",
      name: "Newton's Laws of Motion",
      marks: 20
    },
    {
      id: "vertical-projectile",
      name: "Vertical Projectile Motion",
      marks: 15
    },
    {
      id: "momentum-impulse",
      name: "Momentum & Impulse",
      marks: 15
    },
    {
      id: "work-energy-power",
      name: "Work, Energy & Power",
      marks: 15
    },
    {
      id: "waves",
      name: "Waves",
      marks: 15
    },
    {
      id: "electrostatics",
      name: "Electrostatics",
      marks: 15
    },
    {
      id: "electric-circuits",
      name: "Electric Circuits",
      marks: 15
    },
    {
      id: "electrodynamics",
      name: "Electrodynamics",
      marks: 15
    },
    {
      id: "photoelectric",
      name: "Photoelectric Effect",
      marks: 15
    }
  ],
  questions: [
    {
      id: "q1",
      questionText: "Multiple Choice Questions",
      type: "mcq",
      marks: 20,
      topicId: "newtons-laws",
      subQuestions: [
        {
          id: "q1.1",
          questionText: "Which of the following best describes Newton's First Law?",
          type: "mcq",
          marks: 2,
          options: [
            "An object will remain at rest or in uniform motion unless acted upon by an external force",
            "Force equals mass times acceleration",
            "For every action there is an equal and opposite reaction",
            "The force of gravity is proportional to mass"
          ],
          correctAnswer: 0
        },
        {
          id: "q1.2",
          questionText: "A car accelerates from rest to 20 m/s in 5 seconds. What is its acceleration?",
          type: "mcq",
          marks: 2,
          options: [
            "2 m/s²",
            "4 m/s²",
            "5 m/s²",
            "10 m/s²"
          ],
          correctAnswer: 1
        },
        {
            id: "q1.3",
            questionText: "Study the velocity-time graph below and answer the question that follows: [DIAGRAM]",
            type: "mcq",
            marks: 2,
            diagram: "/diagrams/velocity-time-graph.svg",
          options: [
            "The object is moving at constant velocity",
            "The object is accelerating uniformly",
            "The object is decelerating uniformly",
            "The object is at rest"
          ],
          correctAnswer: 1
        },
        {
          id: "q1.4",
          questionText: "Look at the free-body diagram below and identify the correct statement:",
          type: "mcq",
          marks: 2,
          diagram: "/diagrams/free-body-diagram.png",
          options: [
            "The object is in equilibrium",
            "The object is accelerating to the right",
            "The object is accelerating to the left",
            "The object is moving at constant velocity"
          ],
          correctAnswer: 1
        },
        {
          id: "q1.5",
          questionText: "Which of the following diagrams correctly shows the forces acting on a ball thrown vertically upward at its highest point?",
          type: "mcq",
          marks: 2,
          diagram: "/diagrams/vertical-motion.png",
          options: [
            "Only weight acting downward",
            "Weight downward and air resistance upward",
            "Weight downward and initial velocity upward",
            "No forces acting on the ball"
          ],
          correctAnswer: 0
        },
        {
          id: "q1.6",
          questionText: "Study the circuit diagram below and answer the question:",
          type: "mcq",
          marks: 2,
          diagram: "/diagrams/series-circuit.png",
          options: [
            "The current is the same in all resistors",
            "The voltage is the same across all resistors",
            "The total resistance is less than the smallest resistor",
            "The current splits at each junction"
          ],
          correctAnswer: 0
        },
        {
          id: "q1.7",
          questionText: "Look at the wave diagram below and identify the correct statement:",
          type: "mcq",
          marks: 2,
          diagram: "/diagrams/wave-diagram.png",
          options: [
            "The amplitude is 2 cm",
            "The wavelength is 4 cm",
            "The frequency is 2 Hz",
            "The wave speed is 8 cm/s"
          ],
          correctAnswer: 1
        },
        {
          id: "q1.8",
          questionText: "Which diagram correctly shows the magnetic field around a current-carrying wire?",
          type: "mcq",
          marks: 2,
          diagram: "/diagrams/magnetic-field.png",
          options: [
            "Circular field lines clockwise",
            "Circular field lines counterclockwise",
            "Radial field lines outward",
            "Parallel field lines"
          ],
          correctAnswer: 1
        },
        {
          id: "q1.9",
          questionText: "Study the photoelectric effect graph below and answer:",
          type: "mcq",
          marks: 2,
          diagram: "/diagrams/photoelectric-graph.png",
          options: [
            "The work function is 2 eV",
            "The threshold frequency is 5 × 10¹⁴ Hz",
            "The stopping potential is 3 V",
            "The maximum kinetic energy is 4 eV"
          ],
          correctAnswer: 1
        },
        {
          id: "q1.10",
          questionText: "Which diagram correctly shows the electric field between two point charges?",
          type: "mcq",
          marks: 2,
          diagram: "/diagrams/electric-field.png",
          options: [
            "Field lines from positive to negative",
            "Field lines from negative to positive",
            "Field lines parallel to each other",
            "No field lines between charges"
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      id: "q2",
      questionText: "A 5kg box is being pushed with a force of 20N on a rough surface with a coefficient of friction of 0.3. Calculate:",
      type: "structured",
      marks: 20,
      topicId: "newtons-laws",
      diagram: "/diagrams/box-friction.png",
      subQuestions: [
        {
          id: "q2.1",
          questionText: "Draw a free-body diagram showing all forces acting on the box.",
          type: "diagram",
          marks: 5
        },
        {
          id: "q2.2",
          questionText: "Calculate the normal force acting on the box.",
          type: "calculation",
          marks: 5,
          correctAnswer: "49N"
        },
        {
          id: "q2.3",
          questionText: "Calculate the acceleration of the box.",
          type: "calculation",
          marks: 10,
          correctAnswer: "1.06 m/s²"
        }
      ]
    },
    {
      id: "q3",
      questionText: "A ball is thrown vertically upward with an initial velocity of 20 m/s. Calculate:",
      type: "structured",
      marks: 15,
      topicId: "vertical-projectile",
      diagram: "/diagrams/vertical-projectile.png",
      subQuestions: [
        {
          id: "q3.1",
          questionText: "The maximum height reached by the ball.",
          type: "calculation",
          marks: 7,
          correctAnswer: "20.4 m"
        },
        {
          id: "q3.2",
          questionText: "The time taken to reach the maximum height.",
          type: "calculation",
          marks: 8,
          correctAnswer: "2.04 s"
        }
      ]
    },
    {
      id: "q4",
      questionText: "Two cars collide in a head-on collision. Car A has a mass of 1000kg and was moving at 20 m/s, while Car B has a mass of 1500kg and was moving at 15 m/s in the opposite direction. Calculate:",
      type: "structured",
      marks: 15,
      topicId: "momentum-impulse",
      diagram: "/diagrams/collision.png",
      subQuestions: [
        {
          id: "q4.1",
          questionText: "The total momentum before the collision.",
          type: "calculation",
          marks: 5,
          correctAnswer: "5000 kg⋅m/s"
        },
        {
          id: "q4.2",
          questionText: "The velocity of the cars after the collision if they stick together.",
          type: "calculation",
          marks: 10,
          correctAnswer: "2 m/s"
        }
      ]
    },
    {
      id: "q5",
      questionText: "A 50kg box is lifted vertically through a height of 2m. Calculate:",
      type: "structured",
      marks: 15,
      topicId: "work-energy-power",
      diagram: "/diagrams/work-energy.png",
      subQuestions: [
        {
          id: "q5.1",
          questionText: "The work done in lifting the box.",
          type: "calculation",
          marks: 7,
          correctAnswer: "980 J"
        },
        {
          id: "q5.2",
          questionText: "The potential energy gained by the box.",
          type: "calculation",
          marks: 8,
          correctAnswer: "980 J"
        }
      ]
    },
    {
      id: "q6",
      questionText: "A sound wave has a frequency of 440 Hz and travels at 340 m/s. Calculate:",
      type: "structured",
      marks: 15,
      topicId: "waves",
      diagram: "/diagrams/sound-wave.png",
      subQuestions: [
        {
          id: "q6.1",
          questionText: "The wavelength of the sound wave.",
          type: "calculation",
          marks: 7,
          correctAnswer: "0.77 m"
        },
        {
          id: "q6.2",
          questionText: "The period of the wave.",
          type: "calculation",
          marks: 8,
          correctAnswer: "0.0023 s"
        }
      ]
    },
    {
      id: "q7",
      questionText: "Two point charges of +2μC and -3μC are placed 0.5m apart. Calculate:",
      type: "structured",
      marks: 15,
      topicId: "electrostatics",
      diagram: "/diagrams/point-charges.png",
      subQuestions: [
        {
          id: "q7.1",
          questionText: "The magnitude of the electrostatic force between them.",
          type: "calculation",
          marks: 7,
          correctAnswer: "0.216 N"
        },
        {
          id: "q7.2",
          questionText: "The direction of the force on each charge.",
          type: "explanation",
          marks: 8
        }
      ]
    },
    {
      id: "q8",
      questionText: "A circuit contains a 12V battery and three resistors of 2Ω, 4Ω, and 6Ω in series. Calculate:",
      type: "structured",
      marks: 15,
      topicId: "electric-circuits",
      diagram: "/diagrams/series-circuit.png",
      subQuestions: [
        {
          id: "q8.1",
          questionText: "The total resistance of the circuit.",
          type: "calculation",
          marks: 5,
          correctAnswer: "12Ω"
        },
        {
          id: "q8.2",
          questionText: "The current flowing through the circuit.",
          type: "calculation",
          marks: 5,
          correctAnswer: "1A"
        },
        {
          id: "q8.3",
          questionText: "The potential difference across each resistor.",
          type: "calculation",
          marks: 5,
          correctAnswer: "2V, 4V, 6V"
        }
      ]
    },
    {
      id: "q9",
      questionText: "A wire carrying a current of 5A is placed in a magnetic field of 0.2T. The wire is 0.5m long and makes an angle of 30° with the field. Calculate:",
      type: "structured",
      marks: 15,
      topicId: "electrodynamics",
      diagram: "/diagrams/magnetic-force.png",
      subQuestions: [
        {
          id: "q9.1",
          questionText: "The magnitude of the magnetic force on the wire.",
          type: "calculation",
          marks: 7,
          correctAnswer: "0.25 N"
        },
        {
          id: "q9.2",
          questionText: "The direction of the force using the right-hand rule.",
          type: "explanation",
          marks: 8
        }
      ]
    },
    {
      id: "q10",
      questionText: "Light of wavelength 400nm is incident on a metal surface with a work function of 2.0eV. Calculate:",
      type: "structured",
      marks: 15,
      topicId: "photoelectric",
      diagram: "/diagrams/photoelectric.png",
      subQuestions: [
        {
          id: "q10.1",
          questionText: "The energy of each photon in eV.",
          type: "calculation",
          marks: 7,
          correctAnswer: "3.1 eV"
        },
        {
          id: "q10.2",
          questionText: "The maximum kinetic energy of the emitted electrons.",
          type: "calculation",
          marks: 8,
          correctAnswer: "1.1 eV"
        }
      ]
    }
  ]
};

export const exams: ExamPaper[] = [
  physicsPaper1_2023
]; 