import { useNavigate } from "react-router-dom";
import type { ResultCard } from "../../types/resultCard";
import { useState, useEffect } from "react";
import ResultCardComponent from "./ResultCardComponent";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { getResultData } from "../../services/result";
import { getAIRecommendations } from "../../services/ai";
import { toast } from "react-toastify";

function ResultsPage() {
    const navigate = useNavigate();
    const [cIndex, setCIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<ResultCard[]>([]);
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
    useEffect(() => {
        const loadResultData = async () => {
            try {
                const data = await getResultData();
                setCards(data);
            } catch (error) {
                console.error("Error fetching result data:", error);
                toast.error(
                    "An error occurred while fetching the result data. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        loadResultData();
    }, []);
    useEffect(() => {
        const AIRecommendations = async () => {
            try {
                const data = await getAIRecommendations();
                console.log("ai: ", data);
                // setCards(data);
            } catch (error) {
                console.error("Error fetching ai recommendations:", error);
            }
        };

        AIRecommendations();
    }, []);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#36BC9F] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                        Loading your results...
                    </p>
                </div>
            </div>
        );
    }
    if (!cards.length) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">
                    No results found.
                </p>
            </div>
        );
    }

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