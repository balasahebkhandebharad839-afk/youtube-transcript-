
import { GoogleGenAI, Type } from "@google/genai";
import { ProcessingResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const processTranscript = async (
  transcript: string, 
  options: { addHeadings: boolean; seoFocus: boolean }
): Promise<ProcessingResult> => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a professional transcription editor and YouTube script writer. 
    
    TASK:
    1. Clean the provided YouTube transcript.
    2. Remove filler words (uh, um, you know, like), timestamps (00:00), and repetitions.
    3. Correct grammar and punctuation.
    4. Maintain original meaning exactly.
    5. Format output into clear, readable paragraphs.
    6. Make it SEO-friendly.
    ${options.addHeadings ? '7. Add relevant, engaging headings to separate sections.' : ''}
    
    INPUT TRANSCRIPT:
    ${transcript}
    
    OUTPUT FORMAT:
    Provide the response in JSON format with the following structure:
    {
      "cleanedText": "The fully processed and formatted text",
      "seoKeywords": ["keyword1", "keyword2", "keyword3"],
      "readabilityScore": "Grade Level or Descriptive score",
      "wordCount": 123
    }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cleanedText: { type: Type.STRING },
          seoKeywords: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          readabilityScore: { type: Type.STRING },
          wordCount: { type: Type.NUMBER }
        },
        required: ["cleanedText", "seoKeywords", "readabilityScore", "wordCount"]
      }
    }
  });

  const response = await model;
  const resultText = response.text;
  
  if (!resultText) {
    throw new Error("Failed to get response from Gemini API");
  }

  return JSON.parse(resultText);
};
