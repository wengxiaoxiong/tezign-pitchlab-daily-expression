'use server'

import { GoogleGenAI, Type } from "@google/genai";
import { Feedback, AuthorType } from "@/lib/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getSpeechFeedback(audioBase64: string, topic: string): Promise<Feedback> {
  const prompt = `
    You are an insightful impromptu speech critic and communication coach.

    Please generate feedback based on the user's speech recording, including 5 social media-style comments, comprehensive diagnosis, and improvement directions.

    1. Comments:
       - Generate 2-5 "Coach" comments: Gentle tone, encouraging, combining specific methodologies with the user's speech content (about ${topic}).
       - Generate 3 "Listener" comments: Focus on emotional resonance, sharing feelings after listening.

    2. Golden Sentences:
       Please extract 3 [absolutely differentiated] golden sentences from the user's speech:
       - First: Focus on logical insight or philosophical depth.
       - Second: Focus on emotional resonance or beautiful imagery.
       - Third: Focus on powerful conclusion or call to action.
       
    3. Diagnosis:
       Analyze the speech from 3-5 dimensions (e.g., Logic, Emotion, Delivery, Vocabulary).
       - issue: The dimension name.
       - score: 0-100 score.
       - detail: A brief explanation of the diagnosis.

    4. Improvements:
       Provide 2-3 specific directions for improvement.
       - id: unique id.
       - title: A short title for the direction.
       - instruction: Detailed instruction on how to improve.

    JSON Structure Requirements:
    - comments: Array.
    - goldenSentences: Array of 3 strings.
    - diagnosis: Array of objects.
    - improvements: Array of objects.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: {
      parts: [
        { inlineData: { data: audioBase64, mimeType: 'audio/webm' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          comments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                authorName: { type: Type.STRING },
                authorTitle: { type: Type.STRING },
                authorType: { type: Type.STRING, enum: Object.values(AuthorType) },
                content: { type: Type.STRING },
                avatar: { type: Type.STRING },
                likes: { type: Type.NUMBER }
              },
              required: ["id", "authorName", "authorTitle", "authorType", "content", "avatar", "likes"]
            }
          },
          goldenSentences: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 3,
            maxItems: 3
          },
          diagnosis: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                issue: { type: Type.STRING },
                score: { type: Type.NUMBER },
                detail: { type: Type.STRING }
              },
              required: ["issue", "score", "detail"]
            }
          },
          improvements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                instruction: { type: Type.STRING }
              },
              required: ["id", "title", "instruction"]
            }
          }
        },
        required: ["comments", "goldenSentences", "diagnosis", "improvements"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function generatePosterImage(sentence: string, topic: string): Promise<string> {
  const prompt = `A cinematic, atmospheric photography piece for the background of a quote card. Theme: "${topic}". Style: Minimalist, soft natural light, high quality, artistic. No text in the image. 3:4 aspect ratio.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "3:4" } }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  throw new Error("Failed to generate image");
}
