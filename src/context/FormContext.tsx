import {createContext, useContext, useState,useEffect, type ReactNode } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  clearLocalStorage
} from "../utils/localStorage";
import type { FormData } from "../types/form";
import { defaultFormData } from "../utils/defaultFormData";

interface FormContextType {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    resetForm : () => void;
};

const FormContext = createContext< FormContextType | undefined>(undefined);

interface FormProviderProps{
    children: ReactNode;
}

export function FormProvider({children}:FormProviderProps){
    const [formData,setFormData] = useState<FormData>(getFromLocalStorage() ||  defaultFormData);

    const resetForm = () => {
        setFormData(defaultFormData);
        clearLocalStorage();
    };
    useEffect(()=>{
        saveToLocalStorage(formData);
    },[formData]);

    return (
        <FormContext.Provider value={{formData,setFormData,resetForm}}>
            {children}
        </FormContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useForm(){
    const context = useContext(FormContext);
    if(!context) throw new Error("useForm must be used inside FormProvider");

    return context;
}