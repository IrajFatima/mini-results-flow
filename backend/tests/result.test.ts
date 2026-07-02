import request from "supertest";

import app from "../app";
import * as resultRepository from "../repositories/resultRepository";

jest.mock("../repositories/resultRepository");

const mockedResultRepository = jest.mocked(resultRepository);

describe("GET /api/result/:id", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return result cards successfully", async () => {
        mockedResultRepository.getResult.mockResolvedValue([
            {
                id: 1,
                title: "Body Fat %",
                headerText: "Your Body Fat Percentage Is 20%",
            },
            {
                id: 2,
                title: "BMI",
                headerText: "Your BMI Is 24",
            },
        ]);

        const response = await request(app).get("/api/result/1");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            success: true,
            data: [
                {
                    id: 1,
                    title: "Body Fat %",
                    headerText: "Your Body Fat Percentage Is 20%",
                },
                {
                    id: 2,
                    title: "BMI",
                    headerText: "Your BMI Is 24",
                },
            ],
        });

        expect(mockedResultRepository.getResult).toHaveBeenCalledWith("1");
    });

    it("should return 404 when result is not found", async () => {
        mockedResultRepository.getResult.mockResolvedValue(null);

        const response = await request(app).get("/api/result/999");

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            success: false,
            message: "Result not found.",
        });

        expect(mockedResultRepository.getResult).toHaveBeenCalledWith("999");
    });

    it("should return 500 when repository throws an error", async () => {
        mockedResultRepository.getResult.mockRejectedValue(
            new Error("Database Error")
        );

        const response = await request(app).get("/api/result/1");

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
            success: false,
            message: "Internal server error.",
        });

        expect(mockedResultRepository.getResult).toHaveBeenCalledWith("1");
    });
});