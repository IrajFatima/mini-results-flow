import { Request, Response } from "express";

import * as resultRepository from "../repositories/resultRepository";

interface ResultParams {
    id: string;
}

const getResult = async (
    req: Request<ResultParams>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        let cards = null;

        if (req.user?.role === "admin") {
            cards = await resultRepository.getResultById(id);
        } else if (req.user) {
            cards = await resultRepository.getResultByUser(
                id,
                req.user.id
            );
        } else {
            const anonymousSessionId = req.header("X-Anonymous-Session");

            if (!anonymousSessionId) {
                res.status(400).json({
                    success: false,
                    message: "Anonymous session ID is required.",
                });
                return;
            }

            cards = await resultRepository.getResultByAnonymousSession(
                id,
                anonymousSessionId
            );
        }

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