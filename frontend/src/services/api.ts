import axios from "axios";

import { getToken } from "../utils/token";
import { getAnonymousSessionId } from "../utils/anonymousSession";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        /*
         * Anonymous users do not have a JWT.
         * Attach their session identifier so the backend can
         * identify and authorize requests for their own data.
         */
        config.headers["X-Anonymous-Session"] =
            getAnonymousSessionId();
    }

    return config;
});

export default api;