import {
    getBodyFatCallout,
    getBMICallout,
    getCaloriesCallout,
    getWaterCallout,
    getWeightLossCallout,
    getResultDaysCallout,
} from "./calculations";

describe("calculations.ts", () => {
    describe("getBodyFatCallout", () => {
        test("returns low body fat message for male", () => {
            expect(getBodyFatCallout("male", 25)).toContain(
                "slowing metabolism"
            );
        });

        test("returns high body fat message for male", () => {
            expect(getBodyFatCallout("male", 35)).toContain(
                "constant state of inflammation"
            );
        });

        test("returns low body fat message for female", () => {
            expect(getBodyFatCallout("female", 35)).toContain(
                "slowing metabolism"
            );
        });

        test("returns high body fat message for female", () => {
            expect(getBodyFatCallout("female", 45)).toContain(
                "constant state of inflammation"
            );
        });
    });

    describe("getBMICallout", () => {
        test("BMI below 30", () => {
            expect(getBMICallout(28)).toContain(
                "right on the edge"
            );
        });

        test("BMI between 30 and 35", () => {
            expect(getBMICallout(32)).toContain(
                "under more strain"
            );
        });

        test("BMI 35 or above", () => {
            expect(getBMICallout(40)).toContain(
                "insulin resistance"
            );
        });
    });

    describe("getCaloriesCallout", () => {
        test("calories below 1100", () => {
            expect(getCaloriesCallout(1000)).toContain(
                "Extreme restriction"
            );
        });

        test("calories between 1100 and 1300", () => {
            expect(getCaloriesCallout(1200)).toContain(
                "primed to burn fat"
            );
        });

        test("calories between 1300 and 1500", () => {
            expect(getCaloriesCallout(1400)).toContain(
                "already close"
            );
        });

        test("calories 1500 or more", () => {
            expect(getCaloriesCallout(1700)).toBe("");
        });
    });

    describe("getWaterCallout", () => {
        test("1 glass", () => {
            expect(getWaterCallout(1)).toContain(
                "Coffee or Tea"
            );
        });

        test("2 glasses", () => {
            expect(getWaterCallout(2)).toContain(
                "great start"
            );
        });

        test("4 glasses", () => {
            expect(getWaterCallout(4)).toContain(
                "getting closer"
            );
        });

        test("6 or more glasses", () => {
            expect(getWaterCallout(6)).toContain(
                "hydration game is strong"
            );
        });
    });

    describe("getWeightLossCallout", () => {
        test("returns the expected message", () => {
            expect(getWeightLossCallout()).toContain(
                "burning fat"
            );
        });
    });

    describe("getResultDaysCallout", () => {
        test("returns the expected message", () => {
            expect(getResultDaysCallout()).toContain(
                "day 10"
            );
        });
    });
});