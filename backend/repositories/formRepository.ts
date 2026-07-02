import db from "../database/db";

interface FormData {
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
    gender: string;
    body_fat_percent: number;
    bmi: number;
    calorie_target: number;
    water_intake: number;
    weight_loss_rate: number;
    see_results_days: number;
}

interface InsertedForm {
    id: string;
}

const createForm = async (
    formData: FormData
): Promise<InsertedForm> => {
    const query = `
        INSERT INTO form_data (
            gender,
            body_fat_percent,
            bmi,
            calorie_target,
            water_intake,
            weight_loss_rate,
            see_results_days
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
    `;

    const values = [
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
    const query = `
        SELECT *
        FROM form_data
        WHERE id = $1
    `;

    const result = await db.query<FormDataRow>(query, [id]);

    return result.rows[0] || null;
};

const deleteFormById = async (
    id: string
): Promise<InsertedForm | null> => {
    const query = `
        DELETE FROM form_data
        WHERE id = $1
        RETURNING id;
    `;

    const result = await db.query<InsertedForm>(query, [id]);

    return result.rows[0] || null;
};

export {
    createForm,
    getFormById,
    deleteFormById,
};