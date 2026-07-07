const ANONYMOUS_SESSION_KEY = "anonymousSessionId";

export const getAnonymousSessionId = (): string => {
    let sessionId = localStorage.getItem(ANONYMOUS_SESSION_KEY);

    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem(ANONYMOUS_SESSION_KEY, sessionId);
    }

    return sessionId;
};

export const removeAnonymousSessionId = () => {
    localStorage.removeItem(ANONYMOUS_SESSION_KEY);
};