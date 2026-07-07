import { Request, Response, NextFunction } from "express";

type Role = "admin" | "user";

export const authorize =
    (...roles: Role[]) =>
    (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource.",
            });
            return;
        }

        next();
    };