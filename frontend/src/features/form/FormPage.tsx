import { useState, useEffect } from "react";
import RadioGroup from "../../components/RadioGroup"
import Slider from "../../components/SliderComponent"
import { useNavigate } from "react-router-dom";
import { submitForm, getFormData } from "../../services/form"
import { defaultFormData } from "../../utils/defaultFormData"
import { toast } from "react-toastify";
import { getFormId } from "../../utils/localStorage";
import axios from "axios";
import { motion } from "framer-motion";

function FormPage() {
    const [formData, setFormData] = useState({ ...defaultFormData });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "gender"
                    ? value
                    : value === ""
                        ? null
                        : Number(value),
        }));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitForm(formData);
            navigate("/results");
        } catch (error) {
            console.error(error);

            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ??
                    "An error occurred while submitting the form."
                );
            } else {
                toast.error(
                    "An error occurred while submitting the form."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const loadFormData = async () => {
            try {
                const savedFormId = getFormId();

                if (savedFormId) {
                    const data = await getFormData();
                    setFormData(data);
                }
            } catch (error) {
                console.error("Error fetching form data:", error);

            }
        };

        loadFormData();
    }, []);

    const isFormValid =
        formData.bodyFatPercent != null &&
        formData.bodyFatPercent > 0 &&
        formData.bodyFatPercent < 101 &&
        formData.BMI != null &&
        formData.BMI > 0 &&
        formData.BMI < 41 &&
        formData.calorieTarget != null &&
        formData.calorieTarget > 0 &&
        formData.waterIntake != null &&
        formData.waterIntake > 0 &&
        formData.weightLossRate != null &&
        formData.weightLossRate > 0 &&
        formData.seeResultsDays != null &&
        formData.seeResultsDays > 0;
    return (
        <div className="py-10">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
                    Enter your <span className="highlight">Details</span>
                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-400">
                    Complete the form below to generate your personalized fitness results.
                </p>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mx-3 max-w-2xl rounded-2xl border border-gray-300 bg-white p-6 text-black shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-[#232627] dark:text-white md:mx-auto md:p-8"
            >
                {/* Form validation intentionally relies on disabled submit state and helper text
                    instead of per-field error styling. Since validation errors are not shown
                    individually, red borders/icons are intentionally omitted to keep the form
                    visually clean and reduce unnecessary visual noise. */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <RadioGroup
                        label="Gender"
                        name="gender"
                        onChange={handleChange}
                        value={formData.gender}
                        required
                        options={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                        ]}
                    />
                    <Slider
                        label="Body Fat %"
                        min={0}
                        onChange={handleChange}
                        value={formData.bodyFatPercent}
                        max={100}
                        name="bodyFatPercent"
                        required
                        helperText="Enter your estimated body fat percentage (0-100)."
                    />
                    <Slider
                        label="BMI"
                        min={0}
                        onChange={handleChange}
                        max={40}
                        value={formData.BMI}
                        required
                        name="BMI"
                        helperText="Enter your Body Mass Index (0-40)."
                    />
                    <div>
                        <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white" htmlFor="calorieTarget">Daily Calorie Target
                            <span className="highlight"> *</span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            name="calorieTarget"
                            id="calorieTarget"
                            onChange={handleChange}
                            required
                            placeholder="e.g. 2000"
                            value={formData.calorieTarget ?? ""}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg transition-all duration-200  bg-white dark:bg-[#232627] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/20 focus:border-[#1F8A70]   focus:border-[#1F8A70]"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white" htmlFor="waterIntake">Litres of Water Per Day
                            <span className="highlight"> *</span>
                        </label>

                        <select
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg transition-all duration-200  bg-white dark:bg-[#232627] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/20 focus:border-[#1F8A70]   focus:border-[#1F8A70]"
                            required
                            onChange={handleChange}
                            value={formData.waterIntake ?? ""}
                            name="waterIntake"
                            id="waterIntake"
                        >
                            <option value="">Select Litres</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white" htmlFor="weightLossRate">Weekly Weight Loss Goal (lbs)
                            <span className="highlight"> *</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.weightLossRate ?? ""}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 1.5"
                            name="weightLossRate"
                            id="weightLossRate"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg transition-all duration-200  bg-white dark:bg-[#232627] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/20 focus:border-[#1F8A70]   focus:border-[#1F8A70]"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white" htmlFor="seeResultsDays">Days to See Results
                            <span className="highlight"> *</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.seeResultsDays ?? ""}
                            required
                            onChange={handleChange}
                            name="seeResultsDays"
                            id="seeResultsDays"
                            placeholder="e.g. 30"

                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg transition-all duration-200  bg-white dark:bg-[#232627] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/20 focus:border-[#1F8A70]   focus:border-[#1F8A70]"
                        />
                    </div>

                    <motion.button type="submit"
                        disabled={!isFormValid || loading}
                        className={`relative flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold shadow-sm transition-all duration-200 hover:shadow-lg ${isFormValid && !loading
                            ? "bg-[#1F8A70] hover:bg-[#176F5B] text-white "
                            : "bg-[#2D7163] cursor-not-allowed text-gray-300"
                            }`}
                        whileHover={isFormValid && !loading ? { scale: 1.02 } : {}}
                        whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="w-5 h-5 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>

                                <span>Submitting...</span>
                            </>
                        ) : (
                            "See My Results"
                        )}
                    </motion.button>
                    {!isFormValid &&
                        <div className="mt-2 rounded-xl border border-[#1F8A70]/10 bg-[#1F8A70]/5 px-4 py-3">
                            <p className="text-center text-sm leading-6 text-[#1F8A70] dark:text-gray-300">
                                Please complete all required fields to continue.
                            </p>
                        </div>
                    }
                </form>
            </motion.div>
        </div >
    )
}

export default FormPage;