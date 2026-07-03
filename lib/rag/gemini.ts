import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';

export const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY' });

export function isGeminiEnabled(): boolean {
  return !!apiKey && apiKey !== '';
}
