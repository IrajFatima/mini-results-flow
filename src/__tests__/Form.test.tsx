import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import FormPage from "../features/form/FormPage";
import { FormProvider } from "../context/FormContext";
import { fireEvent } from "@testing-library/react";



// mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

const renderForm = () =>
    render(
        <MemoryRouter>
            <FormProvider>
                <FormPage />
            </FormProvider>
        </MemoryRouter>
    );

describe("Form Page", () => {
    beforeEach(() => {
        localStorage.clear();
        mockNavigate.mockClear();
    });

    test("renders all fields", () => {
        renderForm();

        expect(screen.getByDisplayValue("male")).toBeInTheDocument();
        expect(screen.getByDisplayValue("female")).toBeInTheDocument();

        expect(screen.getByLabelText(/body fat/i)).toBeInTheDocument();

        expect(screen.getByLabelText(/^BMI/i)).toBeInTheDocument();

        expect(
            screen.getByLabelText(/daily calorie target/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/cups of water per day/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/weekly weight loss goal/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/days to see results/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /see my results/i,
            })
        ).toBeInTheDocument();
    });

    test("submit button starts disabled", () => {
        renderForm();

        expect(
            screen.getByRole("button", {
                name: /see my results/i,
            })
        ).toBeDisabled();
    });

    test("user can complete the form and submit", async () => {
        const user = userEvent.setup();

        renderForm();
        const sliders = screen.getAllByRole("slider");

        fireEvent.change(sliders[0], {
            target: { value: "20" },
        });

        fireEvent.change(sliders[1], {
            target: { value: "25" },
        });

        await user.click(screen.getByDisplayValue("female"));



        expect((sliders[0] as HTMLInputElement).value).toBe("20");
        expect((sliders[1] as HTMLInputElement).value).toBe("25");

        await user.type(
            screen.getByLabelText(/daily calorie target/i),
            "1800"
        );

        await user.selectOptions(
            screen.getByLabelText(/cups of water per day/i),
            "4"
        );

        await user.type(
            screen.getByLabelText(/weekly weight loss goal/i),
            "2"
        );

        await user.type(
            screen.getByLabelText(/days to see results/i),
            "30"
        );

        const button = screen.getByRole("button", {
            name: /see my results/i,
        });

        expect(button).toBeEnabled();

        await user.click(button);

        expect(mockNavigate).toHaveBeenCalledWith("/results");
    });
});