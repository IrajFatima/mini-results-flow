import { Router } from "express";

import { signup, login } from "../controllers/authController";

import {
    signupValidator,
    loginValidator,
} from "../validators/authValidator";

import { validateRequest } from "../middleware/validateRequest";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

// Public Routes

router.post(
    "/signup",
    signupValidator,
    validateRequest,
    signup
);

router.post(
    "/login",
    loginValidator,
    validateRequest,
    login
);

// Protected Test Route

router.get(
    "/me",
    authenticate,
    authorize("admin", "user"),
    (req, res) => {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    }
);

export default router;