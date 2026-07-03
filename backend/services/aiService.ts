import { GoogleGenAI } from "@google/genai";
import { buildRecommendationPrompt } from "../utils/promptBuilder";

const apiKey = process.env.AI_API_KEY;

if (!apiKey) {
    throw new Error("AI_API_KEY is missing.");
}

const ai = new GoogleGenAI({
    apiKey,
});

export interface RecommendationInput {
    gender: "male" | "female";
    bodyFatPercent: number;
    BMI: number;
    calorieTarget: number;
    waterIntake: number;
    weightLossRate: number;
    seeResultsDays: number;
}

export const generateRecommendations = async (
    userData: RecommendationInput
): Promise<any> => {
    const prompt = buildRecommendationPrompt(userData);

    const response = await ai.models.generateContent({
        model: process.env.AI_MODEL || "gemini-2.5-flash",
        contents: prompt,
    });

    try {
        return JSON.parse(response.text ?? "{}");
    } catch (error) {
        console.error("Failed to parse AI response:", response.text);
        throw new Error("AI returned an invalid JSON response.");
    }
};