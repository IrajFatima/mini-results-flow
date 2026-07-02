import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock service BEFORE importing SalesPage
jest.mock("../services/form", () => ({
    deleteFormData: jest.fn().mockResolvedValue({}),
}));

import SalesPage from "../features/sales/SalesPage";

const renderPage = () =>
    render(
        <MemoryRouter>
            <SalesPage />
        </MemoryRouter>
    );

describe("SalesPage", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test("renders main heading", () => {
        renderPage();

        expect(
            screen.getByText(/your personalized ketoslim plan is ready/i)
        ).toBeInTheDocument();
    });

    test("defaults to discount plan selected", () => {
        renderPage();

        expect(
            screen.getByText(/1 payment of \$67/i)
        ).toBeInTheDocument();
    });

    test("switches to installments plan", () => {
        renderPage();

        fireEvent.click(screen.getByText(/3 payments of \$29/i));

        expect(
            screen.getByText(/just \$29 today/i)
        ).toBeInTheDocument();
    });

    test("timer decreases over time", () => {
        renderPage();

        const initialTime =
            screen.getByText(/\d{2}:\d{2}/).textContent;

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const updatedTime =
            screen.getByText(/\d{2}:\d{2}/).textContent;

        expect(updatedTime).not.toBe(initialTime);
    });

    test("continue button triggers alert", () => {
        window.alert = jest.fn();

        renderPage();

        fireEvent.click(
            screen.getByRole("button", {
                name: /continue/i,
            })
        );

        expect(window.alert).toHaveBeenCalled();
    });

    test("reset link exists", () => {
        renderPage();

        expect(
            screen.getByText(/no thanks/i)
        ).toBeInTheDocument();
    });

    test("scroll CTA button exists", () => {
        renderPage();

        expect(
            screen.getByRole("button", {
                name: /scroll to plan section/i,
            })
        ).toBeInTheDocument();
    });
});