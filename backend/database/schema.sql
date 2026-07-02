CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE form_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    gender VARCHAR(10) NOT NULL
        CHECK (gender IN ('male', 'female')),

    body_fat_percent NUMERIC NOT NULL,
    bmi NUMERIC NOT NULL,
    calorie_target NUMERIC NOT NULL,
    water_intake NUMERIC NOT NULL,
    weight_loss_rate NUMERIC NOT NULL,
    see_results_days NUMERIC NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
