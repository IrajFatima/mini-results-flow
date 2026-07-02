import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ResultsPage from "../features/results/ResultsPage";
import { getResultData } from "../services/result";
import * as storage from "../utils/localStorage";

// mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

// mock framer motion
jest.mock("framer-motion", () => ({
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
        div: ({ children, ...props }: any) => (
            <div {...props}>{children}</div>
        ),
    },
}));

// mock service
jest.mock("../services/result", () => ({
    getResultData: jest.fn(),
}));

// mock local storage
jest.mock("../utils/localStorage", () => ({
    getFormId: jest.fn(),
}));

// mock toast
jest.mock("react-toastify", () => ({
    toast: {
        error: jest.fn(),
    },
}));

const mockedGetResultData = getResultData as jest.Mock;

const mockCards = [
    {
        id: 1,
        title: "Body Fat",
        headerEmoji: "💪",
        headerText: "Your body fat percentage is 25%",
        highlightText: "25%",
        subHeaderText: "Healthy Progress",
        image: "/body-fat.png",
        paragraph1: "Paragraph 1",
        paragraph2: "Paragraph 2",
        callout: "Callout",
        alt: "Body Fat",
    },
    {
        id: 2,
        title: "BMI",
        headerEmoji: "📊",
        headerText: "Your BMI is 30",
        highlightText: "30",
        subHeaderText: "BMI",
        image: "/bmi.png",
        paragraph1: "Paragraph 1",
        paragraph2: "Paragraph 2",
        callout: "Callout",
        alt: "BMI",
    },
    {
        id: 3,
        title: "Calories",
        headerEmoji: "🔥",
        headerText: "Your calorie target is 1800",
        highlightText: "1800",
        subHeaderText: "Calories",
        image: "/calories.png",
        paragraph1: "Paragraph 1",
        paragraph2: "Paragraph 2",
        callout: "Callout",
        alt: "Calories",
    },
    {
        id: 4,
        title: "Water",
        headerEmoji: "💧",
        headerText: "Drink 4 cups of water",
        highlightText: "4",
        subHeaderText: "Water Intake",
        image: "/water.png",
        paragraph1: "Paragraph 1",
        paragraph2: "Paragraph 2",
        callout: "Callout",
        alt: "Water",
    },
    {
        id: 5,
        title: "Weight Loss",
        headerEmoji: "⚖️",
        headerText: "Lose 2 lbs weekly",
        highlightText: "2 lbs",
        subHeaderText: "Weight Loss",
        image: "/weight.png",
        paragraph1: "Paragraph 1",
        paragraph2: "Paragraph 2",
        callout: "Callout",
        alt: "Weight Loss",
    },
    {
        id: 6,
        title: "Results",
        headerEmoji: "🎯",
        headerText: "You'll see results in 30 days",
        highlightText: "30 days",
        subHeaderText: "Results",
        image: "/results.png",
        paragraph1: "Paragraph 1",
        paragraph2: "Paragraph 2",
        callout: "Callout",
        alt: "Results",
    },
];

const renderResults = () =>
    render(
        <MemoryRouter>
            <ResultsPage />
        </MemoryRouter>
    );

describe("Results Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (storage.getFormId as jest.Mock).mockReturnValue("123");

        mockedGetResultData.mockResolvedValue(mockCards);
    });

    test("renders first result card", async () => {
        renderResults();

        await screen.findByText(/your body fat percentage is/i);

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

        await screen.findByText(/your body fat percentage is/i);

        await user.click(
            screen.getByRole("button", { name: /next/i })
        );

        expect(
            screen.getByText(/your bmi is/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/your bmi is/i)
        ).toHaveTextContent("30");

        expect(
            screen.getByRole("button", { name: /body fat/i })
        ).toBeInTheDocument();
    });

    test("moves back to previous card", async () => {
        const user = userEvent.setup();

        renderResults();

        await screen.findByText(/your body fat percentage is/i);

        await user.click(
            screen.getByRole("button", { name: /next/i })
        );

        await screen.findByText(/your bmi is/i);

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

        await screen.findByText(/your body fat percentage is/i);

        for (let i = 0; i < 6; i++) {
            await user.click(
                screen.getByRole("button", { name: /next|continue/i })
            );
        }

        expect(mockNavigate).toHaveBeenCalledWith("/sales");
    });

    test("shows fetched result data", async () => {
        renderResults();

        const heading = await screen.findByText(
            /your body fat percentage is/i
        );

        expect(heading).toHaveTextContent("25%");
    });
});