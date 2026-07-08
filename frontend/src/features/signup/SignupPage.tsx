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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-white dark:bg-[#232627] border shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-300 dark:border-gray-700 rounded-2xl p-[24px] md:p-[30px]">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="mx-auto mb-5 flex items-center justify-center rounded-full shadow-lg shadow-[#1F8A70]/20 ring-4 ring-[#1F8A70]/10"
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

                        <h2 className="text-3xl font-bold tracking-tight text-[#183B49] dark:text-white">
                            Create Account
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#13627D] dark:text-[#bdbdbd] max-w-xs mx-auto">
                            Save your assessments and
                            access them anytime from your
                            dashboard.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="space-y-6"
                    >
                        {/* Name */}
                        <div>
                            <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white">
                                Full Name
                                <span className="highlight"> *</span>
                            </label>

                            <div className="group flex items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2f3335] transition-all duration-200 focus-within:border-[#1F8A70] focus-within:ring-2 focus-within:ring-[#1F8A70]/20">
                                <span className="flex h-12 items-center justify-center rounded-l-xl px-4 text-gray-500 transition-colors group-focus-within:text-[#1F8A70]">
                                    <FaUser />
                                </span>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    className="h-12 w-full rounded-r-xl bg-transparent px-4 text-gray-900 dark:text-white outline-none"
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
                        <div>
                            <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white">
                                Email Address
                                <span className="highlight"> *</span>
                            </label>

                            <div className="group flex items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2f3335] transition-all duration-200 focus-within:border-[#1F8A70] focus-within:ring-2 focus-within:ring-[#1F8A70]/20">
                                <span className="flex h-12 items-center justify-center rounded-l-xl px-4 text-gray-500 transition-colors group-focus-within:text-[#1F8A70]">
                                    <FaEnvelope />
                                </span>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="h-12 w-full rounded-r-xl bg-transparent px-4 text-gray-900 dark:text-white outline-none"
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
                        <div>
                            <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white">
                                Password
                                <span className="highlight"> *</span>
                            </label>

                            <div className="group flex items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2f3335] transition-all duration-200 focus-within:border-[#1F8A70] focus-within:ring-2 focus-within:ring-[#1F8A70]/20">
                                <span className="flex h-12 items-center justify-center rounded-l-xl px-4 text-gray-500 transition-colors group-focus-within:text-[#1F8A70]">
                                    <FaLock />
                                </span>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Minimum 8 characters"
                                    className="h-12 w-full rounded-r-xl bg-transparent px-4 text-gray-900 dark:text-white outline-none"
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
                        <div>
                            <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white">
                                Confirm Password
                                <span className="highlight"> *</span>
                            </label>

                            <div className="group flex items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2f3335] transition-all duration-200 focus-within:border-[#1F8A70] focus-within:ring-2 focus-within:ring-[#1F8A70]/20">
                                <span className="flex h-12 items-center justify-center rounded-l-xl px-4 text-gray-500 transition-colors group-focus-within:text-[#1F8A70]">
                                    <FaLock />
                                </span>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Re-enter password"
                                    className="h-12 w-full rounded-r-xl bg-transparent px-4 text-gray-900 dark:text-white outline-none"
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
                        <motion.button
                            whileHover={{ scale: 1.004 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="relative w-full rounded-xl bg-[#1F8A70] px-4 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#176F5B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
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
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 border-t border-gray-200 pt-6 text-center dark:border-gray-700">
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