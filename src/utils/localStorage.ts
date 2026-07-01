import type { FormData } from "../types/form";

const STORAGE_KEY = 'MINI-RESULTS-FORM';

export const getFromLocalStorage = (): FormData | null => {
    try{

        const data = localStorage.getItem(STORAGE_KEY);
        return data ? (JSON.parse(data) as FormData ): null;
    } catch(error){
        console.error('Error getting data from localStorage:', error);
        return null;
    }
}

export const saveToLocalStorage = (data:FormData): void => {
    try {
        localStorage.setItem(STORAGE_KEY,JSON.stringify(data))
    } catch(error){
        console.error('Error saving data to localStorage:', error);
    }
}

export const clearLocalStorage = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch(error){
        console.error('Error clearing data from localStorage:', error);
    }   
}