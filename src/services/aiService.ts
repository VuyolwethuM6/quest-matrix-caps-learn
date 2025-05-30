import env from '@/config/env';

const API_KEY = 'AIzaSyCuV-h78IFAQqB2znLXR6a91JP9tSJSIbc';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface AIResponse {
  content: string;
  error?: string;
}

export const generateAIResponse = async (prompt: string): Promise<AIResponse> => {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are Vito, an AI learning assistant for CAPS curriculum students. 
            Your role is to help students understand their subjects better and provide 
            educational support.

            Important instructions for your responses:
            1. Keep responses concise and to the point (2-3 sentences maximum)
            2. Use simple, clear language that students can easily understand
            3. Break down complex concepts into basic terms
            4. Use examples that relate to students' daily lives
            5. Format your response with:
               - Short paragraphs
               - Bullet points for key points
               - Bold text for important terms
               - LaTeX for mathematical equations
               - Code blocks for programming examples

            Remember: Your goal is to make learning easy and enjoyable.

            Here's the student's question: ${prompt}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return {
        content: data.candidates[0].content.parts[0].text
      };
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    return {
      content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}; 