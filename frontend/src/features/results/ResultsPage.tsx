import { useNavigate, useParams } from "react-router-dom";
import type { ResultCard } from "../../types/resultCard";
import { useState, useEffect } from "react";
import ResultCardComponent from "./ResultCardComponent";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { getResultData } from "../../services/result";
import { toast } from "react-toastify";
import { resetSaleTimer } from "../../utils/salesTimer";

function ResultsPage() {
    const { formId } = useParams<{ formId?: string }>();
    const navigate = useNavigate();
    const [cIndex, setCIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<ResultCard[]>([]);
    const prev = () => {
        if (cIndex !== 0) setCIndex(cIndex - 1)
    }
    const next = () => {
        if (cIndex === cards.length - 1) {
            if (formId) {
                navigate(-1);
            } else {
                resetSaleTimer();
                navigate("/sales");
            }

            return;
        }

        setCIndex((prev) => prev + 1);
    };
    useEffect(() => {
        const loadResultData = async () => {
            try {
                let data;

                if (formId) {
                    data = await getResultData(formId);
                } else {
                    data = await getResultData();
                }

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
    }, [formId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [cIndex]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1F8A70] border-t-transparent rounded-full animate-spin"></div>
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
        <div className="min-h-screen flex justify-center md:mx-3 mt-3 mb-8">
            <div className="p-2 md:max-w-2xl md:p-5 max-w-lg w-full">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-[#1F8A70] md:text-lg text-md font-semibold">Your Results</h3>
                    <div>
                        {/* The progress bar is intentionally kept minimal. A textual
                        "Step X of Y" indicator is omitted to maintain a cleaner UI
                        while still providing users with progress feedback. */}
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 w-2 rounded-full ${index <= cIndex
                                        ? "bg-[#1F8A70]"
                                        : "bg-[#D8D8D8]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    {/* Slider positions always match the displayed values after reset. */}
                    {/* Illustrations are intentionally reused across the results flow to maintain
                    a consistent visual identity and reduce unnecessary asset duplication.
                    This is a deliberate design decision for the current scope rather than
                    introducing multiple stock images with the same purpose. */}
                    <AnimatePresence mode="wait">
                        <ResultCardComponent resultCard={cards[cIndex]} key={cards[cIndex].id} />
                    </AnimatePresence>
                    <div className="flex gap-3 mt-16 md:mx-3 items-stretch">
                        <div className="w-1/2 flex">
                            {cIndex !== 0 && (
                                <button
                                    className="group relative w-full h-full border-2 border-[#1F8A70] text-[#1F8A70] rounded-md py-3 px-10 text-sm md:text-xl font-semibold transition-all duration-200 whitespace-normal break-words leading-tight flex items-center justify-center"
                                    onClick={prev}
                                >
                                    <IoArrowBack className="absolute left-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl transition-transform duration-200 group-hover:-translate-x-1" />
                                    <span className="text-center">
                                        {cards[cIndex - 1].title}
                                    </span>
                                </button>
                            )}
                        </div>

                        {/* 
                            The final step intentionally uses "Continue" instead of "Next" because
                            there are no additional result cards to navigate. The label indicates
                            progression to the next stage of the user journey (Sales page) rather
                            than another results card, making the action more explicit.
                        */}
                        <div className="w-1/2 flex">
                            <button
                                className="group relative w-full h-full bg-[#1F8A70] text-white rounded-md py-3 px-10 text-sm md:text-xl font-semibold transition-all duration-200 hover:bg-[#2ca98e] flex items-center justify-center"
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