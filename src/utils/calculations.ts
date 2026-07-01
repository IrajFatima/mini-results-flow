export const getBodyFatCallout = (gender: string, bodyFatPercent: number) => {
    if (gender === "male") {
        if (bodyFatPercent < 32) return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
        return "At this level, your body may be stuck in a constant state of inflammation and energy imbalance — making fat loss harder, appetite less predictable, and progress feel like a constant uphill battle.";
    }
    if (bodyFatPercent < 40) return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
    return "At this level, your body may be stuck in a constant state of inflammation and energy imbalance — making fat loss harder, appetite less predictable, and progress feel like a constant uphill battle.";

}
export const getBMICallout = (BMI: number) => {

    if (BMI <30) return "You’re right on the edge — just a few small shifts could unlock better energy and faster fat-burning.";
    if (BMI <35) return "At this level, your body may be under more strain than you realize — from hormone balance to inflammation and recovery.";
    return "This BMI range often comes with deeper challenges, like insulin resistance and chronic fatigue — but with the right plan, you can absolutely turn things around.";
}

export const getCaloriesCallout = (calories: number) => {
    if (calories <1100) return "Extreme restriction can backfire — slowing your metabolism, increasing stress, and making results harder to sustain. Keto helps you eat smarter, not just less.";
    if (calories <1300) return "At this range, your body is primed to burn fat — but only if you're eating nutrient-dense, low-carb foods that stabilize your system.";
    if (calories <1500) return "You’re already close — just upgrading your food quality could unlock smoother fat loss and better focus.";
    return "";
}
export const getWaterCallout = (water: number) => {
    if (water ===  1) return "Only Drinking Coffee or Tea? Caffeine doesn’t hydrate — in fact, it can dehydrate you. Adding just a few glasses of water each day could dramatically boost your energy and fat-burning."
    if (water ===  2) return "Drinking about 2 glasses per day is a great start, but your body is likely still running dry. Upping your intake can improve digestion, curb cravings, and help you burn fat more efficiently."
    if (water ===  4) return "Drinking 2-6 glasses means you’re getting closer! Just a few more sips each day could make a real difference in your metabolism and how you feel overall."
    return "Drinking over 6 glasses a day? Nice work — your hydration game is strong. Keep it up to support optimal fat loss, steady energy, and fewer cravings.";
}
export const getWeightLossCallout = () => {
    return "With your numbers, results could show up even faster than expected, but only if your metabolism is dialed in and you’re burning fat, not sugar.";
}
export const getResultDaysCallout = () => {
    return "You’re already aware — and that’s step one. Now imagine pairing that awareness with a plan that shows results in the mirror by day 10.";
}



