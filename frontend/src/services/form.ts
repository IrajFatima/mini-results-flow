import api from "./api";
import type { FormData } from "../types/form";
import {
    getFormId,
    saveFormId,
} from "../utils/localStorage";
import { getToken } from "../utils/token";
import { getAnonymousSessionId } from "../utils/anonymousSession";
import type { FormDataDisplay } from "../types/formDataDisplay";

export const submitForm = async (formData: FormData) => {
    try {
        const payload = {
            ...formData,

            /*
             * Anonymous users are not authenticated with a JWT.
             * Store their session identifier with the form so
             * future requests can be matched to the same browser.
             */
            ...(getToken()
                ? {}
                : {
                    anonymousSessionId:
                        getAnonymousSessionId(),
                }),
        };

        const response = await api.post("/form", payload);

        saveFormId(response.data.id);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                "Error submitting form:",
                error.message
            );
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
            console.error(
                "Error fetching form data:",
                error.message
            );
        }

        throw error;
    }
};

export const deleteFormData = async (formId: string) => {
    try {

        if (!formId) {
            throw new Error("Form ID not found.");
        }

        const response = await api.delete(`/form/${formId}`);


        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                "Error deleting form data:",
                error.message
            );
        }

        throw error;
    }
};

export const getAllFormData = async (
    role: "admin" | "user" | null
): Promise<FormDataDisplay[]> => {
    try {
        const endpoint =
            role === "admin"
                ? "/form/all/admin"
                : "/form/all/user";

        const response = await api.get(endpoint);

        return response.data.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                "Error fetching form submissions:",
                error.message
            );
        }

        throw error;
    }
};