import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import FormPage from "../features/form/FormPage";
import { submitForm, getFormData } from "../services/form";
import * as storage from "../utils/localStorage";

// mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

jest.mock("../services/form", () => ({
    submitForm: jest.fn(),
    getFormData: jest.fn(),
}));

// mock react-toastify
jest.mock("react-toastify", () => ({
    toast: {
        error: jest.fn(),
    },
}));

const mockedSubmitForm = submitForm as jest.Mock;
const mockedGetFormData = getFormData as jest.Mock;

const renderForm = () =>
    render(
        <MemoryRouter>
            <FormPage />
        </MemoryRouter>
    );

describe("Form Page", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();

        mockedSubmitForm.mockResolvedValue({ id: "123" });

        mockedGetFormData.mockResolvedValue({
            gender: "male",
            bodyFatPercent: 20,
            BMI: 25,
            calorieTarget: 2000,
            waterIntake: 4,
            weightLossRate: 2,
            seeResultsDays: 30,
        });
    });

    test("renders all fields", async () => {
        renderForm();

        await waitFor(() => { });

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

    test("submit button starts disabled", async () => {
        renderForm();

        await waitFor(() => { });

        expect(
            screen.getByRole("button", {
                name: /see my results/i,
            })
        ).toBeDisabled();
    });

    test("user can complete the form and submit", async () => {
        const user = userEvent.setup();

        renderForm();

        await waitFor(() => { });

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

        await waitFor(() => {
            expect(mockedSubmitForm).toHaveBeenCalledWith({
                gender: "female",
                bodyFatPercent: 20,
                BMI: 25,
                calorieTarget: 1800,
                waterIntake: 4,
                weightLossRate: 2,
                seeResultsDays: 30,
            });

            expect(mockNavigate).toHaveBeenCalledWith("/results");
        });
    });

    test("loads existing form data when form id exists", async () => {
        jest.spyOn(storage, "getFormId").mockReturnValue("123");

        mockedGetFormData.mockResolvedValue({
            gender: "female",
            bodyFatPercent: 18,
            BMI: 22,
            calorieTarget: 1900,
            waterIntake: 6,
            weightLossRate: 1,
            seeResultsDays: 45,
        });

        renderForm();

        await waitFor(() => { });

        await waitFor(() => {
            expect(mockedGetFormData).toHaveBeenCalled();
        });

        expect(screen.getByDisplayValue("female")).toBeChecked();
        expect(screen.getByDisplayValue("1900")).toBeInTheDocument();

        (storage.getFormId as jest.Mock).mockRestore();
    });

    test("does not fetch data when no form id exists", async () => {
        renderForm();

        await waitFor(() => { });

        expect(mockedGetFormData).not.toHaveBeenCalled();
    });

    test("does not navigate when submit fails", async () => {
        const user = userEvent.setup();

        mockedSubmitForm.mockRejectedValue(new Error("Server Error"));

        renderForm();

        await waitFor(() => { });

        const sliders = screen.getAllByRole("slider");

        fireEvent.change(sliders[0], {
            target: { value: "20" },
        });

        fireEvent.change(sliders[1], {
            target: { value: "25" },
        });

        await user.click(screen.getByDisplayValue("female"));

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

        await user.click(button);

        await waitFor(() => {
            expect(mockedSubmitForm).toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });
});