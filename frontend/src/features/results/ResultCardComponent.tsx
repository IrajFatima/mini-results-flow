import type { ResultCard } from "../../types/resultCard";
import { useEffect, useState } from "react";
import {motion} from "framer-motion";

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
            initial={{ x:200, opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{x: -200,opacity:0}}
            transition={{ duration: 0.5,ease: "easeInOut" }}
            className="rounded-xl shadow-lg bg-white dark:bg-[#232627] p-6 my-3"
        >
            <div className="md:px-[64px] md:pt-[64px] px-[16px] pt-[16px]">
                <div className="text-center text-[36px]">{resultCard.headerEmoji}</div>
                <div className="text-center text-[#183B49] dark:text-white md:text-[38px] text-[34px] font-semibold md:px-12">
                    {parts[0]}
                    <span className="highlight">
                        {resultCard.highlightText}
                    </span>
                    {parts[1]}
                </div>
                <div className="text-center text-[#183B49] dark:text-white text-[20px] font-semibold my-3">{resultCard.subHeaderText}</div>
            </div>
            <div className="flex items-center justify-center">
                <img src={imageSrc} className="w-full max-w-[300px] h-auto object-contain" loading="lazy" alt={resultCard.alt}/>
            </div>
            <div className="text-[#13556F] md:p-6 p-1 py-6 text-[22px] dark:text-[#A7C2C9] leading-[1.4em]">
                <p>{resultCard.paragraph1}</p><br />
                <p>{resultCard.paragraph2}</p>
            </div>
            <div className="highlight md:px-6 p-1 md:text-[18px] text-[16px]">{resultCard.callout}</div>
        </motion.div>
    );

}

export default ResultCardComponent;