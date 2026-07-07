CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE form_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NULL
        REFERENCES users(id)
        ON DELETE SET NULL,

    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,

    anonymous_session_id UUID NULL,

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

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (role IN ('admin', 'user'))
        DEFAULT 'user',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);