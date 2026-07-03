type Section = {
    title: string;
    icon: string;
    content: string;
};
export interface AIRecommendation {
    title: string;
    summary: string;
    overallAssessment: string;
    strengths: string[];
    areasToImprove: string[];
    sections: Section[];
    weeklyGoals: string[];
    motivation: string;
}