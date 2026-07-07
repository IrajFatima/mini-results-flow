import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";
import FormSubmissionList from "../../components/FormSubmissionList";
import type { FormDataDisplay } from "../../types/formDataDisplay";
import { getAllFormData } from "../../services/form";

function DashboardPage() {
    const { user } = useAuth();

    const [forms, setForms] = useState<FormDataDisplay[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const data = await getAllFormData(user?.role || null);
                setForms(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load submissions.");
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-[#13627D] dark:text-[#9FA6A9]">
                    Loading submissions...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center px-4 py-8">
            <div className="w-full max-w-5xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#183B49] dark:text-white">
                        {user?.role === "admin"
                            ? "Admin Dashboard"
                            : "My Submissions"}
                    </h1>

                    <p className="mt-2 text-[#13627D] dark:text-[#9FA6A9]">
                        {user?.role === "admin"
                            ? "Manage and review all submitted forms."
                            : "View, manage, and access your previous submissions."}
                    </p>
                </div>

                <FormSubmissionList forms={forms} />
            </div>
        </div>
    );
}

export default DashboardPage;