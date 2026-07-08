import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormSubmissionCard from "./FormSubmissionCard";
import type { FormDataDisplay } from "../types/formDataDisplay";
import { deleteFormData } from "../services/form";

interface FormSubmissionListProps {
    forms: FormDataDisplay[];
}

function FormSubmissionList({ forms }: FormSubmissionListProps) {
    const [submissions, setSubmissions] = useState(forms);
    const navigate = useNavigate();

    const handleViewResults = (formId: string) => {
        navigate(`/results/${formId}`);
    };

    const handleDelete = async (formId: string) => {
        try {
            await deleteFormData(formId);

            setSubmissions((prev) =>
                prev.filter((submission) => submission.id !== formId)
            );

            toast.success("Submission deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete submission.");
        }
    };

    if (submissions.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#232627] p-8 md:p-10 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-2xl font-bold tracking-tight text-[#183B49] dark:text-white">
                    No submissions found
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#13627D] dark:text-[#9FA6A9] max-w-md mx-auto">
                    Your submitted assessments will appear here once you complete a form.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {submissions.map((form) => (
                <FormSubmissionCard
                    key={form.id}
                    form={form}
                    onViewResults={handleViewResults}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default FormSubmissionList;