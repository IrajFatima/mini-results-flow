import api from "./api";
import type { FormData } from "../types/form";
import {
    getFormId,
    removeFormId,
    saveFormId,
} from "../utils/localStorage";

export const submitForm = async (formData: FormData) => {
    try {
        const response = await api.post("/form", formData);
        saveFormId(response.data.id);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error submitting form:", error.message);
        }

        throw error;
    }
};

export const getFormData = async () => {
    try {
        const formId = getFormId();

        if (!formId) {
            throw new Error("Form ID not found.");
        }

        const response = await api.get(`/form/${formId}`);
        const data = response.data.data;

        return {
            gender: data.gender,
            bodyFatPercent: Number(data.body_fat_percent),
            BMI: Number(data.bmi),
            calorieTarget: Number(data.calorie_target),
            waterIntake: Number(data.water_intake),
            weightLossRate: Number(data.weight_loss_rate),
            seeResultsDays: Number(data.see_results_days),
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching form data:", error.message);
        }

        throw error;
    }
};

export const deleteFormData = async () => {
    try {
        const formId = getFormId();

        if (!formId) {
            throw new Error("Form ID not found.");
        }

        const response = await api.delete(`/form/${formId}`);

        removeFormId();

        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error deleting form data:", error.message);
        }

        throw error;
    }
};