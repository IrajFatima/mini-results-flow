import db from "../database/db";

interface FormData {
    userId: string | null;
    isAnonymous: boolean;
    anonymousSessionId: string | null;

    gender: string;
    bodyFatPercent: number;
    BMI: number;
    calorieTarget: number;
    waterIntake: number;
    weightLossRate: number;
    seeResultsDays: number;
}

interface FormDataRow {
    id: string;
    user_id: string | null;
    is_anonymous: boolean;
    anonymous_session_id: string | null;

    gender: string;
    body_fat_percent: number;
    bmi: number;
    calorie_target: number;
    water_intake: number;
    weight_loss_rate: number;
    see_results_days: number;

    created_at: Date;
}

interface InsertedForm {
    id: string;
}
interface FormDataDisplay {
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

const createForm = async (
    formData: FormData
): Promise<InsertedForm> => {
    const query = `
        INSERT INTO form_data (
            user_id,
            is_anonymous,
            anonymous_session_id,
            gender,
            body_fat_percent,
            bmi,
            calorie_target,
            water_intake,
            weight_loss_rate,
            see_results_days
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
        )
        RETURNING id;
    `;

    const values = [
        formData.userId,
        formData.isAnonymous,
        formData.anonymousSessionId,
        formData.gender,
        formData.bodyFatPercent,
        formData.BMI,
        formData.calorieTarget,
        formData.waterIntake,
        formData.weightLossRate,
        formData.seeResultsDays,
    ];

    const result = await db.query<InsertedForm>(query, values);

    return result.rows[0];
};

const getFormById = async (
    id: string
): Promise<FormDataRow | null> => {
    const result = await db.query<FormDataRow>(
        `
        SELECT *
        FROM form_data
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0] ?? null;
};

const getFormByUser = async (
    id: string,
    userId: string
): Promise<FormDataRow | null> => {
    const result = await db.query<FormDataRow>(
        `
        SELECT *
        FROM form_data
        WHERE id = $1
          AND user_id = $2;
        `,
        [id, userId]
    );

    return result.rows[0] ?? null;
};

const getFormByAnonymousSession = async (
    id: string,
    anonymousSessionId: string
): Promise<FormDataRow | null> => {
    const result = await db.query<FormDataRow>(
        `
        SELECT *
        FROM form_data
        WHERE id = $1
          AND anonymous_session_id = $2;
        `,
        [id, anonymousSessionId]
    );

    return result.rows[0] ?? null;
};

const deleteFormById = async (
    id: string
): Promise<InsertedForm | null> => {
    const result = await db.query<InsertedForm>(
        `
        DELETE FROM form_data
        WHERE id = $1
        RETURNING id;
        `,
        [id]
    );

    return result.rows[0] ?? null;
};

const deleteFormByUser = async (
    id: string,
    userId: string
): Promise<InsertedForm | null> => {
    const result = await db.query<InsertedForm>(
        `
        DELETE FROM form_data
        WHERE id = $1
          AND user_id = $2
        RETURNING id;
        `,
        [id, userId]
    );

    return result.rows[0] ?? null;
};

const deleteFormByAnonymousSession = async (
    id: string,
    anonymousSessionId: string
): Promise<InsertedForm | null> => {
    const result = await db.query<InsertedForm>(
        `
        DELETE FROM form_data
        WHERE id = $1
          AND anonymous_session_id = $2
        RETURNING id;
        `,
        [id, anonymousSessionId]
    );

    return result.rows[0] ?? null;
};

const anonymousSubmissionExists = async (
    anonymousSessionId: string
): Promise<boolean> => {
    const result = await db.query<{ exists: boolean }>(
        `
        SELECT EXISTS (
            SELECT 1
            FROM form_data
            WHERE anonymous_session_id = $1
        ) AS exists;
        `,
        [anonymousSessionId]
    );

    return result.rows[0].exists;
};
const getAllFormDataForUser = async (
    userId: string
): Promise<FormDataDisplay[]> => {
    const result = await db.query<FormDataRow>(
        `
        SELECT *
        FROM form_data
        WHERE user_id = $1
        ORDER BY created_at DESC;
        `,
        [userId]
    );

    return result.rows.map((form) => ({
        id: form.id,
        userId: form.user_id,
        isAnonymous: form.is_anonymous,
        anonymousSessionId: form.anonymous_session_id,
        gender: form.gender as "male" | "female",
        bodyFatPercent: Number(form.body_fat_percent),
        bmi: Number(form.bmi),
        calorieTarget: Number(form.calorie_target),
        waterIntake: Number(form.water_intake),
        weightLossRate: Number(form.weight_loss_rate),
        seeResultsDays: Number(form.see_results_days),
        createdAt: form.created_at.toISOString(),
    }));
};

const getAllFormDataForAdmin = async (): Promise<FormDataDisplay[]> => {
    const result = await db.query<FormDataRow>(
        `
        SELECT *
        FROM form_data
        ORDER BY created_at DESC;
        `
    );

    return result.rows.map((form) => ({
        id: form.id,
        userId: form.user_id,
        isAnonymous: form.is_anonymous,
        anonymousSessionId: form.anonymous_session_id,
        gender: form.gender as "male" | "female",
        bodyFatPercent: Number(form.body_fat_percent),
        bmi: Number(form.bmi),
        calorieTarget: Number(form.calorie_target),
        waterIntake: Number(form.water_intake),
        weightLossRate: Number(form.weight_loss_rate),
        seeResultsDays: Number(form.see_results_days),
        createdAt: form.created_at.toISOString(),
    }));
};
export {
    createForm,
    getFormById,
    getFormByUser,
    getFormByAnonymousSession,
    deleteFormById,
    deleteFormByUser,
    deleteFormByAnonymousSession,
    anonymousSubmissionExists,
    getAllFormDataForAdmin,
    getAllFormDataForUser
};