import db from "../database/db";

import {
    getBodyFatCallout,
    getBMICallout,
    getCaloriesCallout,
    getWaterCallout,
    getWeightLossCallout,
    getResultDaysCallout,
} from "../utils/resultHelpers";

interface FormRow {
    id: string;
    gender: string;
    body_fat_percent: number;
    bmi: number;
    calorie_target: number;
    water_intake: number;
    weight_loss_rate: number;
    see_results_days: number;
}

interface ResultCard {
    id: number;
    title: string;
    headerEmoji: string;
    headerText: string;
    highlightText: string;
    subHeaderText: string;
    image: string;
    paragraph1: string;
    paragraph2: string;
    callout: string;
    alt: string;
}

const getResult = async (
    id: string
): Promise<ResultCard[] | null> => {
    const query = `
        SELECT *
        FROM form_data
        WHERE id = $1
    `;

    const result = await db.query<FormRow>(query, [id]);

    if (result.rows.length === 0) {
        return null;
    }

    const formData = result.rows[0];

    return [
        {
            id: 1,
            title: "Body Fat %",
            headerEmoji: "⚖️",
            headerText: `Your Body Fat Percentage Is ${formData.body_fat_percent}%`,
            highlightText: `${formData.body_fat_percent}%`,
            subHeaderText: "Here’s Why That Matters",
            image: "/bodyFat.png",
            paragraph1:
                "Your body fat percentage gives a clearer picture than BMI alone. It tells us how much of your body is lean mass (muscle, organs, bone) vs stored fat.",
            paragraph2:
                "Too much stored fat doesn’t just affect how you look — it impacts your energy, hormone balance, and ability to burn fat efficiently.",
            callout: getBodyFatCallout(
                formData.gender,
                formData.body_fat_percent
            ),
            alt: "Body Fat Percentage",
        },
        {
            id: 2,
            title: "BMI",
            headerEmoji: "📊",
            headerText: `Your BMI Is ${formData.bmi}`,
            highlightText: `${formData.bmi}`,
            subHeaderText: "— What That Means",
            image: "/BMI.png",
            paragraph1:
                "BMI (Body Mass Index) is a quick way to estimate how your weight might affect your health based on your height and weight.",
            paragraph2:
                "When your BMI is too high, your body may store more fat than it uses. That can slow your metabolism, drain your energy, and make fat loss harder — even if you’re putting in effort.",
            callout: getBMICallout(formData.bmi),
            alt: "Body Mass Index",
        },
        {
            id: 3,
            title: "Calorie Intake",
            headerEmoji: "🔥",
            headerText: `You Should Be Eating Around ${formData.calorie_target} Calories — But Not All Calories Are Equal`,
            highlightText: `${formData.calorie_target}`,
            subHeaderText: "",
            image: "/calorieTarget.png",
            paragraph1:
                "Your body burns calories just to stay alive — that’s your BMR. Add in movement, and you burn even more. Eat less than you burn? You lose weight. Eat more? You store it. Simple math, but the type of calories still makes or breaks your results.",
            paragraph2:
                "Most people eat low-quality calories that spike cravings, crash energy, and cause fat to stick — even if they’re technically under their daily limit.",
            callout: getCaloriesCallout(formData.calorie_target),
            alt: "Calorie Intake",
        },
        {
            id: 4,
            title: "Hydration",
            headerEmoji: "💧",
            headerText: "Your Body Needs 8-9 Cups of Water Daily",
            highlightText: "8-9",
            subHeaderText: "Here's Why That Matters",
            image: "/waterIntake.png",
            paragraph1:
                "Hydration is a fat-burning multiplier. Without enough water, your body holds onto toxins, slows digestion, and burns fat less efficiently.",
            paragraph2:
                "Even mild dehydration can feel like fatigue, hunger, or sugar cravings. You're not lazy — you're likely underhydrated.",
            callout: getWaterCallout(formData.water_intake),
            alt: "Hydration",
        },
        {
            id: 5,
            title: "Weight Rate",
            headerEmoji: "📉",
            headerText: `You Could Be Losing ${formData.weight_loss_rate} lbs / Week — With the Right Fuel Source`,
            highlightText: `${formData.weight_loss_rate} lbs / Week`,
            subHeaderText: "",
            image: "/weightLoss.png",
            paragraph1:
                "This is your potential, what your body could lose if it’s in fat-burning mode. But that depends on getting your metabolism working with you, not against you.",
            paragraph2:
                "Low energy, stubborn cravings, and slow progress usually mean your body is still burning sugar instead of fat — and that keeps weight loss stuck.",
            callout: getWeightLossCallout(),
            alt: "Weight Loss Rate",
        },
        {
            id: 6,
            title: "See Results",
            headerEmoji: "⏳",
            headerText: `You Could See Results in as Little as ${formData.see_results_days} Days`,
            highlightText: `${formData.see_results_days}`,
            subHeaderText: "",
            image: "/resultsDay.png",
            paragraph1:
                "Visible change doesn’t take forever — when your metabolism shifts, your body can start dropping bloat, water weight, and fat surprisingly fast.",
            paragraph2:
                "It’s not about how long you try — it’s about whether your body’s actually set up to change. The wrong plan wastes months.",
            callout: getResultDaysCallout(),
            alt: "See Results Days",
        },
    ];
};

export { getResult };