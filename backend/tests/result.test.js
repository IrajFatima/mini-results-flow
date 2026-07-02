const request = require("supertest");
const app = require("../app");

const resultRepository = require("../repositories/resultRepository");

jest.mock("../repositories/resultRepository");

describe("GET /api/result/:id", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return result cards successfully", async () => {

        resultRepository.getResult.mockResolvedValue([
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

        const response = await request(app)
            .get("/api/result/1");

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

        expect(resultRepository.getResult).toHaveBeenCalledWith("1");
    });

    it("should return 404 when result is not found", async () => {

        resultRepository.getResult.mockResolvedValue(null);

        const response = await request(app)
            .get("/api/result/999");

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            success: false,
            message: "Result not found.",
        });

        expect(resultRepository.getResult).toHaveBeenCalledWith("999");
    });

    it("should return 500 when repository throws an error", async () => {

        resultRepository.getResult.mockRejectedValue(
            new Error("Database Error")
        );

        const response = await request(app)
            .get("/api/result/1");

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
            success: false,
            message: "Internal server error.",
        });

        expect(resultRepository.getResult).toHaveBeenCalledWith("1");
    });

});