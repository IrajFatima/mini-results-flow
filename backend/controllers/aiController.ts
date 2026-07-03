import { Request, Response } from "express";
import { getAIRecommendations } from "../repositories/aiRepository";

interface AIParams {
    id: string;
}
export const generateAIRecommendations = async (
    req: Request<AIParams>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "form ID is required.",
            });

            return;
        }

        const recommendations = await getAIRecommendations(id);

        res.status(200).json({
            success: true,
            data:recommendations,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to generate recommendations.",
        });
    }
};