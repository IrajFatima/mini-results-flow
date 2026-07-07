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
            <div className="bg-white dark:bg-[#232627] rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-[#183B49] dark:text-white">
                    No submissions found
                </h3>

                <p className="mt-2 text-[#13627D] dark:text-[#9FA6A9]">
                    Your submitted forms will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
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