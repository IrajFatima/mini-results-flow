import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ResultsPage from "../features/results/ResultsPage";
import { FormProvider } from "../context/FormContext";

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
        div: ({ children, ...props }: any) => (
            <div {...props}>{children}</div>
        ),
    },
}));

const mockFormData = {
    gender: "female",
    bodyFatPercent: 25,
    BMI: 30,
    calorieTarget: 1800,
    waterIntake: 4,
    weightLossRate: 2,
    seeResultsDays: 30,
};

const renderResults = () => {
    localStorage.setItem("MINI-RESULTS-FORM", JSON.stringify(mockFormData));

    return render(
        <MemoryRouter>
            <FormProvider>
                <ResultsPage />
            </FormProvider>
        </MemoryRouter>
    );
};

describe("Results Page", () => {
    beforeEach(() => {
        localStorage.clear();
        mockNavigate.mockClear();
    });

    test("renders first result card", () => {
        renderResults();

        expect(screen.getByText(/your results/i)).toBeInTheDocument();

        expect(
            screen.getByText(/your body fat percentage is/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /next/i })
        ).toBeInTheDocument();
    });

    test("moves to next card", async () => {
        const user = userEvent.setup();

        renderResults();

        await user.click(
            screen.getByRole("button", { name: /next/i })
        );


        const cards = screen.getAllByText(/your bmi is/i);
        expect(cards.length).toBeGreaterThan(0);


        expect(screen.getByText("30")).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /body fat/i })
        ).toBeInTheDocument();
    });

    test("moves back to previous card", async () => {
        const user = userEvent.setup();

        renderResults();

        await user.click(
            screen.getByRole("button", { name: /next/i })
        );

        await user.click(
            screen.getByRole("button", { name: /body fat/i })
        );

        expect(
            screen.getByText(/your body fat percentage is/i)
        ).toBeInTheDocument();
    });

    test("continue button navigates to sales page", async () => {
        const user = userEvent.setup();

        renderResults();

        for (let i = 0; i < 5; i++) {
            await user.click(
                screen.getByRole("button", { name: /next/i })
            );
        }

        const continueButton = screen.getByRole("button", {
            name: /continue/i,
        });

        expect(continueButton).toBeInTheDocument();

        await user.click(continueButton);

        expect(mockNavigate).toHaveBeenCalledWith("/sales");
    });

    test("displays values from form context", () => {
        renderResults();

        expect(
            screen.getByText(/your body fat percentage is/i)
        ).toHaveTextContent("25%");

        expect(
            screen.getByText(/your body fat percentage is/i)
        ).toBeInTheDocument();
    });
});