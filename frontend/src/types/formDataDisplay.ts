export interface FormDataDisplay {
    id: string;

    userId: string | null;

    isAnonymous: boolean;

    anonymousSessionId: string | null;

    gender: "male" | "female";

    bodyFatPercent: number;

    bmi: number;

    calorieTarget: number;

    waterIntake: number;

    weightLossRate: number;

    seeResultsDays: number;

    createdAt: string;
}