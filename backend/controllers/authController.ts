import { Request, Response } from "express";
import { signupUser, loginUser } from "../services/authService";

export const signup = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const user = await signupUser({
            name,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            user,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        res.status(400).json({
            success: false,
            message,
        });
    }
};

export const login = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;

        const data = await loginUser({
            email,
            password,
        });

        res.status(200).json({
            success: true,
            message: "Login successful.",
            ...data,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        res.status(401).json({
            success: false,
            message,
        });
    }
};