export const quadraticEquations = {
    "id": "quadratic-equations",
    "name": "Quadratic Equations",
    "description": "Learn to solve quadratic equations using factorisation, the quadratic formula, fractions, and substitution.",
    "content": [
      {
        "type": "text",
        "id": "intro-grade10-recap",
        "content": "In Grade 10, you learned how to solve linear and quadratic equations, work with inequalities, and use methods like elimination and substitution. Now in Grade 11, we build on that knowledge."
      },
      {
        "type": "text",
        "id": "quad-definition",
        "content": "A quadratic equation is any equation of the form \\( ax^2 + bx + c = 0 \\), where \\( a \\ne 0 \\). It’s called a second-degree equation because the highest exponent of \\( x \\) is 2."
      },
      {
        "type": "formula",
        "id": "quad-standard-form",
        "content": "\\[ ax^2 + bx + c = 0 \\]"
      },
      {
        "type": "text",
        "id": "quad-root-definition",
        "content": "The solutions of a quadratic equation are called the roots — values of \\( x \\) that make the equation true."
      },
      {
        "type": "video",
        "id": "video-factorisation",
        "content": "https://video.tutonic.org/T11quadraticequations"
      },
      {
        "type": "text",
        "id": "factoring-intro",
        "content": "Factorisation uses the zero-product rule: If \\( ab = 0 \\), then \\( a = 0 \\) or \\( b = 0 \\)."
      },
      {
        "type": "example",
        "id": "example-fact-1",
        "content": "**Solve for \\( x \\):**  \n\\( 2x^2 - 3x = 0 \\)\n\nFactorise: \\( x(2x - 3) = 0 \\)  \nSolutions: \\( x = 0 \\) or \\( x = \\frac{3}{2} \\)"
      },
      {
        "type": "example",
        "id": "example-fact-2",
        "content": "**Solve for \\( x \\):**  \n\\( (2x - 1)(x + 3) = 0 \\)  \nSolutions: \\( x = \\frac{1}{2} \\) or \\( x = -3 \\)"
      },
      {
        "type": "example",
        "id": "example-fact-3",
        "content": "**Solve for \\( a \\):**  \n\\( 2a(a - 1) + 3(a - 1) = 0 \\)\nFactor: \\( (a - 1)(2a + 3) = 0 \\)  \nSolutions: \\( a = 1 \\) or \\( a = -\\frac{3}{2} \\)"
      },
      {
        "type": "practice",
        "id": "practice-can-you-1",
        "content": {
          "question": "Solve: \\( x^2 - 9 = 0 \\)",
          "options": ["x = -3 or x = 3", "x = 0 or x = 9", "x = 3", "x = -9"],
          "correctAnswer": 0,
          "explanation": "Difference of squares: \\( (x - 3)(x + 3) = 0 \\)"
        }
      },
      {
        "type": "practice",
        "id": "practice-can-you-2",
        "content": {
          "question": "Solve: \\( x(x + 6) = 0 \\)",
          "options": ["x = 0 or x = -6", "x = -6 or x = 6", "x = 0 or x = 6", "x = 0"],
          "correctAnswer": 0,
          "explanation": "Factor is already given: \\( x = 0 \\) or \\( x + 6 = 0 \\Rightarrow x = -6 \\)"
        }
      },
      {
        "type": "tip",
        "id": "tip-factor-methods",
        "content": "🎯 Remember your types of factorisation: common factors, trinomials, difference of squares, grouping, and special products like sum/diff of cubes."
      },

      // ...
      {
        "type": "text",
        "id": "fractions-intro",
        "content": "Quadratic equations can also include **fractions**. The key is to eliminate all denominators using the Lowest Common Denominator (LCD)."
      },
      {
        "type": "tip",
        "id": "fractions-tip-restrictions",
        "content": "⚠️ If a denominator includes a variable (like \\( x + 1 \\)), you must restrict that variable from values that make the denominator zero (e.g. \\( x \\ne -1 \\))."
      },
      {
        "type": "example",
        "id": "fractions-example-1",
        "content": "**Solve for \\( x \\):**  \n\\( \\frac{x}{2(x - 2)} - \\frac{x}{x - 2} = 1 \\)  \n\nStep 1: LCD = \\( 2(x - 2) \\)  \nMultiply through:  \n\\( x - 2x = 2x - 4 \\)  \nSimplify: \\( -x = 2x - 4 \\)  \nSolve: \\( -3x = -4 \\Rightarrow x = \\frac{4}{3} \\)"
      },
      {
        "type": "example",
        "id": "fractions-example-2",
        "content": "**Solve for \\( x \\):**  \n\\( \\frac{x - 2}{x - 1} = \\frac{2x - 1}{x + 7} \\)  \n\nStep 1: LCD = \\( (x - 1)(x + 7) \\)  \nCross-multiply:  \n\\( (x - 2)(x + 7) = (2x - 1)(x - 1) \\)  \nSimplify both sides:  \n\\( x^2 + 5x - 14 = 2x^2 - 3x + 1 \\)  \nBring all terms to one side: \\( x^2 - 8x + 15 = 0 \\)  \nFactorise: \\( (x - 3)(x - 5) = 0 \\)  \n\\( x = 3 \\) or \\( x = 5 \\)"
      },
      {
        "type": "practice",
        "id": "practice-fractions-1",
        "content": {
          "question": "Solve: \\( \\frac{3}{x - 4} + \\frac{x - 3}{x} = 2 \\)",
          "options": [
            "x = 6 or x = -2",
            "x = -3 or x = 2",
            "x = 6 or x = 3",
            "x = -4 or x = 3"
          ],
          "correctAnswer": 0,
          "explanation": "Find the LCD and solve the resulting quadratic: \\( x^2(x - 4) = ... \\)"
        }
      },
      {
        "type": "practice",
        "id": "practice-fractions-2",
        "content": {
          "question": "Solve: \\( \\frac{x + 2}{x + 1} - \\frac{3}{x - 2} = \\frac{1}{x + 1} \\)",
          "options": [
            "x = 5",
            "x = -1",
            "x = 2",
            "x = 0"
          ],
          "correctAnswer": 0,
          "explanation": "Use the LCD of \\( (x + 1)(x - 2) \\) to eliminate denominators and solve."
        }
      },
      {
        "type": "tip",
        "id": "tip-fraction-warning",
        "content": "✅ Always state restrictions upfront: Find values that make the denominator zero and exclude them from the solution set."
      },
      {
        "type": "text",
        "id": "k-method-intro",
        "content": "Sometimes quadratic equations are disguised in more complicated forms. To simplify them, we can use substitution. Replace a repeated expression (like \\( x + 5 \\) or \\( x^2 + 3 \\)) with a new variable (e.g. \\( k \\)), solve, and then substitute back."
      },
      {
        "type": "tip",
        "id": "tip-k-method-reverse",
        "content": "🔁 After solving the simplified equation in terms of \\( k \\), don't forget to **substitute back** to find \\( x \\)!"
      },
      {
        "type": "example",
        "id": "k-method-example-1",
        "content": "**Solve for \\( x \\):**  \n\\( 2(x + 5)^2 + 3(x + 5) - 2 = 0 \\)  \n\nLet \\( k = x + 5 \\)  \nThen the equation becomes: \\( 2k^2 + 3k - 2 = 0 \\)  \nFactorise: \\( (2k - 1)(k + 2) = 0 \\)  \n\\( k = \\frac{1}{2} \\) or \\( k = -2 \\)  \nSubstitute back:  \n\\( x + 5 = \\frac{1}{2} \\Rightarrow x = -\\frac{9}{2} \\)  \n\\( x + 5 = -2 \\Rightarrow x = -7 \\)"
      },
      {
        "type": "example",
        "id": "k-method-example-2",
        "content": "**Solve for \\( x \\):**  \n\\( 3x^2 + x - 1 + \\frac{1}{3x^2 + x - 3} = 0 \\)  \n\nLet \\( k = 3x^2 + x \\)  \nThen the equation becomes: \\( (k - 1) + \\frac{1}{k - 3} = 0 \\)  \nMultiply through by \\( k - 3 \\):  \n\\( (k - 1)(k - 3) + 1 = 0 \\)  \nSimplify: \\( k^2 - 4k + 4 = 0 \\)  \n\\( (k - 2)^2 = 0 \\Rightarrow k = 2 \\)  \nNow solve: \\( 3x^2 + x = 2 \\Rightarrow 3x^2 + x - 2 = 0 \\)  \nFactor: \\( (3x - 2)(x + 1) = 0 \\Rightarrow x = \\frac{2}{3} \\) or \\( x = -1 \\)"
      },
      {
        "type": "practice",
        "id": "practice-k-method-1",
        "content": {
          "question": "Solve: \\( (x^2 + 3)^2 - 2(x^2 + 3) - 8 = 0 \\)",
          "options": [
            "x = -4, 1, -2, -1",
            "x = -1 or 2",
            "x = -2 or 4",
            "x = -3 or 1"
          ],
          "correctAnswer": 0,
          "explanation": "Let \\( k = x^2 + 3 \\) so \\( k^2 - 2k - 8 = 0 \\Rightarrow (k - 4)(k + 2) = 0 \\Rightarrow k = 4 \\) or \\( -2 \\). Then solve \\( x^2 + 3 = 4 \\Rightarrow x = \\pm1 \\) or \\( x^2 + 3 = -2 \\Rightarrow \\text{no real solution} \\)."
        }
      },
      {
        "type": "practice",
        "id": "practice-k-method-2",
        "content": {
          "question": "Solve: \\( \\frac{1}{x^2 - x - 1} = x^2 - x - 1 \\)",
          "options": [
            "x = 0, 1, 2, -1",
            "x = 0 or 1",
            "x = 2 or -1",
            "x = -2 or 1"
          ],
          "correctAnswer": 2,
          "explanation": "Let \\( k = x^2 - x - 1 \\), so equation becomes \\( \\frac{1}{k} = k \\Rightarrow k^2 = 1 \\Rightarrow k = \\pm1 \\). Then solve for \\( x \\): \\( x^2 - x - 1 = 1 \\) and \\( -1 \\)."
        }
      },

      {
        "id": "quadratic-equations-quiz",
        "title": "Quadratic Equations Quiz",
        "description": "Test your understanding of solving quadratic equations using factorisation, substitution, fractions, and the quadratic formula.",
        "questions": [
          {
            "id": "q1",
            "type": "mcq",
            "text": "Which of the following equations is quadratic?",
            "options": [
              "3x + 2 = 0",
              "x^3 - 2x = 0",
              "x^2 - 5x + 6 = 0",
              "x - 7 = 0"
            ],
            "correctAnswer": 2,
            "explanation": "A quadratic equation has the highest exponent of 2: x² - 5x + 6 = 0."
          },
          {
            "id": "q2",
            "type": "true-false",
            "text": "The quadratic formula can solve any quadratic equation, even when it cannot be factorised.",
            "correctAnswer": true,
            "explanation": "Yes. The formula always works if the equation is in standard form."
          },
          {
            "id": "q3",
            "type": "mcq",
            "text": "Solve: (x - 2)(x + 5) = 0",
            "options": [
              "x = 2 or -5",
              "x = -2 or 5",
              "x = -2 or -5",
              "x = 2 or 5"
            ],
            "correctAnswer": 0,
            "explanation": "Set each bracket to 0: x - 2 = 0 ⇒ x = 2, x + 5 = 0 ⇒ x = -5."
          },
          {
            "id": "q4",
            "type": "mcq",
            "text": "Which method is best for solving: (x + 1)^2 + 5(x + 1) = 14?",
            "options": [
              "Factorisation",
              "Quadratic formula",
              "Completing the square",
              "Substitution (k-method)"
            ],
            "correctAnswer": 3,
            "explanation": "Let k = x + 1. Then solve using k-substitution."
          },
          {
            "id": "q5",
            "type": "mcq",
            "text": "Solve: x^2 - 6x + 9 = 0",
            "options": [
              "x = 3",
              "x = -3",
              "x = 3 or -3",
              "x = 0"
            ],
            "correctAnswer": 0,
            "explanation": "Perfect square: (x - 3)^2 = 0 ⇒ x = 3"
          },
          {
            "id": "q6",
            "type": "true-false",
            "text": "If the discriminant is negative, the equation has no real roots.",
            "correctAnswer": true,
            "explanation": "A negative discriminant means the square root is not real."
          },
          {
            "id": "q7",
            "type": "mcq",
            "text": "Solve using the quadratic formula: x^2 + 4x + 3 = 0",
            "options": [
              "x = -3 or x = -1",
              "x = 3 or x = 1",
              "x = 1 or x = -1",
              "x = 0 or x = 4"
            ],
            "correctAnswer": 0,
            "explanation": "Use formula: b² - 4ac = 16 - 12 = 4. Roots: x = -1, x = -3"
          },
          {
            "id": "q8",
            "type": "mcq",
            "text": "Solve for x: (x^2 + 2)^2 = 25 using the k-method.",
            "options": [
              "x = ±3 or ±1",
              "x = 1 or -1",
              "x = ±2",
              "x = 0 or 3"
            ],
            "correctAnswer": 0,
            "explanation": "Let k = x^2 + 2 ⇒ k^2 = 25 ⇒ k = ±5 ⇒ x^2 = 3 or -7 ⇒ x = ±√3"
          },
          {
            "id": "q9",
            "type": "mcq",
            "text": "Solve: \\( \\frac{x - 3}{x + 2} = \\frac{2x + 1}{x - 1} \\)",
            "options": [
              "x = 1 or -2",
              "x = -1 or 3",
              "x = -3 or 2",
              "x = 5 or -1"
            ],
            "correctAnswer": 2,
            "explanation": "Cross-multiply and simplify the resulting quadratic: (x - 3)(x - 1) = (2x + 1)(x + 2)"
          },
          {
            "id": "q10",
            "type": "structured",
            "text": "Choose the correct method for solving each equation and explain your choice:\n\n1. (x - 1)(x + 3) = 0  \n2. (x + 2)^2 + 4(x + 2) = 5  \n3. x^2 + 7x + 1 = 0\n\nUse 'Factorisation', 'k-method', or 'Quadratic formula'.",
            "subQuestions": [
              {
                "id": "q10a",
                "type": "short-answer",
                "text": "1. (x - 1)(x + 3) = 0",
                "correctAnswer": "Factorisation",
                "explanation": "Already factorised."
              },
              {
                "id": "q10b",
                "type": "short-answer",
                "text": "2. (x + 2)^2 + 4(x + 2) = 5",
                "correctAnswer": "k-method",
                "explanation": "Let k = (x + 2)"
              },
              {
                "id": "q10c",
                "type": "short-answer",
                "text": "3. x^2 + 7x + 1 = 0",
                "correctAnswer": "Quadratic formula",
                "explanation": "Does not factorise neatly. Use formula."
              }
            ],
            "explanation": "This assesses strategic decision-making — not just calculations."
          }
        ]
      }
    ],
    quiz :{
        "id": "quadratic-equations-quiz",
        "title": "Quadratic Equations Quiz",
        "description": "Test your understanding of solving quadratic equations using factorisation, substitution, fractions, and the quadratic formula.",
        "questions": [
          {
            "id": "q1",
            "type": "mcq",
            "text": "Which of the following equations is quadratic?",
            "options": [
              "3x + 2 = 0",
              "x^3 - 2x = 0",
              "x^2 - 5x + 6 = 0",
              "x - 7 = 0"
            ],
            "correctAnswer": 2,
            "explanation": "A quadratic equation has the highest exponent of 2: x² - 5x + 6 = 0."
          },
          {
            "id": "q2",
            "type": "true-false",
            "text": "The quadratic formula can solve any quadratic equation, even when it cannot be factorised.",
            "correctAnswer": true,
            "explanation": "Yes. The formula always works if the equation is in standard form."
          },
          {
            "id": "q3",
            "type": "mcq",
            "text": "Solve: (x - 2)(x + 5) = 0",
            "options": [
              "x = 2 or -5",
              "x = -2 or 5",
              "x = -2 or -5",
              "x = 2 or 5"
            ],
            "correctAnswer": 0,
            "explanation": "Set each bracket to 0: x - 2 = 0 ⇒ x = 2, x + 5 = 0 ⇒ x = -5."
          },
          {
            "id": "q4",
            "type": "mcq",
            "text": "Which method is best for solving: (x + 1)^2 + 5(x + 1) = 14?",
            "options": [
              "Factorisation",
              "Quadratic formula",
              "Completing the square",
              "Substitution (k-method)"
            ],
            "correctAnswer": 3,
            "explanation": "Let k = x + 1. Then solve using k-substitution."
          },
          {
            "id": "q5",
            "type": "mcq",
            "text": "Solve: x^2 - 6x + 9 = 0",
            "options": [
              "x = 3",
              "x = -3",
              "x = 3 or -3",
              "x = 0"
            ],
            "correctAnswer": 0,
            "explanation": "Perfect square: (x - 3)^2 = 0 ⇒ x = 3"
          },
          {
            "id": "q6",
            "type": "true-false",
            "text": "If the discriminant is negative, the equation has no real roots.",
            "correctAnswer": true,
            "explanation": "A negative discriminant means the square root is not real."
          },
          {
            "id": "q7",
            "type": "mcq",
            "text": "Solve using the quadratic formula: x^2 + 4x + 3 = 0",
            "options": [
              "x = -3 or x = -1",
              "x = 3 or x = 1",
              "x = 1 or x = -1",
              "x = 0 or x = 4"
            ],
            "correctAnswer": 0,
            "explanation": "Use formula: b² - 4ac = 16 - 12 = 4. Roots: x = -1, x = -3"
          },
          {
            "id": "q8",
            "type": "mcq",
            "text": "Solve for x: (x^2 + 2)^2 = 25 using the k-method.",
            "options": [
              "x = ±3 or ±1",
              "x = 1 or -1",
              "x = ±2",
              "x = 0 or 3"
            ],
            "correctAnswer": 0,
            "explanation": "Let k = x^2 + 2 ⇒ k^2 = 25 ⇒ k = ±5 ⇒ x^2 = 3 or -7 ⇒ x = ±√3"
          },
          {
            "id": "q9",
            "type": "mcq",
            "text": "Solve: \\( \\frac{x - 3}{x + 2} = \\frac{2x + 1}{x - 1} \\)",
            "options": [
              "x = 1 or -2",
              "x = -1 or 3",
              "x = -3 or 2",
              "x = 5 or -1"
            ],
            "correctAnswer": 2,
            "explanation": "Cross-multiply and simplify the resulting quadratic: (x - 3)(x - 1) = (2x + 1)(x + 2)"
          },
          {
            "id": "q10",
            "type": "structured",
            "text": "Choose the correct method for solving each equation and explain your choice:\n\n1. (x - 1)(x + 3) = 0  \n2. (x + 2)^2 + 4(x + 2) = 5  \n3. x^2 + 7x + 1 = 0\n\nUse 'Factorisation', 'k-method', or 'Quadratic formula'.",
            "subQuestions": [
              {
                "id": "q10a",
                "type": "short-answer",
                "text": "1. (x - 1)(x + 3) = 0",
                "correctAnswer": "Factorisation",
                "explanation": "Already factorised."
              },
              {
                "id": "q10b",
                "type": "short-answer",
                "text": "2. (x + 2)^2 + 4(x + 2) = 5",
                "correctAnswer": "k-method",
                "explanation": "Let k = (x + 2)"
              },
              {
                "id": "q10c",
                "type": "short-answer",
                "text": "3. x^2 + 7x + 1 = 0",
                "correctAnswer": "Quadratic formula",
                "explanation": "Does not factorise neatly. Use formula."
              }
            ],
            "explanation": "This assesses strategic decision-making — not just calculations."
          }
        ]
      }

}