import { motion } from "framer-motion";
import {
    FaAppleAlt,
    FaTint,
    FaRunning,
    FaBed,
    FaBullseye,
    FaCheckCircle,
    FaExclamationTriangle,
    FaRobot,
} from "react-icons/fa";
import type { JSX } from "react/jsx-runtime";
import type { AIRecommendation } from "../../types/aiRecommendation";
import { useEffect, useState } from "react";
import { getAIRecommendations } from "../../services/ai";

const iconMap: Record<string, JSX.Element> = {
    Nutrition: <FaAppleAlt className="text-2xl text-green-500" />,
    Hydration: <FaTint className="text-2xl text-sky-500" />,
    Exercise: <FaRunning className="text-2xl text-orange-500" />,
    Recovery: <FaBed className="text-2xl text-purple-500" />,
    Consistency: <FaBullseye className="text-2xl text-red-500" />,
};

export default function AIRecommendationsPage() {
    const [report, setReport] = useState<AIRecommendation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                const response = await getAIRecommendations();
                console.log("response: ", response)
                // If backend returns a JSON string
                setReport(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, []);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="w-14 h-14 border-4 border-[#1F8A70] border-t-transparent rounded-full animate-spin" />

                    <h2 className="text-2xl font-semibold">
                        Preparing your AI report...
                    </h2>

                    <p className="text-gray-500">
                        This may take a few seconds.
                    </p>
                </div>
            </div>
        );
    }
    if (!report) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <FaRobot className="mx-auto text-6xl text-[#1F8A70]" />
                    <h2 className="mt-5 text-3xl font-bold">
                        AI Report Unavailable
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Please try again later or Submit form to get Report
                    </p>
                </div>
            </div>
        );
    }
    const assessment = {
        Excellent: {
            color: "bg-green-100 text-green-700",
            emoji: "🟢",
        },
        Good: {
            color: "bg-green-100 text-green-700",
            emoji: "✅",
        },
        Fair: {
            color: "bg-yellow-100 text-yellow-700",
            emoji: "🟡",
        },
        "Needs Improvement": {
            color: "bg-red-100 text-red-700",
            emoji: "🔴",
        },
    }[report.overallAssessment] ?? {
        color: "bg-gray-100",
        emoji: "ℹ️",
    };
    return (
        <div className="min-h-screen bg-[#F8F4F4] dark:bg-[#181A1B] py-8 md:py-10">
            <div className="max-w-6xl mx-auto md:px-4 px-2">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-3xl bg-[#1F8A70] p-6 md:p-10 text-white shadow-lg"
                >
                    <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-5">
                        <div className="flex h-16 w-16 md:h-18 md:w-18 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                            <FaRobot className="text-3xl md:text-4xl" />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {report.title}
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm md:text-base leading-7 text-white/90">
                                AI-generated personalized recommendations based on your assessment.
                            </p>

                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2 text-xs md:text-sm text-white/80">
                                <span className="rounded-full bg-white/10 px-3 py-1">
                                    AI Generated
                                </span>

                                <span className="rounded-full bg-white/10 px-3 py-1">
                                    {new Date().toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Summary */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .15 }}
                    className="
                        mt-8
                        rounded-2xl
                        border
                        border-gray-300
                        dark:border-gray-700
                        bg-white
                        dark:bg-[#232627]
                        p-6
                        md:p-8
                        shadow-sm
                        transition-shadow
                        duration-300
                        hover:shadow-md
                        "
                >
                    <div className="flex justify-between items-center gap-3">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#183B49] dark:text-white">
                            Summary
                        </h2>
                        <span className={`md:px-4 md:py-2 px-2 py-1 text-xs text-center md:text-md shadow-sm rounded-xl font-semibold ${assessment.color}`}>
                            {assessment.emoji} {report.overallAssessment}
                        </span>
                    </div>
                    <p className="
                        mt-5
                        text-[15px]
                        md:text-base
                        leading-7
                        text-gray-600
                        dark:text-gray-300
                        "
                    >
                        {report.summary}
                    </p>
                </motion.div>

                {/* Strengths */}

                <div className="grid lg:grid-cols-2 gap-6 mt-8">
                    <motion.div
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#232627] p-6 md:p-7 shadow-sm transition-shadow duration-300 hover:shadow-md"
                    >
                        <h3 className="text-lg md:text-xl font-bold flex items-center gap-3 mb-5  text-green-600">
                            <FaCheckCircle />
                            Strengths
                        </h3>
                        <ul className="space-y-4">
                            {report.strengths.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                    <FaCheckCircle className="mt-1.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span className="leading-7 text-gray-700 dark:text-gray-300">
                                        {item}
                                    </span>
                                </li>

                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#232627] p-6 md:p-7 shadow-sm transition-shadow duration-300 hover:shadow-md"
                    >
                        <h3 className="text-lg md:text-xl font-bold flex items-center gap-3 mb-5  text-red-600">
                            <FaExclamationTriangle />
                            Areas To Improve
                        </h3>
                        <ul className="space-y-4">
                            {report.areasToImprove.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                    <FaExclamationTriangle className="mt-1.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                    <span className="leading-7 text-gray-700 dark:text-gray-300">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Sections */}

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {report.sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-[#232627] rounded-2xl p-7 shadow"
                        >
                            <div className="flex items-center gap-4">
                                {iconMap[section.title]}
                                <h3 className="text-lg md:text-xl font-bold">
                                    {section.title}
                                </h3>
                            </div>
                            <p className="mt-5 leading-8 text-gray-600 dark:text-gray-300">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Weekly Goals */}

                <div className="bg-white dark:bg-[#232627] rounded-2xl p-8 shadow mt-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-6">
                        Weekly Goals
                    </h2>
                    <div className="space-y-5">
                        {report.weeklyGoals.map((goal, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-2"
                            >
                                <div className="mt-2 h-3 w-3 flex-shrink-0 rounded-full bg-[#1F8A70]" />
                                <p>{goal}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Motivation */}

                <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#1F8A70] to-[#2ca98e] p-6 md:p-10 text-white shadow-xl">
                    <h2 className="text-xl md:text-2xl font-bold mb-6">
                        Keep Going
                    </h2>
                    <p className="text-base text-md leading-7 md:leading-9">
                        {report.motivation}
                    </p>
                </div>
            </div>
        </div>
    );
}