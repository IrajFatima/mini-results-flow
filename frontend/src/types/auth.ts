export type UserRole = "admin" | "user";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}

export interface SignupResponse {
    success: boolean;
    message: string;
    user: User;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;

    login: (token: string, user: User) => void;
    logout: () => void;
}