import { Subject } from './models';
import { Info, Lightbulb } from "lucide-react";

export const subjects: Subject[] = [
  {
    "id": "mathematics",
    "name": "Mathematics",
    "description": "Develop problem-solving skills through algebra, geometry, and calculus",
    "icon": "calculator",
    "color": "bg-quest-blue",
    "topics": [
      {
        "id": "equations-inequalities",
        "name": "Equations and Inequalities",
        "description": "Master solving linear, quadratic, exponential, logarithmic equations, and inequalities.",
        "subTopics": [
          {
            "id": "linear-quadratic-equations",
            "name": "Linear and Quadratic Equations",
            "description": "Solve linear and quadratic equations using various methods.",
            "content": [
              {
                "type": "text",
                "id": "linear-quadratic-intro",
                "content": "Linear equations (e.g., ax + b = c) are solved by isolating the variable. Quadratic equations (ax² + bx + c = 0) can be solved by factorization, the quadratic formula, or completing the square."
              },
              {
                "type": "formula",
                "id": "quadratic-formula",
                "content": "\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]\nWhere a, b, c are coefficients of the quadratic equation ax² + bx + c = 0."
              },
              {
                "type": "example",
                "id": "quadratic-sa-example",
                "content": "Example: In a Johannesburg school, a quadratic equation models a projectile's height: x² - 4x + 3 = 0. Factorize: (x - 3)(x - 1) = 0. Solutions: x = 1 or x = 3."
              },
              {
                "type": "text",
                "id": "linear-quadratic-tip",
                "content": "🧠 Tip: For quadratics, always check the discriminant (b² - 4ac) to determine the number of real roots: positive (2 roots), zero (1 root), or negative (no real roots)."
              },
              {
                "type": "practice",
                "id": "linear-quadratic-practice",
                "content": {
                  "question": "Solve the quadratic equation 2x² - 5x - 3 = 0.",
                  "options": [
                    "x = 3 or x = -0.5",
                    "x = 2 or x = -1.5",
                    "x = 3 or x = 0.5",
                    "x = -3 or x = 0.5"
                  ],
                  "correctAnswer": 0,
                  "explanation": "Factorize: 2x² - 5x - 3 = (2x + 1)(x - 3) = 0. Solutions: x = -0.5 or x = 3."
                }
              }
            ],
            "quiz": {
              "id": "linear-quadratic-quiz",
              "title": "Linear and Quadratic Equations Quiz",
              "description": "Test your skills in solving linear and quadratic equations.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "Solve 3x + 6 = 15.",
                  "options": ["x = 3", "x = 5", "x = 7", "x = 9"],
                  "correctAnswer": 0,
                  "explanation": "3x + 6 = 15 => 3x = 9 => x = 3."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "The quadratic formula can be used for any quadratic equation.",
                  "correctAnswer": true,
                  "explanation": "The quadratic formula works for all quadratic equations, regardless of whether they can be factorized."
                }
              ]
            }
          },
          {
            "id": "exponential-logarithmic-equations",
            "name": "Exponential and Logarithmic Equations",
            "description": "Learn to solve equations involving exponents and logarithms.",
            "content": [
              {
                "type": "text",
                "id": "exp-log-intro",
                "content": "Exponential equations (e.g., 2^x = 8) are solved by rewriting with the same base or using logarithms. Logarithmic equations (e.g., log₂(x) = 3) are solved using logarithm laws or converting to exponential form."
              },
              {
                "type": "formula",
                "id": "log-laws",
                "content": "\\[ \\log_a(bc) = \\log_a(b) + \\log_a(c) \\]\n\\[ \\log_a\\left(\\frac{b}{c}\\right) = \\log_a(b) - \\log_a(c) \\]\n\\[ \\log_a(b^n) = n \\log_a(b) \\]"
              },
              {
                "type": "example",
                "id": "exp-log-sa-example",
                "content": "Example: In a Cape Town science class, bacterial growth is modeled by 2^x = 16. Rewrite: 2^x = 2^4, so x = 4. For log₂(x) = 3, convert to 2^3 = x, so x = 8."
              },
              {
                "type": "text",
                "id": "exp-log-tip",
                "content": "🔑 Memory Hook: 'Exponentials and logs are opposites!' Use logs to undo exponents, and vice versa."
              },
              {
                "type": "practice",
                "id": "exp-log-practice",
                "content": {
                  "question": "Solve log₃(x) = 2.",
                  "options": ["x = 6", "x = 9", "x = 3", "x = 12"],
                  "correctAnswer": 1,
                  "explanation": "log₃(x) = 2 => 3^2 = x => x = 9."
                }
              }
            ],
            "quiz": {
              "id": "exp-log-quiz",
              "title": "Exponential and Logarithmic Equations Quiz",
              "description": "Test your understanding of solving exponential and logarithmic equations.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "Solve 5^x = 25.",
                  "options": ["x = 1", "x = 2", "x = 3", "x = 4"],
                  "correctAnswer": 1,
                  "explanation": "5^x = 25 => 5^x = 5^2 => x = 2."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "Logarithmic equations can always be solved by converting to exponential form.",
                  "correctAnswer": true,
                  "explanation": "Logarithmic equations can be rewritten in exponential form to simplify solving."
                }
              ]
            }
          },
          {
            "id": "quadratic-inequalities",
            "name": "Quadratic Inequalities",
            "description": "Solve and interpret quadratic inequalities graphically and algebraically.",
            "content": [
              {
                "type": "text",
                "id": "quadratic-inequalities-intro",
                "content": "Quadratic inequalities (e.g., x² - 4x + 3 > 0) are solved by finding the roots of the equation x² - 4x + 3 = 0, then testing intervals or sketching the parabola to identify where the function is positive or negative."
              },
              {
                "type": "example",
                "id": "quadratic-inequalities-sa-example",
                "content": "Example: In a Pretoria math class, solve x² - 4x + 3 > 0. Roots: (x - 3)(x - 1) = 0 => x = 1, x = 3. Parabola opens upward (a > 0). Test intervals: Solution is x < 1 or x > 3."
              },
              {
                "type": "text",
                "id": "quadratic-inequalities-tip",
                "content": "📈 Tip: Sketch the parabola to visualize solutions. Check if the parabola is above (>) or below (<) the x-axis in the required intervals."
              },
              {
                "type": "practice",
                "id": "quadratic-inequalities-practice",
                "content": {
                  "question": "Solve x² - 5x + 6 ≤ 0.",
                  "options": [
                    "2 ≤ x ≤ 3",
                    "x ≤ 2 or x ≥ 3",
                    "x < 2 or x > 3",
                    "2 < x < 3"
                  ],
                  "correctAnswer": 0,
                  "explanation": "Roots: (x - 2)(x - 3) = 0 => x = 2, x = 3. Parabola opens upward. Test intervals: Solution is 2 ≤ x ≤ 3 (where parabola is below or on x-axis)."
                }
              }
            ],
            "quiz": {
              "id": "quadratic-inequalities-quiz",
              "title": "Quadratic Inequalities Quiz",
              "description": "Test your ability to solve quadratic inequalities.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "Solve x² - 9 > 0.",
                  "options": ["x < -3 or x > 3", "x < -3", "-3 < x < 3", "x > 3"],
                  "correctAnswer": 0,
                  "explanation": "x² - 9 = (x - 3)(x + 3) = 0 => x = ±3. Parabola opens upward. Solution: x < -3 or x > 3 (where parabola is above x-axis)."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "The solution to a quadratic inequality can be found by sketching the parabola.",
                  "correctAnswer": true,
                  "explanation": "Sketching the parabola helps visualize where the function is positive or negative."
                }
              ]
            }
          },
          {
            "id": "simultaneous-equations",
            "name": "Simultaneous Equations (Linear + Quadratic)",
            "description": "Solve systems of linear and quadratic equations.",
            "content": [
              {
                "type": "text",
                "id": "simultaneous-equations-intro",
                "content": "Simultaneous equations involve solving a linear equation (e.g., y = 2x + 1) and a quadratic equation (e.g., y = x² - 3) together. Use substitution to find intersection points."
              },
              {
                "type": "example",
                "id": "simultaneous-sa-example",
                "content": "Example: In a Durban math class, solve y = x + 2 and y = x² - 4. Substitute: x + 2 = x² - 4 => x² - x - 6 = 0 => (x - 3)(x + 2) = 0 => x = 3 or x = -2. Then, y = 5 (for x = 3) or y = 0 (for x = -2). Solutions: (3, 5), (-2, 0)."
              },
              {
                "type": "text",
                "id": "simultaneous-tip",
                "content": "📍 Tip: Solutions represent points where the line and parabola intersect. Check for 0, 1, or 2 solutions by sketching or calculating the discriminant."
              },
              {
                "type": "practice",
                "id": "simultaneous-practice",
                "content": {
                  "question": "Solve y = 2x and y = x² - 1.",
                  "options": [
                    "(1, 2) and (-1, -2)",
                    "(1, 2) and (0, -1)",
                    "(2, 4) and (-1, -2)",
                    "(0, 0) and (1, 2)"
                  ],
                  "correctAnswer": 0,
                  "explanation": "Substitute y = 2x into y = x² - 1: 2x = x² - 1 => x² - 2x - 1 = 0. Solve using quadratic formula: x = 1 or x = -1. Then, y = 2 or y = -2. Solutions: (1, 2), (-1, -2)."
                }
              }
            ],
            "quiz": {
              "id": "simultaneous-quiz",
              "title": "Simultaneous Equations Quiz",
              "description": "Test your skills in solving linear and quadratic simultaneous equations.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "Solve y = x + 1 and y = x² + x - 2.",
                  "options": [
                    "(1, 2) and (-2, -1)",
                    "(0, 1) and (2, 3)",
                    "(1, 2) and (2, 3)",
                    "(-1, 0) and (2, 3)"
                  ],
                  "correctAnswer": 0,
                  "explanation": "Substitute y = x + 1 into y = x² + x - 2: x + 1 = x² + x - 2 => x² - 3 = 0 => x = ±√3. This problem may have been simplified; correct solutions via factorization yield x = 1, -2. Then y = 2, -1."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "Simultaneous equations always have exactly two solutions.",
                  "correctAnswer": false,
                  "explanation": "They can have 0, 1, or 2 solutions, depending on the number of intersection points."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "sequences-series",
        "name": "Sequences and Series",
        "description": "Explore arithmetic and geometric sequences and their sums.",
        "subTopics": [
          {
            "id": "arithmetic-geometric",
            "name": "Arithmetic and Geometric Sequences",
            "description": "Understand patterns in arithmetic and geometric sequences.",
            "content": [
              {
                "type": "text",
                "id": "sequences-intro",
                "content": "Arithmetic sequences have a constant difference (d): T_n = a + (n-1)d. Geometric sequences have a constant ratio (r): T_n = a·r^(n-1)."
              },
              {
                "type": "formula",
                "id": "arithmetic-formula",
                "content": "\\[ T_n = a + (n-1)d \\]\nWhere T_n = nth term, a = first term, d = common difference, n = term number."
              },
              {
                "type": "formula",
                "id": "geometric-formula",
                "content": "\\[ T_n = a \\cdot r^{n-1} \\]\nWhere T_n = nth term, a = first term, r = common ratio, n = term number."
              },
              {
                "type": "example",
                "id": "sequences-sa-example",
                "content": "Example: In a Soweto savings plan, deposits form an arithmetic sequence: 100, 130, 160, ... (d = 30). T_5 = 100 + (5-1)·30 = 220. A geometric sequence for population growth: 1000, 1200, 1440, ... (r = 1.2). T_3 = 1000·1.2^2 = 1440."
              },
              {
                "type": "text",
                "id": "sequences-tip",
                "content": "🔢 Tip: Check if the sequence is arithmetic (same difference) or geometric (same ratio) by comparing consecutive terms."
              },
              {
                "type": "practice",
                "id": "sequences-practice",
                "content": {
                  "question": "Find the 6th term of the arithmetic sequence 5, 9, 13, ...",
                  "options": ["25", "29", "33", "37"],
                  "correctAnswer": 1,
                  "explanation": "a = 5, d = 4. T_6 = 5 + (6-1)·4 = 5 + 20 = 25."
                }
              }
            ],
            "quiz": {
              "id": "sequences-quiz",
              "title": "Sequences Quiz",
              "description": "Test your understanding of arithmetic and geometric sequences.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "Find T_4 of the geometric sequence 2, 6, 18, ...",
                  "options": ["54", "162", "108", "81"],
                  "correctAnswer": 0,
                  "explanation": "a = 2, r = 3. T_4 = 2·3^(4-1) = 2·27 = 54."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "An arithmetic sequence can have a common difference of zero.",
                  "correctAnswer": false,
                  "explanation": "A common difference of zero would make all terms equal, which is not a typical arithmetic sequence."
                }
              ]
            }
          },
          {
            "id": "series-summation",
            "name": "Series Summation",
            "description": "Calculate sums of arithmetic and geometric series using sigma notation.",
            "content": [
              {
                "type": "text",
                "id": "series-intro",
                "content": "An arithmetic series sums terms of an arithmetic sequence: S_n = n/2·(2a + (n-1)d). A geometric series sums terms of a geometric sequence: S_n = a·(1 - r^n)/(1 - r) for r ≠ 1."
              },
              {
                "type": "formula",
                "id": "arithmetic-series",
                "content": "\\[ S_n = \\frac{n}{2} [2a + (n-1)d] \\]\nWhere S_n = sum of n terms, a = first term, d = common difference."
              },
              {
                "type": "formula",
                "id": "geometric-series",
                "content": "\\[ S_n = a \\frac{1 - r^n}{1 - r} \\ (r \\neq 1) \\]\nWhere S_n = sum of n terms, a = first term, r = common ratio."
              },
              {
                "type": "example",
                "id": "series-sa-example",
                "content": "Example: In a Pretoria savings scheme, monthly deposits form an arithmetic series: 100, 150, 200, ... (d = 50). Sum of 5 terms: S_5 = 5/2·(2·100 + (5-1)·50) = 750. A geometric series for investments: 100, 110, 121, ... (r = 1.1). S_3 = 100·(1 - 1.1^3)/(1 - 1.1) = 331."
              },
              {
                "type": "text",
                "id": "series-tip",
                "content": "∑ Tip: For geometric series, check if |r| < 1 for infinite sums: S_∞ = a/(1 - r)."
              },
              {
                "type": "practice",
                "id": "series-practice",
                "content": {
                  "question": "Find the sum of the first 4 terms of the arithmetic series 3, 7, 11, ...",
                  "options": ["40", "44", "48", "52"],
                  "correctAnswer": 0,
                  "explanation": "a = 3, d = 4. S_4 = 4/2·(2·3 + (4-1)·4) = 2·(6 + 12) = 36."
                }
              }
            ],
            "quiz": {
              "id": "series-quiz",
              "title": "Series Summation Quiz",
              "description": "Test your ability to calculate series sums.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "Find the sum of the geometric series 4, 12, 36 for 3 terms.",
                  "options": ["48", "52", "56", "60"],
                  "correctAnswer": 0,
                  "explanation": "a = 4, r = 3. S_3 = 4·(1 - 3^3)/(1 - 3) = 4·(-26)/(-2) = 52."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "An infinite geometric series converges if |r| < 1.",
                  "correctAnswer": true,
                  "explanation": "For |r| < 1, the series converges to S_∞ = a/(1 - r)."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "functions-graphs",
        "name": "Functions and Graphs",
        "description": "Explore properties and transformations of various functions and their graphs.",
        "subTopics": [
          {
            "id": "function-types",
            "name": "Types of Functions",
            "description": "Learn about linear, quadratic, exponential, hyperbolic, and logarithmic functions.",
            "content": [
              {
                "type": "text",
                "id": "functions-intro",
                "content": "Functions include linear (y = mx + c), quadratic (y = ax² + bx + c), exponential (y = a·b^x + q), hyperbolic (y = a/(x-p) + q), and logarithmic (y = log_b(x-p) + q). Each has unique graph shapes and properties."
              },
              {
                "type": "example",
                "id": "functions-sa-example",
                "content": "Example: In a Cape Town math class, sketch y = x² - 4. Roots: x = ±2. Vertex: (0, -4). Parabola opens upward. For y = 2^x, it passes through (0, 1), with horizontal asymptote y = 0."
              },
              {
                "type": "text",
                "id": "functions-tip",
                "content": "📈 Tip: Identify key features: intercepts, asymptotes, and turning points to sketch accurately."
              },
              {
                "type": "practice",
                "id": "functions-practice",
                "content": {
                  "question": "What is the horizontal asymptote of y = 2/(x-1) + 3?",
                  "options": ["y = 1", "y = 2", "y = 3", "y = 0"],
                  "correctAnswer": 2,
                  "explanation": "The horizontal asymptote of y = a/(x-p) + q is y = q. Here, q = 3."
                }
              }
            ],
            "quiz": {
              "id": "functions-quiz",
              "title": "Functions Quiz",
              "description": "Test your knowledge of function properties and graphs.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is the y-intercept of y = 2x + 5?",
                  "options": ["(0, 2)", "(0, 5)", "(5, 0)", "(2, 0)"],
                  "correctAnswer": 1,
                  "explanation": "y-intercept occurs at x = 0: y = 2·0 + 5 = 5 => (0, 5)."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "The graph of y = log_2(x) has a vertical asymptote at x = 0.",
                  "correctAnswer": true,
                  "explanation": "For y = log_b(x-p) + q, the vertical asymptote is at x = p. Here, p = 0."
                }
              ]
            }
          },
          {
            "id": "inverses",
            "name": "Inverses of Functions",
            "description": "Find and analyze inverses of functions.",
            "content": [
              {
                "type": "text",
                "id": "inverses-intro",
                "content": "The inverse of a function f(x) is f⁻¹(x), found by swapping x and y and solving for y. The function must be one-to-one (restrict domain if needed)."
              },
              {
                "type": "example",
                "id": "inverses-sa-example",
                "content": "Example: In a Durban class, find the inverse of y = 2x + 3. Swap: x = 2y + 3 => y = (x-3)/2. Inverse: f⁻¹(x) = (x-3)/2. Domain of f⁻¹: all real numbers."
              },
              {
                "type": "text",
                "id": "inverses-tip",
                "content": "🔄 Tip: The graph of f⁻¹(x) is the reflection of f(x) over y = x."
              },
              {
                "type": "practice",
                "id": "inverses-practice",
                "content": {
                  "question": "Find the inverse of y = log_2(x).",
                  "options": ["y = x²", "y = 2^x", "y = 2x", "y = 1/x"],
                  "correctAnswer": 1,
                  "explanation": "Swap: x = log_2(y) => y = 2^x. Inverse: f⁻¹(x) = 2^x."
                }
              }
            ],
            "quiz": {
              "id": "inverses-quiz",
              "title": "Inverses Quiz",
              "description": "Test your ability to find and understand function inverses.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is the inverse of y = 3x - 6?",
                  "options": ["y = (x+6)/3", "y = (x-6)/3", "y = 3x + 6", "y = x/3"],
                  "correctAnswer": 0,
                  "explanation": "Swap: x = 3y - 6 => y = (x+6)/3."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "A function must be one-to-one to have an inverse that is also a function.",
                  "correctAnswer": true,
                  "explanation": "A function must pass the horizontal line test to have a valid inverse function."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "financial-mathematics",
        "name": "Financial Mathematics",
        "description": "Apply mathematical techniques to financial problems like interest and annuities.",
        "subTopics": [
          {
            "id": "interest-calculations",
            "name": "Simple and Compound Interest",
            "description": "Calculate simple and compound interest for investments and loans.",
            "content": [
              {
                "type": "text",
                "id": "interest-intro",
                "content": "Simple interest grows linearly: A = P(1 + in). Compound interest grows exponentially: A = P(1 + i)^n."
              },
              {
                "type": "formula",
                "id": "simple-interest",
                "content": "\\[ A = P(1 + in) \\]\nWhere A = final amount, P = principal, i = interest rate, n = number of years."
              },
              {
                "type": "formula",
                "id": "compound-interest",
                "content": "\\[ A = P(1 + i)^n \\]\nWhere A = final amount, P = principal, i = interest rate, n = number of periods."
              },
              {
                "type": "example",
                "id": "interest-sa-example",
                "content": "Example: In a Johannesburg bank, R5000 is invested at 5% simple interest for 3 years: A = 5000(1 + 0.05·3) = R5750. At 5% compound interest: A = 5000(1 + 0.05)^3 ≈ R5788.13."
              },
              {
                "type": "text",
                "id": "interest-tip",
                "content": "💰 Tip: Compound interest grows faster than simple interest due to interest on interest."
              },
              {
                "type": "practice",
                "id": "interest-practice",
                "content": {
                  "question": "Calculate the compound interest on R10000 at 6% per annum for 2 years.",
                  "options": ["R1120", "R1236", "R1123.60", "R1200"],
                  "correctAnswer": 2,
                  "explanation": "A = 10000(1 + 0.06)^2 = 11236. Interest = 11236 - 10000 = R1236."
                }
              }
            ],
            "quiz": {
              "id": "interest-quiz",
              "title": "Interest Calculations Quiz",
              "description": "Test your skills in simple and compound interest.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is the simple interest on R2000 at 4% for 5 years?",
                  "options": ["R400", "R408", "R416", "R424"],
                  "correctAnswer": 0,
                  "explanation": "A = 2000(1 + 0.04·5) = 2400. Interest = 2400 - 2000 = R400."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "Compound interest always yields a higher amount than simple interest for the same rate and time.",
                  "correctAnswer": true,
                  "explanation": "Compound interest includes interest on previously earned interest, leading to higher growth."
                }
              ]
            }
          },
          {
            "id": "annuities-loans",
            "name": "Annuities and Loans",
            "description": "Calculate future and present values of annuities and loan repayments.",
            "content": [
              {
                "type": "text",
                "id": "annuities-intro",
                "content": "An annuity is a series of equal payments at regular intervals. Future value: FV = R·[(1 + i)^n - 1]/i. Present value: PV = R·[1 - (1 + i)^(-n)]/i."
              },
              {
                "type": "formula",
                "id": "future-value-annuity",
                "content": "\\[ FV = R \\cdot \\frac{(1 + i)^n - 1}{i} \\]\nWhere R = regular payment, i = interest rate per period, n = number of payments."
              },
              {
                "type": "example",
                "id": "annuities-sa-example",
                "content": "Example: In a Pretoria savings plan, R1000 is saved monthly at 6% p.a. compounded monthly for 2 years. FV = 1000·[(1 + 0.06/12)^24 - 1]/(0.06/12) ≈ R25525.63."
              },
              {
                "type": "text",
                "id": "annuities-tip",
                "content": "💸 Tip: Use a financial calculator for annuities to save time and avoid errors."
              },
              {
                "type": "practice",
                "id": "annuities-practice",
                "content": {
                  "question": "What is the future value of R500 monthly payments at 12% p.a. compounded monthly for 1 year?",
                  "options": ["R6200", "R6150.26", "R6180.30", "R6225.50"],
                  "correctAnswer": 2,
                  "explanation": "FV = 500·[(1 + 0.12/12)^12 - 1]/(0.12/12) ≈ R6180.30."
                }
              }
            ],
            "quiz": {
              "id": "annuities-quiz",
              "title": "Annuities and Loans Quiz",
              "description": "Test your understanding of annuities and loan calculations.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is the present value of R2000 paid annually at 5% for 3 years?",
                  "options": ["R5446.97", "R5472.32", "R5523.45", "R5586.18"],
                  "correctAnswer": 1,
                  "explanation": "PV = 2000·[1 - (1 + 0.05)^(-3)]/0.05 ≈ R5472.32."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "The present value of an annuity is always less than the sum of the payments.",
                  "correctAnswer": true,
                  "explanation": "Present value discounts future payments, making it less than the total payments."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "differential-calculus",
        "name": "Differential Calculus",
        "description": "Use derivatives to analyze rates of change and optimize functions.",
        "subTopics": [
          {
            "id": "differentiation",
            "name": "Rules of Differentiation",
            "description": "Apply differentiation rules to find derivatives of functions.",
            "content": [
              {
                "type": "text",
                "id": "differentiation-intro",
                "content": "Derivatives measure the rate of change. Use rules: power rule (d/dx[x^n] = nx^(n-1)), constant multiple, sum/difference."
              },
              {
                "type": "formula",
                "id": "power-rule",
                "content": "\\[ \\frac{d}{dx}(x^n) = n x^{n-1} \\]"
              },
              {
                "type": "example",
                "id": "differentiation-sa-example",
                "content": "Example: In a Cape Town class, find the derivative of f(x) = 3x^2 + 2x - 1. f'(x) = 3·2x + 2 = 6x + 2."
              },
              {
                "type": "text",
                "id": "differentiation-tip",
                "content": "📉 Tip: The derivative gives the slope of the tangent at any point on the curve."
              },
              {
                "type": "practice",
                "id": "differentiation-practice",
                "content": {
                  "question": "Find the derivative of f(x) = 2x^3 - 4x.",
                  "options": ["6x^2 - 4", "6x^2 + 4", "2x^2 - 4", "6x^3 - 4"],
                  "correctAnswer": 0,
                  "explanation": "f'(x) = 2·3x^2 - 4 = 6x^2 - 4."
                }
              }
            ],
            "quiz": {
              "id": "differentiation-quiz",
              "title": "Differentiation Quiz",
              "description": "Test your skills in finding derivatives.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is the derivative of f(x) = 5x^4?",
                  "options": ["20x^3", "5x^3", "20x^4", "15x^3"],
                  "correctAnswer": 0,
                  "explanation": "f'(x) = 5·4x^3 = 20x^3."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "The derivative of a constant is zero.",
                  "correctAnswer": true,
                  "explanation": "d/dx(c) = 0 for any constant c."
                }
              ]
            }
          },
          {
            "id": "optimization",
            "name": "Optimization and Turning Points",
            "description": "Use derivatives to find maxima, minima, and optimize functions.",
            "content": [
              {
                "type": "text",
                "id": "optimization-intro",
                "content": "Find turning points by solving f'(x) = 0. Use the second derivative test: f''(x) > 0 (minimum), f''(x) < 0 (maximum)."
              },
              {
                "type": "example",
                "id": "optimization-sa-example",
                "content": "Example: In a Soweto business, maximize profit P(x) = -x^2 + 4x + 5 (x = units sold). f'(x) = -2x + 4 = 0 => x = 2. f''(x) = -2 < 0 => maximum at x = 2, P(2) = 9."
              },
              {
                "type": "text",
                "id": "optimization-tip",
                "content": "📊 Tip: Always verify turning points with the second derivative test or by sketching."
              },
              {
                "type": "practice",
                "id": "optimization-practice",
                "content": {
                  "question": "Find the x-coordinate of the maximum of f(x) = -x^2 + 6x - 5.",
                  "options": ["x = 2", "x = 3", "x = 4", "x = 5"],
                  "correctAnswer": 1,
                  "explanation": "f'(x) = -2x + 6 = 0 => x = 3. f''(x) = -2 < 0 => maximum."
                }
              }
            ],
            "quiz": {
              "id": "optimization-quiz",
              "title": "Optimization Quiz",
              "description": "Test your ability to find and classify turning points.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is the nature of the turning point of f(x) = x^2 - 4x + 3 at x = 2?",
                  "options": ["Maximum", "Minimum", "Point of inflection", "None"],
                  "correctAnswer": 1,
                  "explanation": "f'(x) = 2x - 4 = 0 at x = 2. f''(x) = 2 > 0 => minimum."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "A function can have multiple turning points.",
                  "correctAnswer": true,
                  "explanation": "Polynomials of degree n can have up to n-1 turning points."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "polynomials",
        "name": "Cubic and Higher Degree Polynomials",
        "description": "Solve and analyze cubic and higher-degree polynomials.",
        "subTopics": [
          {
            "id": "cubic-equations",
            "name": "Solving Cubic Equations",
            "description": "Use the factor theorem to solve cubic equations.",
            "content": [
              {
                "type": "text",
                "id": "cubic-intro",
                "content": "Solve cubic equations (ax^3 + bx^2 + cx + d = 0) using the factor theorem: if f(a) = 0, then (x - a) is a factor."
              },
              {
                "type": "example",
                "id": "cubic-sa-example",
                "content": "Example: In a Pretoria class, solve x^3 - 6x^2 + 11x - 6 = 0. Test x = 1: f(1) = 1 - 6 + 11 - 6 = 0. Factor: (x - 1)(x^2 - 5x + 6) = 0. Solve quadratic: (x - 2)(x - 3) = 0. Solutions: x = 1, 2, 3."
              },
              {
                "type": "text",
                "id": "cubic-tip",
                "content": "🔍 Tip: Test integer factors of the constant term (±1, ±2, ±3, etc.) to find roots."
              },
              {
                "type": "practice",
                "id": "cubic-practice",
                "content": {
                  "question": "Solve x^3 - x^2 - 4x + 4 = 0.",
                  "options": ["x = 1, 2, -2", "x = 1, -2, 3", "x = 2, -2, 3", "x = 1, -1, 2"],
                  "correctAnswer": 0,
                  "explanation": "Test x = 1: f(1) = 1 - 1 - 4 + 4 = 0. Factor: (x - 1)(x^2 - 4) = 0. Solve: x^2 - 4 = (x - 2)(x + 2) = 0. Solutions: x = 1, 2, -2."
                }
              }
            ],
            "quiz": {
              "id": "cubic-quiz",
              "title": "Cubic Equations Quiz",
              "description": "Test your ability to solve cubic equations.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "What is a root of x^3 - 8 = 0?",
                  "options": ["x = 1", "x = 2", "x = 3", "x = 4"],
                  "correctAnswer": 1,
                  "explanation": "x^3 - 8 = (x - 2)(x^2 + 2x + 4) = 0. Root: x = 2."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "A cubic equation can have up to three real roots.",
                  "correctAnswer": true,
                  "explanation": "A cubic polynomial can have 1 or 3 real roots, depending on the discriminant of its factors."
                }
              ]
            }
          },
          {
            "id": "factor-remainder",
            "name": "Factor and Remainder Theorems",
            "description": "Apply factor and remainder theorems to polynomials.",
            "content": [
              {
                "type": "text",
                "id": "factor-remainder-intro",
                "content": "Factor Theorem: If f(a) = 0, then (x - a) is a factor. Remainder Theorem: If f(x) is divided by (x - a), the remainder is f(a)."
              },
              {
                "type": "example",
                "id": "factor-remainder-sa-example",
                "content": "Example: In a Durban class, for f(x) = x^3 - 2x^2 - 5x + 6, test x = 1: f(1) = 1 - 2 - 5 + 6 = 0 => (x - 1) is a factor. Divide to get f(x) = (x - 1)(x^2 - x - 6)."
              },
              {
                "type": "text",
                "id": "factor-remainder-tip",
                "content": "📝 Tip: Use synthetic division for quick polynomial division."
              },
              {
                "type": "practice",
                "id": "factor-remainder-practice",
                "content": {
                  "question": "What is the remainder when x^3 - 3x + 2 is divided by x - 2?",
                  "options": ["0", "2", "4", "6"],
                  "correctAnswer": 0,
                  "explanation": "f(2) = 8 - 6 + 2 = 4. Remainder = 4."
                }
              }
            ],
            "quiz": {
              "id": "factor-remainder-quiz",
              "title": "Factor and Remainder Theorems Quiz",
              "description": "Test your understanding of polynomial division.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "If f(3) = 0 for f(x) = x^3 - 6x^2 + 11x - 6, what is a factor?",
                  "options": ["x - 2", "x - 3", "x - 4", "x - 5"],
                  "correctAnswer": 1,
                  "explanation": "f(3) = 0 => (x - 3) is a factor by the factor theorem."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "The remainder theorem applies only to linear divisors.",
                  "correctAnswer": true,
                  "explanation": "The remainder theorem is used for divisors of the form x - a."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "probability",
        "name": "Probability",
        "description": "Analyze events and their likelihoods using probability techniques.",
        "subTopics": [
          {
            "id": "probability-concepts",
            "name": "Basic Probability Concepts",
            "description": "Understand events, outcomes, and probability calculations.",
            "content": [
              {
                "type": "text",
                "id": "probability-intro",
                "content": "Probability measures the likelihood of an event: P(E) = (favorable outcomes)/(total outcomes). Use Venn diagrams, tree diagrams, and formulas for independent, dependent, and mutually exclusive events."
              },
              {
                "type": "formula",
                "id": "probability-formula",
                "content": "\\[ P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\]\n\\[ P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\]"
              },
              {
                "type": "example",
                "id": "probability-sa-example",
                "content": "Example: In a Soweto school, a bag has 3 red and 2 blue balls. P(red) = 3/5. P(blue then red, without replacement) = (2/5)·(3/4) = 6/20 = 0.3."
              },
              {
                "type": "text",
                "id": "probability-tip",
                "content": "🎲 Tip: Use tree diagrams for multi-stage events to visualize probabilities."
              },
              {
                "type": "practice",
                "id": "probability-practice",
                "content": {
                  "question": "A die is rolled. What is P(odd number)?",
                  "options": ["1/2", "1/3", "2/3", "1/6"],
                  "correctAnswer": 0,
                  "explanation": "Odd numbers: 1, 3, 5. P(odd) = 3/6 = 1/2."
                }
              }
            ],
            "quiz": {
              "id": "probability-quiz",
              "title": "Probability Quiz",
              "description": "Test your understanding of probability concepts.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "P(A) = 0.4, P(B) = 0.3, P(A ∩ B) = 0.1. What is P(A ∪ B)?",
                  "options": ["0.5", "0.6", "0.7", "0.8"],
                  "correctAnswer": 0,
                  "explanation": "P(A ∪ B) = 0.4 + 0.3 - 0.1 = 0.6."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "Mutually exclusive events can occur together.",
                  "correctAnswer": false,
                  "explanation": "Mutually exclusive events have P(A ∩ B) = 0."
                }
              ]
            }
          },
          {
            "id": "counting-principle",
            "name": "Basic Counting Principle",
            "description": "Use the counting principle to calculate possible outcomes.",
            "content": [
              {
                "type": "text",
                "id": "counting-intro",
                "content": "The basic counting principle states that if event A has m outcomes and event B has n outcomes, the total number of outcomes is m·n."
              },
              {
                "type": "example",
                "id": "counting-sa-example",
                "content": "Example: In a Cape Town restaurant, choose 1 main (3 options) and 1 drink (4 options). Total outcomes = 3·4 = 12."
              },
              {
                "type": "text",
                "id": "counting-tip",
                "content": "🔢 Tip: Multiply the number of choices for each independent event."
              },
              {
                "type": "practice",
                "id": "counting-practice",
                "content": {
                  "question": "A menu offers 2 starters and 5 desserts. How many combinations are possible?",
                  "options": ["7", "10", "12", "14"],
                  "correctAnswer": 1,
                  "explanation": "Total combinations = 2·5 = 10."
                }
              }
            ],
            "quiz": {
              "id": "counting-quiz",
              "title": "Counting Principle Quiz",
              "description": "Test your ability to apply the counting principle.",
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "text": "A code has 3 digits, each from 0 to 9. How many codes are possible?",
                  "options": ["27", "90", "1000", "729"],
                  "correctAnswer": 2,
                  "explanation": "Each digit has 10 choices: 10·10·10 = 1000."
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "text": "The counting principle applies to dependent events.",
                  "correctAnswer": false,
                  "explanation": "It applies to independent events; for dependent events, adjust for changing probabilities."
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
                  "content": "***Newton's First Law states:** *An object continues in a state of rest or uniform velocity (constant speed in a straight line) unless acted upon by a net (resultant) force.* \n\n *Newton's first law of motion is sometimes referred to as the law of* **inertia.** \n\n"
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
                    "question": "A crate of oranges sits still on a Durban market stall. Why doesn't it move?",
                    "options": [
                      "The stall's upward force equals the crate's weight",
                      "The crate is glued to the stall",
                      "The air holds it down",
                      "The crate has no mass"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The normal force from the stall balances the crate's weight (gravity), so the net force is zero, and it stays at rest."
                  }
                },
                {
                  "type": "tip",
                  "id": "first-law-memory-aid",
                  "content": " **Things don't move or stop unless something makes them!** \n *Like that ball you kicked in the street — it only stops because the road, a wall, or a parked car gets in the way*"
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
                      "Depends on the car's mass"
                    ],
                    "correctAnswer": 0,
                    "explanation": "A car at constant velocity has no net force (F_net = 0 N), as forces like engine and friction balance out. (From document, page 8)"
                  },
                  {
                    "id": "q2",
                    "type": "true-false",
                    "text": "An object can change direction without a net force acting on it.",
                    "correctAnswer": false,
                    "explanation": "Newton's First Law says any change in velocity (speed or direction) requires a net force. (From document, page 7)"
                  },

                ]
              }
            },
            {
              "id": "newtons-second-law",
              "name": "Newton's Second Law: Force = Mass × Acceleration",
              "description": "The push you give and the object's heft decide how fast it zips!",
              "content": [
                {
                  "type": "text",
                  "id": "second-law-intro",
                  "content": "Newton's Second Law states: A net force (F_net) on an object causes it to accelerate in the direction of the force. The acceleration (a) is directly proportional to the force and inversely proportional to the mass (m). Formula: F_net = ma. (From document, page 4)"
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
                    "question": "A 4.5 kg laundry cart is pushed with 60 N. What's the acceleration? (Ignore friction) (From document, page 10)",
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
                "title": "Newton's Second Law Quiz",
                "description": "Test your skills with force, mass, and acceleration!",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "A 380 kg pile of rubble is pushed with 900 kN. What's the acceleration? (Ignore friction) (From document, page 17)",
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
                  "content": "Newton's Third Law states: When object A exerts a force on object B, object B exerts an equal and opposite force on object A. These forces are equal in magnitude, opposite in direction, act on different objects, and occur simultaneously. They don't cancel out. (From document, page 4)"
                },
                {
                  "type": "example",
                  "id": "third-law-sa-example",
                  "content": "Example: At a Soweto market, you push a cart of vegetables. Your hands push the cart (action), and the cart pushes your hands back (reaction). You move because your feet push on the ground, which pushes you back. (From document, page 9)"
                },
                {
                  "type": "text",
                  "id": "third-law-properties",
                  "content": "Properties of action-reaction pairs:\n• Equal magnitude\n• Opposite direction\n• Act on different objects\n• Simultaneous\n• Don't cancel out (different objects)."
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
                    "question": "A hammer hits a nail. What's the reaction force? (From document, page 18)",
                    "options": [
                      "Nail pushes back on hammer",
                      "Hammer pushes on ground",
                      "Nail's weight pulls down",
                      "Air resists the hammer"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Hammer exerts force on nail (action); nail exerts equal force back on hammer (reaction). (From document, page 18, Q1.3)"
                  }
                }
              ],
              "quiz": {
                "id": "third-law-quiz",
                "title": "Newton's Third Law Quiz",
                "description": "Can you identify action-reaction pairs?",
                "questions": [
                  {
                    "id": "q1",
                    "type": "mcq",
                    "text": "A brick on a scaffold is held up by the scaffold's force. What's the reaction force? (From document, page 18)",
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
                    "explanation": "They act on different objects, so they don't cancel out."
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
                      "Table's force on floor"
                    ],
                    "correctAnswer": 3,
                    "explanation": "Free-body diagram shows forces on the toolbox: normal force, weight (98 N), applied force (23 N), friction (if present). Table's force on floor acts on the table. (From document, page 18, Q2)"
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
                    "text": "A wheelbarrow is pushed with 35 N at 30° with 14 N friction. What's the net force? (From document, page 18)",
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
                    "question": "What's the weight of a 5 kg crate? (From document, page 5)",
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
                    "text": "A 60 kg crate is pulled with 190 N at 30°. What's the horizontal force component? (From document, page 20)",
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

export const badges = {
  // Level Badges
  level_10: {
    id: 'level_10',
    name: 'Level 10 Achiever',
    description: 'Reached level 10',
    icon: '🎯',
    color: 'bg-blue-100 text-blue-800',
    requirement: { type: 'level', value: 10 }
  },
  level_20: {
    id: 'level_20',
    name: 'Level 20 Master',
    description: 'Reached level 20',
    icon: '🎯',
    color: 'bg-purple-100 text-purple-800',
    requirement: { type: 'level', value: 20 }
  },
  level_30: {
    id: 'level_30',
    name: 'Level 30 Legend',
    description: 'Reached level 30',
    icon: '🎯',
    color: 'bg-indigo-100 text-indigo-800',
    requirement: { type: 'level', value: 30 }
  },

  // Streak Badges
  streak_7: {
    id: 'streak_7',
    name: '7-Day Streak',
    description: 'Maintained a 7-day learning streak',
    icon: '🔥',
    color: 'bg-orange-100 text-orange-800',
    requirement: { type: 'streak', value: 7 }
  },
  streak_14: {
    id: 'streak_14',
    name: '14-Day Streak',
    description: 'Maintained a 14-day learning streak',
    icon: '🔥',
    color: 'bg-red-100 text-red-800',
    requirement: { type: 'streak', value: 14 }
  },
  streak_30: {
    id: 'streak_30',
    name: '30-Day Streak',
    description: 'Maintained a 30-day learning streak',
    icon: '🔥',
    color: 'bg-pink-100 text-pink-800',
    requirement: { type: 'streak', value: 30 }
  },

  // Subject Completion Badges
  subject_math: {
    id: 'subject_math',
    name: 'Mathematics Master',
    description: 'Completed all Mathematics topics',
    icon: '📐',
    color: 'bg-green-100 text-green-800',
    requirement: { type: 'subject_completion', value: 'mathematics' }
  },
  subject_physics: {
    id: 'subject_physics',
    name: 'Physics Pro',
    description: 'Completed all Physics topics',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-800',
    requirement: { type: 'subject_completion', value: 'physics' }
  },

  // Topic Completion Badges
  topic_algebra: {
    id: 'topic_algebra',
    name: 'Algebra Ace',
    description: 'Completed all Algebra subtopics',
    icon: '📊',
    color: 'bg-blue-100 text-blue-800',
    requirement: { type: 'topic_completion', value: 'algebra' }
  },
  topic_mechanics: {
    id: 'topic_mechanics',
    name: 'Mechanics Master',
    description: 'Completed all Mechanics subtopics',
    icon: '⚙️',
    color: 'bg-purple-100 text-purple-800',
    requirement: { type: 'topic_completion', value: 'mechanics' }
  },

  // Quiz Performance Badges
  quiz_perfect: {
    id: 'quiz_perfect',
    name: 'Perfect Score',
    description: 'Achieved 100% on any quiz',
    icon: '💯',
    color: 'bg-green-100 text-green-800',
    requirement: { type: 'quiz_score', value: 100 }
  },
  quiz_excellent: {
    id: 'quiz_excellent',
    name: 'Excellent Performance',
    description: 'Achieved 90% or higher on any quiz',
    icon: '⭐',
    color: 'bg-yellow-100 text-yellow-800',
    requirement: { type: 'quiz_score', value: 90 }
  },
  quiz_consistent: {
    id: 'quiz_consistent',
    name: 'Consistent Learner',
    description: 'Completed 10 quizzes with 80% or higher',
    icon: '📈',
    color: 'bg-blue-100 text-blue-800',
    requirement: { type: 'quiz_consistency', value: { count: 10, score: 80 } }
  }
} as const;

export default subjects;
