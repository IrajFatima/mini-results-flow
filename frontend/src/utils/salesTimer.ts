const SALES_TIMER_KEY = "salesPageExpiry";
const TIMER_DURATION = 10 * 60 * 1000; // 10 minutes

// Returns the existing expiry time or creates one if it doesn't exist
export const getOrCreateSaleExpiry = (): number => {
    const storedExpiry = localStorage.getItem(SALES_TIMER_KEY);

    if (storedExpiry) {
        return Number(storedExpiry);
    }

    const expiry = Date.now() + TIMER_DURATION;
    localStorage.setItem(SALES_TIMER_KEY, String(expiry));

    return expiry;
};

// Returns the remaining time in seconds
export const getRemainingTime = (): number => {
    const expiry = getOrCreateSaleExpiry();

    return Math.max(
        0,
        Math.floor((expiry - Date.now()) / 1000)
    );
};

// Removes the timer (useful if you want to restart it)
export const clearSaleTimer = (): void => {
    localStorage.removeItem(SALES_TIMER_KEY);
};

// Starts a fresh 10-minute timer
export const resetSaleTimer = (): number => {
    const expiry = Date.now() + TIMER_DURATION;
    localStorage.setItem(SALES_TIMER_KEY, String(expiry));

    return expiry;
};