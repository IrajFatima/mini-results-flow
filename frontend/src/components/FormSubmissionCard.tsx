import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaEye, FaTrash } from "react-icons/fa";
import type { FormDataDisplay } from "../types/formDataDisplay";

interface FormSubmissionCardProps {
    form: FormDataDisplay;
    onDelete: (id: string) => void;
    onViewResults: (id: string) => void;
}

function FormSubmissionCard({
    form,
    onDelete,
    onViewResults,
}: FormSubmissionCardProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-[#232627] rounded-xl shadow-lg p-5 mb-5 border border-gray-100 dark:border-[#34393b]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <p className="text-sm text-[#13627D] dark:text-[#9FA6A9]">
                        Submission ID
                    </p>

                    <p className="font-semibold text-black dark:text-white break-all">
                        {form.id}
                    </p>

                    <p className="mt-2 text-sm text-[#13627D] dark:text-[#9FA6A9]">
                        Submitted on
                    </p>

                    <p className="font-medium text-black dark:text-white">
                        {new Date(form.createdAt).toLocaleString()}
                    </p>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <div>
                        <p className="text-sm text-[#13627D] dark:text-[#9FA6A9]">
                            BMI
                        </p>

                        <p className="text-xl font-semibold text-[#36BC9F]">
                            {form.bmi}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-[#13627D] dark:text-[#9FA6A9]">
                            Body Fat
                        </p>

                        <p className="text-xl font-semibold text-[#36BC9F]">
                            {form.bodyFatPercent}%
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-[#13627D] dark:text-[#9FA6A9]">
                            Calories
                        </p>

                        <p className="text-xl font-semibold text-[#36BC9F]">
                            {form.calorieTarget}
                        </p>
                    </div>
                </div>
            </div>

            {/* Expand Button */}
            <button
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-5 w-full flex justify-center items-center gap-2 rounded-lg border border-[#36BC9F] py-2 font-medium text-[#36BC9F] hover:bg-[#36BC9F] hover:text-white transition"
            >
                {expanded ? (
                    <>
                        <FaChevronUp />
                        Collapse
                    </>
                ) : (
                    <>
                        <FaChevronDown />
                        Expand
                    </>
                )}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="grid md:grid-cols-2 gap-5 mt-6 border-t pt-6 border-gray-200 dark:border-[#34393b]">
                            <Metric
                                title="Gender"
                                value={form.gender}
                            />

                            <Metric
                                title="BMI"
                                value={form.bmi}
                            />

                            <Metric
                                title="Body Fat %"
                                value={`${form.bodyFatPercent}%`}
                            />

                            <Metric
                                title="Daily Calories"
                                value={form.calorieTarget}
                            />

                            <Metric
                                title="Water Intake"
                                value={`${form.waterIntake} L`}
                            />

                            <Metric
                                title="Weight Loss Rate"
                                value={`${form.weightLossRate} kg/week`}
                            />

                            <Metric
                                title="See Results In"
                                value={`${form.seeResultsDays} days`}
                            />

                            <Metric
                                title="Anonymous"
                                value={form.isAnonymous ? "Yes" : "No"}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row gap-3 mt-8">
                            <button
                                onClick={() => onViewResults(form.id)}
                                className="flex-1 flex justify-center items-center gap-2 rounded-lg bg-[#36BC9F] text-white py-3 font-semibold hover:bg-[#2ca98e] transition"
                            >
                                <FaEye />
                                View Results
                            </button>

                            <button
                                onClick={() => onDelete(form.id)}
                                className="flex-1 flex justify-center items-center gap-2 rounded-lg bg-[#F75950] text-white py-3 font-semibold hover:bg-[#dd4c43] transition"
                            >
                                <FaTrash />
                                Delete
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface MetricProps {
    title: string;
    value: string | number;
}

function Metric({ title, value }: MetricProps) {
    return (
        <div className="rounded-lg bg-[#F8F8F8] dark:bg-[#2B2F31] p-4">
            <p className="text-sm text-[#13627D] dark:text-[#9FA6A9]">
                {title}
            </p>

            <p className="mt-1 text-lg font-semibold text-black dark:text-white">
                {value}
            </p>
        </div>
    );
}

export default FormSubmissionCard;