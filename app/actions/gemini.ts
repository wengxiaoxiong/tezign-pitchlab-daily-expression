'use server'

import { GoogleGenAI, Type } from "@google/genai";
import { Feedback, AuthorType } from "@/lib/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getSpeechFeedback(audioBase64: string, topic: string): Promise<Feedback> {
  const prompt = `
    你是一个极具洞察力的即兴演讲评论家和表达教练。

    请根据用户的演讲录音，生成 5 条像社交媒体评论区一样的反馈内容。

    1. 评论角色分配：
       - 生成 2-5 条"表达教练 (COACH)"评论：语气温和、充满鼓励，将具体方法论与用户的演讲内容（关于 ${topic}）结合。
       - 生成 3 条"普通听众 (LISTENER)"评论：侧重情感共鸣，分享听后的感受。

    2. 灵魂金句 (goldenSentences)：
       请从用户的演讲中提取 3 条【绝对差异化】的金句：
       - 第一条：侧重逻辑洞察或哲学深度。
       - 第二条：侧重情感共鸣或优美意境。
       - 第三条：侧重有力结论或行动号召。

    JSON 结构要求：
    - comments: 数组。
    - goldenSentences: 包含 3 个字符串的数组。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
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
          }
        },
        required: ["comments", "goldenSentences"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function generatePosterImage(sentence: string, topic: string): Promise<string> {
  const prompt = `A cinematic, atmospheric photography piece for the background of a quote card. Theme: "${topic}". Style: Minimalist, soft natural light, high quality, artistic. No text in the image. 3:4 aspect ratio.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "3:4" } }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  throw new Error("Failed to generate image");
}
