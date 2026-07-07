import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const optionalAuthenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    /**
     * Anonymous users are allowed to access this endpoint.
     * If no Authorization header is present, continue without
     * attaching a user to the request.
     */
    if (!authHeader) {
        next();
        return;
    }

    /**
     * If an Authorization header is provided,
     * it must follow the Bearer token format.
     */
    if (!authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Invalid authorization header.",
        });
        return;
    }

    try {
        const token = authHeader.split(" ")[1];

        /**
         * Token is valid.
         * Attach the authenticated user to the request so the
         * controller can distinguish authenticated and anonymous users.
         */
        req.user = verifyToken(token);

        next();
    } catch {
        /**
         * A token was supplied but is invalid or expired.
         * Reject the request instead of silently treating
         * the user as anonymous.
         */
        res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};