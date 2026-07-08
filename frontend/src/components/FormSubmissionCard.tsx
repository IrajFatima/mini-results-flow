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
        <motion.div
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#232627] p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm text-[#13627D] dark:text-[#9FA6A9]">
                        Submission ID
                    </p>

                    <p className="font-semibold text-black dark:text-white">
                        #{form.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="mt-2 text-sm text-[#13627D] dark:text-[#9FA6A9]">
                        Submitted on
                    </p>

                    <p className="mt-1 font-medium text-[#183B49] dark:text-white">
                        {new Date(form.createdAt).toLocaleString()}
                    </p>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2B2F31] p-4 text-center">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#13627D] dark:text-[#9FA6A9]">
                            BMI
                        </p>

                        <p className="mt-2 text-2xl font-bold tracking-tight text-[#1F8A70] dark:text-[#36BC9F]">
                            {form.bmi}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2B2F31] p-4 text-center">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#13627D] dark:text-[#9FA6A9]">
                            Body Fat
                        </p>

                        <p className="mt-2 text-2xl font-bold tracking-tight text-[#1F8A70] dark:text-[#36BC9F]">
                            {form.bodyFatPercent}%
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2B2F31] p-4 text-center">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#13627D] dark:text-[#9FA6A9]">
                            Calories
                        </p>

                        <p className="mt-2 text-2xl font-bold tracking-tight text-[#1F8A70] dark:text-[#36BC9F]">
                            {form.calorieTarget}
                        </p>
                    </div>
                </div>
            </div>

            {/* Expand Button */}
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#1F8A70] py-3 font-semibold text-[#1F8A70] transition-all duration-200 hover:bg-[#1F8A70] hover:text-white hover:shadow-sm dark:border-[#36BC9F] dark:text-[#36BC9F]"
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
            </motion.button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                        layout
                    >
                        <div className="mt-6 grid gap-4 border-t border-dashed border-gray-200 pt-6 dark:border-gray-700 md:grid-cols-2">
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
                                value={`${form.weightLossRate} lbs /week`}
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
                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => onViewResults(form.id)}
                                className="flex-1 rounded-xl bg-[#1F8A70] py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#176F5B] hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <FaEye />
                                View Results
                            </button>

                            <button
                                onClick={() => {
                                    const confirmed = window.confirm(
                                        "Are you sure you want to delete this submission? This action cannot be undone."
                                    );

                                    if (confirmed) {
                                        onDelete(form.id);
                                    }
                                }}
                                title="Delete Submission"
                                aria-label="Delete Submission"
                                className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#F75950] text-white hover:bg-[#dd4c43] transition flex-shrink-0"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface MetricProps {
    title: string;
    value: string | number;
}

function Metric({ title, value }: MetricProps) {
    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2B2F31] p-4 transition-colors">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#13627D] dark:text-[#9FA6A9]">
                {title}
            </p>

            <p className="mt-2 md:text-lg font-semibold tracking-tight text-[#183B49] dark:text-white">
                {value}
            </p>
        </div>
    );
}

export default FormSubmissionCard;