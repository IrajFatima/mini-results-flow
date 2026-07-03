import * as formRepository from "./formRepository";
import {
    generateRecommendations,
    RecommendationInput,
} from "../services/aiService";

const getAIRecommendations = async (id: string): Promise<string> => {
    const form = await formRepository.getFormById(id);

    if (!form) {
        throw new Error("Form Data not found.");
    }

    const userData: RecommendationInput = {
        gender: form.gender as "male" | "female",
        bodyFatPercent: form.body_fat_percent,
        BMI: form.bmi,
        calorieTarget: form.calorie_target,
        waterIntake: form.water_intake,
        weightLossRate: form.weight_loss_rate,
        seeResultsDays: form.see_results_days,
    };

    return await generateRecommendations(userData);
};

export { getAIRecommendations };