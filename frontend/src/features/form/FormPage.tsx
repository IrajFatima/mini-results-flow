import { useState, useEffect } from "react";
import RadioGroup from "../../components/RadioGroup"
import Slider from "../../components/SliderComponent"
import { useNavigate } from "react-router-dom";
import { submitForm, getFormData } from "../../services/form"
import { defaultFormData } from "../../utils/defaultFormData"
import { toast } from "react-toastify";
import { getFormId } from "../../utils/localStorage";


function FormPage() {
    const [formData, setFormData] = useState({ ...defaultFormData });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: name === "gender" ? value : Number(value) });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const savedFormId = getFormId();

            if (!savedFormId) {
                await submitForm(formData);
            }
            navigate("/results");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form. Please try again.");
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
                toast.error(
                    "An error occurred while fetching the form data. Please try again."
                );
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
        <div>
            <h1 className="m-6 text-black dark:text-white text-4xl text-center font-semibold">Enter your <span className="highlight">Details</span></h1>
            <div className="m-3 md:p-[30px] p-[24px] max-w-2xl md:mx-auto bg-white dark:bg-[#232627] border border-gray-300  dark:border-gray-700 rounded-xl text-black dark:text-white mx-2">
                <form onSubmit={handleSubmit}>
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
                    <div className="mb-6">
                        <label className="block mb-3" htmlFor="calorieTarget">Daily Calorie Target
                            <span className="highlight"> *</span>
                        </label>
                        <input
                            type="number"
                            // min={1}
                            name="calorieTarget"
                            id="calorieTarget"
                            onChange={handleChange}
                            required
                            placeholder="e.g. 2000"
                            value={formData.calorieTarget ?? ""}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-sm bg-white dark:bg-[#232627] text-black dark:text-white focus:outline-none focus:ring-1  focus:border-[#36BC9F]"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-3" htmlFor="waterIntake">Cups of Water Per Day
                            <span className="highlight"> *</span>
                        </label>

                        <select
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-sm bg-white dark:bg-[#232627] text-black dark:text-white focus:outline-none focus:ring-1  focus:border-[#36BC9F]"
                            required
                            onChange={handleChange}
                            value={formData.waterIntake ?? ""}
                            name="waterIntake"
                            id="waterIntake"
                        >
                            <option value="">Select Cups</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-3" htmlFor="weightLossRate">Weekly Weight Loss Goal (lbs)
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
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-sm bg-white dark:bg-[#232627] text-black dark:text-white focus:outline-none focus:ring-1  focus:border-[#36BC9F]"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-3" htmlFor="seeResultsDays">Days to See Results
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

                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-sm bg-white dark:bg-[#232627] text-black dark:text-white focus:outline-none focus:ring-1  focus:border-[#36BC9F]"
                        />
                    </div>

                    <button type="submit"
                        disabled={!isFormValid || loading}
                        className={`w-full rounded-xl p-4 text-xl font-semibold transition-colors flex items-center justify-center gap-2 ${isFormValid && !loading
                            ? "bg-[#36BC9F] hover:bg-[#2ea68d] text-white "
                            : "bg-[#2D7163] cursor-not-allowed text-[#919393]"
                            }`}
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
                    </button>
                    {!isFormValid && <p className="text-[#1e7563] m-6 text-xs text-center dark:text-[#adaaaa]">Please fill out all required fields to enable the button.</p>}
                </form>
            </div>
        </div>
    )
}

export default FormPage;