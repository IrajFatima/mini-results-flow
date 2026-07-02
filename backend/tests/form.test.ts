import request from "supertest";

import app from "../app";
import * as formRepository from "../repositories/formRepository";

jest.mock("../repositories/formRepository");

const mockedFormRepository = jest.mocked(formRepository);

describe("POST /api/form", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a form successfully", async () => {
        mockedFormRepository.createForm.mockResolvedValue({
            id: 1,
        });

        const response = await request(app)
            .post("/api/form")
            .send({
                gender: "male",
                bodyFatPercent: 20,
                BMI: 25,
                calorieTarget: 2200,
                waterIntake: 3,
                weightLossRate: 1,
                seeResultsDays: 30,
            });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            success: true,
            message: "Form submitted successfully.",
            id: 1,
        });
    });

    it("should return 400 when fields are missing", async () => {
        const response = await request(app).post("/api/form").send({});

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("should return 500 when repository throws", async () => {
        mockedFormRepository.createForm.mockRejectedValue(
            new Error("Database Error")
        );

        const response = await request(app)
            .post("/api/form")
            .send({
                gender: "male",
                bodyFatPercent: 20,
                BMI: 25,
                calorieTarget: 2200,
                waterIntake: 3,
                weightLossRate: 1,
                seeResultsDays: 30,
            });

        expect(response.status).toBe(500);
    });
});

describe("GET /api/form/:id", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return form data", async () => {
        mockedFormRepository.getFormById.mockResolvedValue({
            id: 1,
            gender: "male",
        });

        const response = await request(app).get("/api/form/1");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(1);
    });

    it("should return 500 when repository throws", async () => {
        mockedFormRepository.getFormById.mockRejectedValue(
            new Error("Database Error")
        );

        const response = await request(app).get("/api/form/1");

        expect(response.status).toBe(500);
    });
});

describe("DELETE /api/form/:id", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should delete form", async () => {
        mockedFormRepository.deleteFormById.mockResolvedValue({
            id: 1,
        });

        const response = await request(app).delete("/api/form/1");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it("should return 404 when form is not found", async () => {
        mockedFormRepository.deleteFormById.mockResolvedValue(null);

        const response = await request(app).delete("/api/form/999");

        expect(response.status).toBe(404);
    });

    it("should return 500 when delete throws", async () => {
        mockedFormRepository.deleteFormById.mockRejectedValue(
            new Error("Database Error")
        );

        const response = await request(app).delete("/api/form/1");

        expect(response.status).toBe(500);
    });
});