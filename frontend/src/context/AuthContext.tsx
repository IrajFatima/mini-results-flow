import {
    createContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";

import type { AuthContextType, User } from "../types/auth";
import {
    getToken,
    getUser,
    saveAuth,
    clearAuth,
} from "../utils/token";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext =
    createContext<AuthContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const LoadAuth = () => {

            const storedToken = getToken();
            const storedUser = getUser();

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(storedUser);
            }

            setLoading(false);
        }
        LoadAuth();
    }, []);

    const login = (jwt: string, userData: User) => {
        saveAuth(jwt, userData);

        setToken(jwt);
        setUser(userData);
    };

    const logout = () => {
        clearAuth();

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}