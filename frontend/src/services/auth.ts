import api from "./api";
import type {
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
} from "../types/auth";

export const signup = async (
    data: SignupRequest
): Promise<SignupResponse> => {
    const response = await api.post<SignupResponse>(
        "/auth/signup",
        data
    );

    return response.data;
};

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        data
    );

    return response.data;
};