import { Request, Response } from "express";
import { RequestHandler } from "express";
import * as formRepository from "../repositories/formRepository";
/// <reference path="../types/express.d.ts" />
interface FormParams {
    id: string;
}

const submitForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            gender,
            bodyFatPercent,
            BMI,
            calorieTarget,
            waterIntake,
            weightLossRate,
            seeResultsDays,
        } = req.body;

        if (
            !gender ||
            bodyFatPercent == null ||
            BMI == null ||
            calorieTarget == null ||
            waterIntake == null ||
            weightLossRate == null ||
            seeResultsDays == null
        ) {
            res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
            return;
        }

        const userId = req.user?.id ?? null;

        const isAnonymous = req.user == null;

        const anonymousSessionId =
            isAnonymous
                ? req.body.anonymousSessionId
                : null;
        if (isAnonymous && !anonymousSessionId) {
            res.status(400).json({
                success: false,
                message: "Anonymous session ID is required.",
            });
            return;
        }

        if (isAnonymous) {
            const alreadySubmitted =
                await formRepository.anonymousSubmissionExists(
                    anonymousSessionId
                );

            if (alreadySubmitted) {
                res.status(403).json({
                    success: false,
                    message:
                        "Guests can only submit one form. Please create an account to submit another.",
                });

                return;
            }
        }
        const insertedForm = await formRepository.createForm({
            userId,
            isAnonymous,
            anonymousSessionId,
            gender,
            bodyFatPercent,
            BMI,
            calorieTarget,
            waterIntake,
            weightLossRate,
            seeResultsDays,
        });

        res.status(201).json({
            success: true,
            message: "Form submitted successfully.",
            id: insertedForm.id,
        });
    } catch (error) {
        console.error("Error submitting form:", error);

        res.status(500).json({
            success: false,
            message: "An error occurred while submitting the form.",
        });
    }
};
const getAllFormDataForUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user!.id;

        const forms =
            await formRepository.getAllFormDataForUser(userId);

        res.status(200).json({
            success: true,
            data: forms,
        });
    } catch (error) {
        console.error(
            "Error fetching user form submissions:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "An error occurred while fetching form submissions.",
        });
    }
};

const getAllFormDataForAdmin = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const forms =
            await formRepository.getAllFormDataForAdmin();

        res.status(200).json({
            success: true,
            data: forms,
        });
    } catch (error) {
        console.error(
            "Error fetching all form submissions:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "An error occurred while fetching form submissions.",
        });
    }
};

const getFormData: RequestHandler<FormParams> = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "ID parameter is required.",
            });
            return;
        }

        let form = null;

        if (!req.user) {
            const anonymousSessionId = req.body.anonymousSessionId;

            if (!anonymousSessionId) {
                res.status(401).json({
                    success: false,
                    message: "Anonymous session ID is required.",
                });
                return;
            }

            form = await formRepository.getFormByAnonymousSession(
                id,
                anonymousSessionId
            );
        } else if (req.user.role === "admin") {
            form = await formRepository.getFormById(id);
        } else {
            form = await formRepository.getFormByUser(
                id,
                req.user.id
            );
        }

        if (!form) {
            res.status(404).json({
                success: false,
                message: "Form Data not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: form,
        });
    } catch (error) {
        console.error("Error fetching Form Data:", error);

        res.status(500).json({
            success: false,
            message:
                "An error occurred while fetching the Form Data.",
        });
    }
};

const deleteFormData: RequestHandler<FormParams> = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "ID parameter is required.",
            });
            return;
        }

        let deletedForm = null;

        if (!req.user) {
            const anonymousSessionId = req.body.anonymousSessionId;

            if (!anonymousSessionId) {
                res.status(401).json({
                    success: false,
                    message: "Anonymous session ID is required.",
                });
                return;
            }

            deletedForm =
                await formRepository.deleteFormByAnonymousSession(
                    id,
                    anonymousSessionId
                );
        } else if (req.user.role === "admin") {
            deletedForm =
                await formRepository.deleteFormById(id);
        } else {
            deletedForm =
                await formRepository.deleteFormByUser(
                    id,
                    req.user.id
                );
        }

        if (!deletedForm) {
            res.status(404).json({
                success: false,
                message: "Form Data not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Form Data deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting Form Data:", error);

        res.status(500).json({
            success: false,
            message:
                "An error occurred while deleting the Form Data.",
        });
    }
};

export {
    submitForm,
    getFormData,
    deleteFormData,
    getAllFormDataForAdmin,
    getAllFormDataForUser
};