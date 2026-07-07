import { BsClock } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import { deleteFormData } from "../../services/form";
import { removeFormId } from "../../utils/localStorage";

function SalesPage() {
    const [selectedPlan, setSelectedPlan] = useState<"installments" | "discount">("discount");
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const navigate = useNavigate();
    const planRef = useRef<HTMLDivElement>(null);
    const [showCTA, setShowCTA] = useState(true);
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);
    useEffect(() => {
        const handleScroll = () => {
            if (!planRef.current) return;

            const top = planRef.current.getBoundingClientRect().top;

            setShowCTA(top > 0);
        };

        handleScroll();

        document.addEventListener("scroll", handleScroll, { capture: true, passive: true });

        return () => document.removeEventListener("scroll", handleScroll, { capture: true });
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return (
        <>
            <div className="min-h-screen flex justify-center mx-3 mt-3 mb-8">
                <div className="p-2 md:max-w-2xl md:p-5 max-w-lg w-full">
                    <AnimatePresence>
                        {showCTA && (
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 100, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="
                                    fixed
                                    bottom-4
                                    left-1/2
                                    md:left-[calc(50%+8rem)]
                                    -translate-x-1/2
                                    z-50
                                    w-full
                                    max-w-xl
                                    px-4
                                    pointer-events-none
                                    "
                            >
                                <button
                                    onClick={() =>
                                        planRef.current?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        })
                                    }
                                    aria-label="Scroll to plan section"
                                    className="relative flex w-full items-center justify-center rounded-lg py-3 px-8 font-bold text-white shadow-lg transition cursor-pointer pointer-events-auto"
                                    style={{
                                        backgroundColor: "rgb(54,188,159)",
                                        color: "#fff",
                                        boxShadow: "rgba(54,188,159,0.15) 0px 2px 8px 0px",
                                    }}
                                >
                                    <span className="mx-auto">Claim My Plan</span>

                                    <FaArrowRight className="absolute right-6 text-lg" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="rounded-xl shadow-xl bg-white dark:bg-[#232627] p-6 my-3 rounded-lg">
                        <div className="md:px-[48px] md:pt-[20px] px-[8px] pt-[16px]">
                            <div className="text-center text-[28px]">🎯</div>
                            <div className="text-center text-[#183B49] dark:text-white md:text-[34px] text-[24px] font-semibold md:px-12 leading-[1.2]">
                                Your Personalized KetoSlim Plan Is Ready
                            </div>
                        </div>

                        <div className=" relative flex relative flex flex-row justify-center items-end gap-18 mb-2 mt-4 w-full" style={{ minHeight: "180px" }}>
                            <img
                                aria-hidden="true"
                                src="/transformation-arrow-f.svg"
                                alt="Arrow"
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
                                style={{
                                    zIndex: 0,
                                    width: "200px",
                                    height: "200px",
                                    objectFit: "contain",
                                    filter:
                                        "blur(4px) brightness(0) saturate(100%) invert(23%) sepia(99%) saturate(7497%) hue-rotate(353deg) brightness(101%) contrast(101%)",
                                    opacity: 0.7,
                                }}
                            />

                            <img
                                src="/obese-middle-aged-woman Medium Background Removed.webp"

                                alt="Before"
                                width={170}
                                height={180}
                                loading="lazy"
                                className="rounded-lg relative z-10"

                            />
                            <img
                                src="/slim-middle-aged-woman Medium Background Removed.webp"
                                alt="After"
                                className="rounded-lg relative z-10"
                                width={170}
                                height={180}
                            />
                        </div>
                        <div className="flex w-full px-8 justify-between items-center mt-2 mb-4 bg-white dark:bg-[#232627] shadow-md rounded-lg py-4">
                            <div className="w-1/2 text-center font-bold text-[#12241F] dark:text-[#E0E6E9]">
                                Now
                            </div>

                            <div className="w-1/2 text-center font-bold text-[#12241F] dark:text-[#E0E6E9]">
                                6 Months
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 ">
                            <div className="md:p-7 p-1">
                                <p className="text-[#13627D] dark:text-[#adaaaa] text-sm">Body Fat</p>
                                <span className="highlight font-semibold text-lg mb-3">20-25%</span>
                                <div className="mt-5">
                                    <p className="text-[#13627D] dark:text-[#adaaaa] text-sm">Energy Levels</p>
                                    <div className="h-2.5 dark:bg-[#303436] bg-[#E5E7EB] rounded-full overflow-hidden mt-1">
                                        <div
                                            className="h-full bg-[#F75950] rounded-full"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <p className="text-[#13627D] dark:text-[#adaaaa] text-sm">Physical Health</p>
                                    <div className="h-2.5 dark:bg-[#303436] bg-[#E5E7EB] rounded-full overflow-hidden mt-1">
                                        <div
                                            className="h-full bg-[#F75950] rounded-full"
                                            style={{ width: "40%" }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <p className="text-[#13627D] dark:text-[#adaaaa] text-sm">Metabolism Speed</p>
                                    <div className="h-2.5 dark:bg-[#303436] bg-[#E5E7EB] rounded-full overflow-hidden mt-1">
                                        <div
                                            className="h-full bg-[#F75950] rounded-full"
                                            style={{ width: "30%" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="md:p-7 p-1">
                                <p className="text-[#13627D] dark:text-[#adaaaa] text-sm">Body Fat</p>
                                <span className="label font-semibold text-lg">10-12%</span>
                                <div className="mt-5">
                                    <p className="text-[#13627D] dark:text-[#adaaaa] text-sm">Energy Levels</p>
                                    <div className="h-2.5 dark:bg-[#303436] bg-[#E5E7EB] rounded-full overflow-hidden mt-1">
                                        <div
                                            className="h-full bg-[#36BC9F] rounded-full"
                                            style={{ width: "80%" }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <p className="text-[#13627D] dark:text-[#adaaaa] text-sm">Physical Health</p>
                                    <div className="h-2.5 dark:bg-[#303436] bg-[#E5E7EB] rounded-full overflow-hidden mt-1">
                                        <div
                                            className="h-full bg-[#36BC9F] rounded-full"
                                            style={{ width: "90%" }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <p className="text-[#13627D] dark:text-[#adaaaa] text-sm">Metabolism Speed</p>
                                    <div className="h-2.5 dark:bg-[#303436] bg-[#E5E7EB] rounded-full overflow-hidden mt-1">
                                        <div
                                            className="h-full bg-[#36BC9F] rounded-full"
                                            style={{ width: "75%" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <h3 className="font-semibold md:text-lg dark:text-[#E0E6E9] text-black">
                                Your program will also work on:
                            </h3>

                            <div className="my-2 flex items-center gap-2 md:text-lg dark:text-[#d4d7d9] text-black">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#F75950] text-[#F75950] text-xl">
                                    ✔
                                </span>
                                <span>Improving Digestion</span>
                            </div>
                            <div className="my-2 flex items-center gap-2 md:text-lg dark:text-[#d4d7d9] text-black">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#F75950] text-[#F75950] text-xl">
                                    ✔
                                </span>
                                <span>Toning Muscles</span>
                            </div>
                            <div className="my-2 flex items-center gap-2 md:text-lg dark:text-[#d4d7d9] text-black">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#F75950] text-[#F75950] text-xl">
                                    ✔
                                </span>
                                <span>Mental Wellness Reset</span>
                            </div>
                            <div className="my-2 flex items-center gap-2 md:text-lg dark:text-[#d4d7d9] text-black">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#F75950] text-[#F75950] text-xl">
                                    ✔
                                </span>
                                <span>Physical Endurance Boost</span>
                            </div>
                        </div>

                        <div className="text-center font-semibold md:text-2xl text-black dark:text-[#E0E6E9] mt-5">
                            Get all the right tools & knowledge.
                        </div>

                        <div className="grid grid-cols-2 gap-1 mt-5">
                            <div className="md:p-3 py-12">
                                <div className="mt-4 flex items-center gap-1">
                                    <img src="/keto-food.webp" alt="custom meal plan" className="md:w-10 w-8" />
                                    <span className="highlight md:text-md text-sm">Daily Custom Meal Plan</span>
                                </div>

                                <div className="mt-4 flex items-center gap-1">
                                    <img src="/cart.webp" alt="custom meal plan" className="md:w-10 w-8" />
                                    <span className="highlight md:text-md text-sm">Done-For-You Grocery Lists</span>
                                </div>

                                <div className="mt-4 flex items-center gap-1">
                                    <img src="/heart-pot.webp" alt="custom meal plan" className="md:w-10 w-8" />
                                    <span className="highlight md:text-md text-sm">Overwhelm-Free Delicious Recipes</span>
                                </div>

                                <div className="mt-4 flex items-center gap-1">
                                    <img src="/education-icon.webp" alt="custom meal plan" className="md:w-10 w-8" />
                                    <span className="highlight md:text-md text-sm">Weekly Tips & Guidance</span>
                                </div>
                            </div>
                            <div className="px-1">
                                <img src="iphone-mockup-r.webp" alt="iphone" className=" mt-8 md:mt-0 w-[250px] h-[280px] md:h-auto" />
                            </div>
                        </div>

                        <div className="mt-5" ref={planRef}>
                            <h1 className="md:text-4xl text-3xl font-bold mb-8">Trusted by health & nutrition professionals</h1>
                            <div>
                                <div className=" flex justify-center items-center">
                                    <img src="/pubmed-logo-b.svg" alt="pubmed logo" width={240} />
                                </div>
                                <p className="text-[#13627D] dark:text-[#adaaaa] md:text-lg my-3">There is evidence to suggest that a Ketogenic Diet can help with weight loss, visceral adiposity, and appetite control.</p>
                                <span className="highlight text-sm md:text-md"><u>source</u></span>
                            </div>
                            <div>
                                <div className=" flex justify-center items-center">
                                    <img src="/mayo-clinic-b.webp" alt="pubmed logo" width={55} />
                                </div>
                                <p className="text-[#13627D] dark:text-[#adaaaa] md:text-lg my-3">Research shows that a keto diet can result in weight loss and improvements in cardiovascular risk factors.</p>
                                <span className="highlight text-sm md:text-md"><u>source</u></span>
                            </div>
                        </div>

                        <div className="mt-8 plan-picker" >
                            <p className="text-[#13627D] dark:text-[#adaaaa] md:text-[28px] text-xl my-3 text-center">3 Month Custom Keto Plan</p>
                            <div className="mt-3 md:rounded-xl rounded-md bg-[#F75950] text-white flex justify-between items-center md:p-3 p-2">
                                <p className="md:text-lg  mx-3">Discount expires in:</p>
                                <div className="flex items-center gap-2 text-xl font-semibold">
                                    <span>{formattedTime}</span>
                                    <BsClock className="text-xl font-semibold" />
                                </div>
                            </div>
                            <div
                                onClick={() => setSelectedPlan("installments")}
                                className={`mt-3 rounded-xl p-4 cursor-pointer transition-all border-2 ${selectedPlan === "installments"
                                    ? "border-[#36BC9F] bg-[#F8F4F4] dark:bg-[#181A1B]"
                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent"
                                    }`}
                            >
                                <div className="flex justify-between items-center gap-4">
                                    <div className="flex-1 text-[#13627D] dark:text-[#adaaaa]">
                                        <h2 className="md:text-lg font-semibold">3 PAYMENTS OF $29</h2>

                                        <p className="text-[#13627D] dark:text-[#adaaaa] md:text-md text-sm mt-3">
                                            Just $29 today. Split the rest <br />
                                            over 2 easy payments.
                                        </p>
                                    </div>

                                    <div
                                        className={`md:w-10 md:h-10 h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${selectedPlan === "installments"
                                            ? "bg-[#36BC9F] border-[#36BC9F]"
                                            : "border-gray-200 dark:border-gray-700"
                                            }`}
                                    >
                                        {selectedPlan === "installments" && (
                                            <FaCheck className="text-white text-lg" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => setSelectedPlan("discount")}
                                className={`mt-3 relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all border-2 ${selectedPlan === "discount"
                                    ? "border-[#36BC9F] bg-[#F8F4F4] dark:bg-[#181A1B]"
                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent"
                                    }`}
                            >
                                {/* Top Right Badge */}
                                <div
                                    className={`absolute top-0 right-0 px-5 py-2 rounded-bl-xl font-semibold md:text-lg tracking-wider transition-colors ${selectedPlan === "discount"
                                        ? "bg-[#36BC9F] text-white dark:text-black"
                                        : "bg-[#F8F4F4] dark:bg-[#181A1B] text-[#13627D]"
                                        }`}
                                >
                                    23% OFF
                                </div>

                                <div className="flex justify-between items-center gap-4  pt-3">
                                    <div className="flex-1">
                                        <span className="p-1.5 md:text-sm text-xs bg-[#F75950] text-white rounded-md font-semibold">
                                            DISCOUNT
                                        </span>

                                        <p className="text-[#13627D] dark:text-[#adaaaa] md:text-lg mt-3">
                                            1 Payment of $67. Pay in full today
                                            <br />
                                            and save $20 instantly.
                                        </p>
                                    </div>

                                    <div
                                        className={`md:w-10 md:h-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${selectedPlan === "discount"
                                            ? "bg-[#36BC9F] border-[#36BC9F] "
                                            : "border-gray-400"
                                            }`}
                                    >
                                        {selectedPlan === "discount" && (
                                            <FaCheck className="text-white text-lg" />
                                        )}
                                    </div>
                                </div>

                                {/* Bottom Ribbon */}
                                <div
                                    className={`mt-5 -mx-4 -mb-4 py-1 md:text-sm text-xs font-semibold text-center  tracking-[3px] uppercase rounded-b-xl transition-all ${selectedPlan === "discount"
                                        ? "bg-[#36BC9F] text-white dark:text-black"
                                        : "bg-transparent text-[#13627D] dark:text-[#adaaaa]"
                                        }`}
                                >
                                    Most Popular
                                </div>
                            </div>
                            <div className="mt-8 text-[#13627D] dark:text-[#adaaaa] md:text-sm text-xs text-center">
                                ✅ Risk-Free: Backed by 60-Day Money-Back Guarantee
                            </div>

                            <button className="mt-4 w-full relative md:rounded-xl rounded-lg bg-[#36BC9F] text-white py-3 md:text-lg font-semibold transition-all duration-200 hover:bg-[#2ca98e]"
                                onClick={() => alert(
                                    `Thank you for continuing with the ${selectedPlan === "discount" ? "1 Payment" : "3 Payments"
                                    } option!`
                                )}
                            >
                                <span>Continue</span>
                                <FaArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 text-lg" />
                            </button>
                            <div onClick={async () => {
                                // await deleteFormData();
                                removeFormId();
                                navigate('/');
                            }} className="text-[#0e485c] dark:text-white md:text-lg text-center mt-3 cursor-pointer"><u>No Thanks, I don’t want my plan.</u></div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flex justify-between items-center">
                            <h1 className="text-[#13556F] dark:text-[#adaaaa] md:text-5xl text-4xl font-semibold">Money Back Guarantee</h1>
                            <img src="/60-day-guarantee.webp" alt="money back guarantee" className="w-[100px] md:w-[120px]" />
                        </div>
                        <div>
                            <p className="text-[#13556F] dark:text-[#adaaaa] md:text-lg my-4">
                                We are confident with our service quality and its results. So, if you are ready to reach your goals, it’s a risk-free offer.
                            </p>

                            <p className="text-[#13556F] dark:text-[#adaaaa] md:text-lg my-4">
                                We guarantee you’ll see visible results or you’ll receive a full refund within 60 days after your purchase.
                            </p>

                            <p className="text-[#13556F] dark:text-[#adaaaa] md:text-md text-sm my-4">
                                By continuing, you represent that you are over 18 years of age and agree that if, for whatever reason, you’re unhappy with your plan, you can contact customer support for a refund.
                            </p>

                            <p className="text-[#13556F] dark:text-[#adaaaa] md:text-md text-sm my-4">
                                You will only be charged <span className="font-bold">$67</span> today for your first quarter (details above).
                            </p>

                            <p className="text-[#13556F] dark:text-[#adaaaa] md:text-md text-sm my-4">
                                Your introductory period will last until Aug 27, 2025. You may cancel at any time before Aug 27, 2025, and you will not be charged.
                            </p>

                            <p className="text-[#13556F] dark:text-[#adaaaa] md:text-md text-sm my-4">
                                If you don’t cancel, KetoSlim will automatically continue your membership at the end of your introductory period and charge the membership fee of{" "}
                                <span className="font-bold">$67 quarterly</span> until you cancel.
                            </p>

                            <p className="text-[#13556F] dark:text-[#adaaaa] md:text-md text-sm my-4">
                                Your subscription will be bound by our{" "}
                                <a
                                    href="#"
                                    className="text-[#F75950] underline cursor-pointer"
                                >
                                    Terms and Privacy Policy
                                </a>.
                            </p>

                            <p className="text-[#13556F] dark:text-[#adaaaa] text-md my-4">
                                If you would like a refund for any reason, call{" "}
                                <a
                                    href="#"
                                    className="text-[#F75950] underline cursor-pointer"
                                >
                                    1-800-695-5045
                                </a>{" "}
                                or email{" "}
                                <a
                                    href="#"
                                    className="text-[#F75950] underline cursor-pointer"
                                >
                                    support@myketoslim.com
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesPage;