import { useForm } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
import type { ResultCard } from "../../types/resultCard";
import { getBMICallout, getBodyFatCallout, getCaloriesCallout, getResultDaysCallout, getWaterCallout, getWeightLossCallout } from "../../utils/calculations";
import { useState } from "react";
import ResultCardComponent from "./ResultCardComponent";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";

function ResultsPage() {
    const { formData } = useForm();
    const navigate = useNavigate();
    const [cIndex, setCIndex] = useState(0);
    const prev = () => {
        if (cIndex !== 0) setCIndex(cIndex - 1)
    }
    const next = () => {
        if (cIndex === cards.length - 1) {
            navigate("/sales");
            return;
        }

        setCIndex((prev) => prev + 1);
    };
    const cards: ResultCard[] = [
        {
            id: 1,
            title: "Body Fat %",
            headerEmoji: "⚖️",
            headerText: "Your Body Fat Percentage Is " + formData.bodyFatPercent + "%",
            highlightText: `${formData.bodyFatPercent}%`,
            subHeaderText: "Here’s Why That Matters",
            image: "/bodyFat.png",
            paragraph1: "Your body fat percentage gives a clearer picture than BMI alone. It tells us how much of your body is lean mass (muscle, organs, bone) vs stored fat.",
            paragraph2: "Too much stored fat doesn’t just affect how you look — it impacts your energy, hormone balance, and ability to burn fat efficiently.",
            callout: getBodyFatCallout(formData.gender, formData.bodyFatPercent || 0),
        },
        {
            id: 2,
            title: "BMI",
            headerEmoji: "📊",
            headerText: "Your BMI Is " + formData.BMI,
            highlightText: `${formData.BMI}`,
            subHeaderText: "— What That Means",
            image: "/BMI.png",
            paragraph1: "BMI (Body Mass Index) is a quick way to estimate how your weight might affect your health based on your height and weight.",
            paragraph2: "When your BMI is too high, your body may store more fat than it uses. That can slow your metabolism, drain your energy, and make fat loss harder — even if you’re putting in effort.",
            callout: getBMICallout(formData.BMI || 0),

        },
        {
            id: 3,
            title: "Calorie Intake",
            headerEmoji: "🔥",
            headerText: "You Should Be Eating Around " + formData.calorieTarget + " Calories — But Not All Calories Are Equal",
            highlightText: `${formData.calorieTarget}`,
            subHeaderText: "",
            image: "/calorieTarget.png",
            paragraph1: "Your body burns calories just to stay alive — that’s your BMR. Add in movement, and you burn even more. Eat less than you burn? You lose weight. Eat more? You store it. Simple math, but the type of calories still makes or breaks your results.",
            paragraph2: "Most people eat low-quality calories that spike cravings, crash energy, and cause fat to stick — even if they’re technically under their daily limit.",
            callout: getCaloriesCallout(formData.calorieTarget || 0)
        },
        {
            id: 4,
            title: "Hydration",
            headerEmoji: "💧",
            headerText: "Your Body Needs 8-9 Cups of Water Daily",
            highlightText: "8-9",
            subHeaderText: "Here's Why That Matters",
            image: "/waterIntake.png",
            paragraph1: "Hydration is a fat-burning multiplier. Without enough water, your body holds onto toxins, slows digestion, and burns fat less efficiently.",
            paragraph2: "Even mild dehydration can feel like fatigue, hunger, or sugar cravings. You're not lazy — you're likely underhydrated.",
            callout: getWaterCallout(formData.waterIntake || 0)
        },
        {
            id: 5,
            title: "Weight Rate",
            headerEmoji: "📉",
            headerText: "You Could Be Losing " + formData.weightLossRate + " lbs / Week — With the Right Fuel Source",
            highlightText: formData.weightLossRate + " lbs / Week",
            subHeaderText: "",
            image: "/weightLoss.png",
            paragraph1: "This is your potential, what your body could lose if it’s in fat-burning mode. But that depends on getting your metabolism working with you, not against you.",
            paragraph2: "Low energy, stubborn cravings, and slow progress usually mean your body is still burning sugar instead of fat — and that keeps weight loss stuck.",
            callout: getWeightLossCallout(),
        },
        {
            id: 6,
            title: "See Results",
            headerEmoji: "⏳",
            headerText: "You Could See Results in as Little as " + formData.seeResultsDays + " Days",
            highlightText: `${formData.seeResultsDays}`,
            subHeaderText: "",
            image: "/resultsDay.png",
            paragraph1: "Visible change doesn’t take forever — when your metabolism shifts, your body can start dropping bloat, water weight, and fat surprisingly fast",
            paragraph2: "It’s not about how long you try — it’s about whether your body’s actually set up to change. The wrong plan wastes months.",
            callout: getResultDaysCallout(),
        },
    ]

    return (
        <div className="min-h-screen flex justify-center mx-3 mt-3 mb-8">
            <div className="p-2 md:max-w-2xl md:p-5 max-w-lg w-full">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-[#36BC9F] md:text-lg text-md font-semibold">Your Results</h3>
                    <div>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 w-2 rounded-full ${index <= cIndex
                                        ? "bg-[#36BC9F]"
                                        : "bg-[#D8D8D8]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <AnimatePresence mode="wait">
                        <ResultCardComponent resultCard={cards[cIndex]} key={cards[cIndex].id} />
                    </AnimatePresence>
                    <div className="flex gap-3 mt-16 mx-3 items-stretch">
                        <div className="w-1/2 flex">
                            {cIndex !== 0 && (
                                <button
                                    className="group relative w-full h-full border-2 border-[#36BC9F] text-[#36BC9F] rounded-md py-3 px-10 text-sm md:text-xl font-semibold transition-all duration-200 whitespace-normal break-words leading-tight flex items-center justify-center"
                                    onClick={prev}
                                >
                                    <IoArrowBack className="absolute left-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl transition-transform duration-200 group-hover:-translate-x-1" />
                                    <span className="text-center">
                                        {cards[cIndex - 1].title}
                                    </span>
                                </button>
                            )}
                        </div>

                        <div className="w-1/2 flex">
                            <button
                                className="group relative w-full h-full bg-[#36BC9F] text-white rounded-md py-3 px-10 text-sm md:text-xl font-semibold transition-all duration-200 hover:bg-[#2ca98e] flex items-center justify-center"
                                onClick={next}
                            >
                                <span className="text-center">
                                    {cIndex === cards.length - 1 ? "Continue" : "Next"}
                                </span>
                                <IoArrowForward className="absolute right-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ResultsPage;