import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaArrowRight,
    FaEnvelope,
    FaLock,
    FaUser,
} from "react-icons/fa";
import { signup } from "../../services/auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

function SignupPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };

    const validate = () => {
        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required.";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "Please enter a valid email.";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters.";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password.";
            isValid = false;
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match.";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            await signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            navigate("/login");
        } catch (error) {
            console.error(error);

            if (error instanceof AxiosError) {
                const data = error.response?.data;

                if (Array.isArray(data?.errors)) {
                    data.errors.forEach((err: { msg: string }) => {
                        toast.error(err.msg);
                    });
                } else {
                    toast.error(data?.message || "Failed to create account.");
                }
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-3 py-5">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-[500px]"
            >
                <div className="bg-white dark:bg-[#232627] rounded-2xl shadow-lg p-4 md:p-8">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div
                            className="mx-auto mb-3 flex items-center justify-center rounded-full"
                            style={{
                                width: 75,
                                height: 75,
                                background: "#1F8A70",
                            }}
                        >
                            <FaUser
                                size={30}
                                color="white"
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-[#183B49] dark:text-white">
                            Create Account
                        </h2>

                        <p className="text-[#13627D] dark:text-[#bdbdbd] mt-2 text-sm">
                            Save your assessments and
                            access them anytime from your
                            dashboard.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        {/* Name */}
                        <div className="mb-4">
                            <label className="block font-semibold text-[#183B49] dark:text-white mb-1.5">
                                Full Name
                                <span className="highlight"> *</span>
                            </label>

                            <div className="flex items-center">
                                <span className="h-12 bg-white dark:bg-[#2f3335] border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg px-3 py-2.5 flex items-center justify-center">
                                    <FaUser color="#1F8A70" />
                                </span>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    className="h-12 flex-1 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg px-3 py-2.5 bg-white dark:bg-[#2f3335] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70] focus:border-transparent"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            {errors.name && (
                                <small className="text-red-500 text-sm mt-1 block">
                                    {errors.name}
                                </small>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block font-semibold text-[#183B49] dark:text-white mb-1.5">
                                Email Address
                                <span className="highlight"> *</span>
                            </label>

                            <div className="flex items-center">
                                <span className="h-12 bg-white dark:bg-[#2f3335] border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg px-3 py-2.5 flex items-center justify-center">
                                    <FaEnvelope color="#1F8A70" />
                                </span>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="h-12 flex-1 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg px-3 py-2.5 bg-white dark:bg-[#2f3335] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70] focus:border-transparent"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {errors.email && (
                                <small className="text-red-500 text-sm mt-1 block">
                                    {errors.email}
                                </small>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block font-semibold text-[#183B49] dark:text-white mb-1.5">
                                Password
                                <span className="highlight"> *</span>
                            </label>

                            <div className="flex items-center">
                                <span className="h-12 bg-white dark:bg-[#2f3335] border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg px-3 py-2.5 flex items-center justify-center">
                                    <FaLock color="#1F8A70" />
                                </span>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Minimum 8 characters"
                                    className="h-12 flex-1 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg px-3 py-2.5 bg-white dark:bg-[#2f3335] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70] focus:border-transparent"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {errors.password && (
                                <small className="text-red-500 text-sm mt-1 block">
                                    {errors.password}
                                </small>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-5">
                            <label className="block font-semibold text-[#183B49] dark:text-white mb-1.5">
                                Confirm Password
                                <span className="highlight"> *</span>
                            </label>

                            <div className="flex items-center">
                                <span className="h-12 bg-white dark:bg-[#2f3335] border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg px-3 py-2.5 flex items-center justify-center">
                                    <FaLock color="#1F8A70" />
                                </span>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Re-enter password"
                                    className="h-12 flex-1 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg px-3 py-2.5 bg-white dark:bg-[#2f3335] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70] focus:border-transparent"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={handleChange}
                                />
                            </div>

                            {errors.confirmPassword && (
                                <small className="text-red-500 text-sm mt-1 block">
                                    {errors.confirmPassword}
                                </small>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1F8A70] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#2da088] transition-colors relative disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}

                            {!loading && (
                                <FaArrowRight
                                    className="absolute"
                                    style={{
                                        right: 20,
                                        top: "50%",
                                        transform:
                                            "translateY(-50%)",
                                    }}
                                />
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-5">
                        <span className="text-[#13627D] dark:text-[#bdbdbd] text-sm">
                            Already have an account?
                        </span>

                        <Link
                            to="/login"
                            className="ml-2 font-semibold text-[#1F8A70] hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default SignupPage;