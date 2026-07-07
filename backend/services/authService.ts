import pool from "../database/db";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

interface SignupData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const signupUser = async ({
    name,
    email,
    password,
}: SignupData) => {
    // Check if user already exists
    const existingUser = await pool.query(
        `SELECT id FROM users WHERE email = $1`,
        [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error("Email already exists.");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await pool.query(
        `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, role, created_at
        `,
        [name, email, hashedPassword]
    );

    return result.rows[0];
};

export const loginUser = async ({
    email,
    password,
}: LoginData) => {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    if (result.rows.length === 0) {
        throw new Error("Invalid email or password.");
    }

    const user = result.rows[0];

    const passwordMatches = await comparePassword(
        password,
        user.password_hash
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password.");
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};