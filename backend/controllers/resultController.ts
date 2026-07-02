import { Request, Response } from "express";

import * as resultRepository from "../repositories/resultRepository";
interface ResultParams {
    id: string;
}
const getResult = async (req: Request<ResultParams>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const cards = await resultRepository.getResult(id);

        if (!cards) {
            res.status(404).json({
                success: false,
                message: "Result not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: cards,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export {
    getResult,
};