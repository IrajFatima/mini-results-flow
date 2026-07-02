import api from "./api";
import { getFormId } from "../utils/localStorage";

export const getResultData = async () => {
    try {
        const formId = getFormId();

        if (!formId) {
            throw new Error("Form ID not found.");
        }

        const response = await api.get(`/result/${formId}`);


        return response.data.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching result data:", error.message);
        }

        throw error;
    }
};