const FORM_ID_KEY = "formId";

export const saveFormId = (id: string) => {
    localStorage.setItem(FORM_ID_KEY, id);
};

export const getFormId = (): string | null => {
    return localStorage.getItem(FORM_ID_KEY);
};

export const removeFormId = () => {
    localStorage.removeItem(FORM_ID_KEY);
};