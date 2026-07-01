import { render, screen, fireEvent } from "@testing-library/react";
import {
    FormProvider,
    useForm,
} from "./FormContext";
import { defaultFormData } from "../utils/defaultFormData";

const TestComponent = () => {
    const { formData, setFormData, resetForm } = useForm();

    return (
        <>
            <p data-testid="gender">{formData.gender}</p>
            <p data-testid="calories">{formData.calorieTarget}</p>

            <button
                onClick={() =>
                    setFormData({
                        ...formData,
                        gender: "female",
                        calorieTarget: 1800,
                    })
                }
            >
                Update
            </button>

            <button onClick={resetForm}>
                Reset
            </button>
        </>
    );
};

describe("FormContext", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("renders children inside provider", () => {
        render(
            <FormProvider>
                <div>Child Component</div>
            </FormProvider>
        );

        expect(screen.getByText("Child Component")).toBeInTheDocument();
    });

    test("uses default form data when localStorage is empty", () => {
        render(
            <FormProvider>
                <TestComponent />
            </FormProvider>
        );

        expect(screen.getByTestId("gender")).toHaveTextContent(
            defaultFormData.gender
        );

        expect(screen.getByTestId("calories")).toHaveTextContent(
            defaultFormData.calorieTarget == null
                ? ""
                : String(defaultFormData.calorieTarget)
        );
    });

    test("updates form data", () => {
        render(
            <FormProvider>
                <TestComponent />
            </FormProvider>
        );

        fireEvent.click(screen.getByText("Update"));

        expect(screen.getByTestId("gender")).toHaveTextContent("female");
        expect(screen.getByTestId("calories")).toHaveTextContent("1800");
    });

    test("resetForm restores default values", () => {
        render(
            <FormProvider>
                <TestComponent />
            </FormProvider>
        );

        fireEvent.click(screen.getByText("Update"));

        fireEvent.click(screen.getByText("Reset"));

        expect(screen.getByTestId("gender")).toHaveTextContent(
            defaultFormData.gender
        );

        expect(screen.getByTestId("calories")).toHaveTextContent(
            defaultFormData.calorieTarget == null
                ? ""
                : String(defaultFormData.calorieTarget)
        );
    });

    test("useForm throws when used outside FormProvider", () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => { });

        expect(() => render(<TestComponent />)).toThrow(
            "useForm must be used inside FormProvider"
        );

        spy.mockRestore();
    });
});