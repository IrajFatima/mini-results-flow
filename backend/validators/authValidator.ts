import { body } from "express-validator";

export const signupValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("Name must be between 3 and 100 characters."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
        .bail()
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .bail()
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter.")
        .bail()
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number."),

];

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required."),
];