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
export interface RecommendationSection {
    title: string;
    icon: string;
    content: string;
}

export interface AIRecommendation {
    title: string;
    summary: string;
    overallAssessment:
    | "Excellent"
    | "Good"
    | "Fair"
    | "Needs Improvement";
    strengths: string[];
    areasToImprove: string[];
    sections: RecommendationSection[];
    weeklyGoals: string[];
    motivation: string;
}

export const generateRecommendations = async (
    userData: RecommendationInput
): Promise<AIRecommendation> => {
    const prompt = buildRecommendationPrompt(userData);

    const response = await ai.models.generateContent({
        model: process.env.AI_MODEL || "gemini-2.5-flash",
        contents: prompt,
    });

    try {
        return JSON.parse(
            response.text ?? "{}"
        ) as AIRecommendation;
    } catch (error) {
        console.error("Failed to parse AI response:", response.text);
        throw new Error("AI returned an invalid JSON response.");
    }
};