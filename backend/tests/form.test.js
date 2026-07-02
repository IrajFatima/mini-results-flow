const request = require("supertest");
const app = require("../app");

const formRepository = require("../repositories/formRepository");

jest.mock("../repositories/formRepository");

describe("POST /api/form", () => {

    it("should create a form successfully", async () => {

        formRepository.createForm.mockResolvedValue({
            id: 1
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
                seeResultsDays: 30
            });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            success: true,
            message: "Form submitted successfully.",
            id: 1
        });

    });

    it("should return 400 when fields are missing", async () => {

        const response = await request(app)
            .post("/api/form")
            .send({});

        expect(response.status).toBe(400);

        expect(response.body.success).toBe(false);

    });
    it("should return 500 when repository throws", async () => {

        formRepository.createForm.mockRejectedValue(
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
                seeResultsDays: 30
            });

        expect(response.status).toBe(500);

    });
    describe("GET /api/form/:id", () => {

        it("should return form data", async () => {

            formRepository.getFormById.mockResolvedValue({
                id: 1,
                gender: "male"
            });

            const response = await request(app)
                .get("/api/form/1");

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data.id).toBe(1);

        });

    });
    describe("GET /api/form/:id", () => {

        it("should return form data", async () => {

            formRepository.getFormById.mockResolvedValue({
                id: 1,
                gender: "male"
            });

            const response = await request(app)
                .get("/api/form/1");

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data.id).toBe(1);

        });

    });
    it("should return 500 when repository throws", async () => {

        formRepository.getFormById.mockRejectedValue(
            new Error("Database Error")
        );

        const response = await request(app)
            .get("/api/form/1");

        expect(response.status).toBe(500);

    });
    describe("DELETE /api/form/:id", () => {

        it("should delete form", async () => {

            formRepository.deleteFormById.mockResolvedValue({
                id: 1
            });

            const response = await request(app)
                .delete("/api/form/1");

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);

        });

    });
    it("should return 404 when form is not found", async () => {

        formRepository.deleteFormById.mockResolvedValue(null);

        const response = await request(app)
            .delete("/api/form/999");

        expect(response.status).toBe(404);

    });
    it("should return 500 when delete throws", async () => {

        formRepository.deleteFormById.mockRejectedValue(
            new Error("Database Error")
        );

        const response = await request(app)
            .delete("/api/form/1");

        expect(response.status).toBe(500);

    });

});