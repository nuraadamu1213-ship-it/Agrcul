
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askAgronomist = async (query: string, history: {role: string, parts: {text: string}[]}[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: query }] }],
    config: {
      systemInstruction: "You are an expert agronomist advisor named AgroSmart AI. Provide precise, scientific, and practical advice on farming, irrigation, pest control, and crop management. Keep answers concise and helpful.",
      temperature: 0.7,
    }
  });
  return response.text;
};

export const analyzeCropImage = async (base64Image: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: "Analyze this crop or plant image. Identify the plant, detect any diseases or pests, and provide a diagnosis with treatment recommendations in a structured format." }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, description: "General health status (e.g., Healthy, Infected, Nutrient Deficient)" },
          confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" },
          diagnosis: { type: Type.STRING, description: "Detailed description of what is seen" },
          recommendations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Step-by-step actions for the farmer"
          }
        },
        required: ["status", "confidence", "diagnosis", "recommendations"]
      }
    }
  });
  
  return JSON.parse(response.text || '{}');
};
