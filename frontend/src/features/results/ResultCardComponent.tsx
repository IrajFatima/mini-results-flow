import type { ResultCard } from "../../types/resultCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
    resultCard: ResultCard;
};

function ResultCardComponent({ resultCard }: Props) {
    const parts = resultCard.headerText.split(resultCard.highlightText);
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const html = document.documentElement;

        const observer = new MutationObserver(() => {
            setIsDark(html.classList.contains("dark"));
        });

        observer.observe(html, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const imageSrc = isDark
        ? resultCard.image.replace(/(\.[^.]+)$/, "Dark$1")
        : resultCard.image;


    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#232627] shadow-sm hover:shadow-md transition-shadow duration-300 p-5 md:p-6 my-3"
        >
            <div className="px-4 pt-5 md:px-12 md:pt-12 lg:px-16 lg:pt-16">
                <div className="text-center text-3xl md:text-4xl">{resultCard.headerEmoji}</div>
                <div className="text-center text-[#183B49] dark:text-white text-2xl sm:text-3xl md:text-[38px] font-bold tracking-tight px-2 sm:px-6 md:px-12">
                    {parts[0]}
                    <span className="highlight">
                        {resultCard.highlightText}
                    </span>
                    {parts[1]}
                </div>
                <div className="text-center text-[#183B49] dark:text-white text-lg md:text-xl font-semibold mt-4 mb-3">{resultCard.subHeaderText}</div>
            </div>
            <div className="flex items-center justify-center">
                <img src={imageSrc} className="w-full max-w-[300px] h-auto object-contain" loading="lazy" alt={resultCard.alt} />
            </div>
            <div className="px-2 md:px-6 py-6 text-base md:text-lg text-[#13556F] dark:text-[#A7C2C9] leading-8">
                <p>{resultCard.paragraph1}</p><br />
                <p>{resultCard.paragraph2}</p>
            </div>
            <div className="highlight px-2 md:px-6 text-base md:text-lg">{resultCard.callout}</div>
        </motion.div>
    );

}

export default ResultCardComponent;