import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaArrowRight,
    FaEnvelope,
    FaLock,
    FaUserShield,
} from "react-icons/fa";
import { login as loginUser } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
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
            email: "",
            password: "",
        };

        let isValid = true;

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
        }

        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            login(response.token, response.user);

            navigate("/dashboard");
        } catch (error) {
            console.error(error);

            if (error instanceof AxiosError) {
                const data = error.response?.data;

                if (Array.isArray(data?.errors)) {
                    data.errors.forEach((err: { msg: string }) => {
                        toast.error(err.msg);
                    });
                } else {
                    toast.error(data?.message || "Login failed.");
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
                            <FaUserShield
                                size={30}
                                color="white"
                            />
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-[#183B49] dark:text-white">
                            Welcome Back
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#13627D] dark:text-[#bdbdbd] max-w-xs mx-auto">
                            Sign in to access your previous assessments
                        </p>
                    </div>

                    {/* Form */}
                    {/* disabled the autofilling of credentials */}
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        autoComplete="off"
                        className="space-y-6"
                    >

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
                                    className="h-12 w-full rounded-r-xl bg-transparent px-4 text-gray-900 dark:text-white outline-none"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="off"
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
                                    className="h-12 w-full rounded-r-xl bg-transparent px-4 text-gray-900 dark:text-white outline-none"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>

                            {errors.password && (
                                <small className="text-red-500 text-sm mt-1 block">
                                    {errors.password}
                                </small>
                            )}
                        </div>

                        {/* Login Button */}
                        <motion.button
                            whileHover={{ scale: 1.004 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="relative w-full rounded-xl bg-[#1F8A70] px-4 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#176F5B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Signing In..." : "Login"}

                            {!loading && (
                                <FaArrowRight
                                    className="absolute"
                                    style={{
                                        right: 20,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                    }}
                                />
                            )}
                        </motion.button>

                        {/* Divider */}
                        <div className="flex items-center my-5">
                            <hr className="flex-1 border-gray-300 dark:border-gray-600" />
                            <span className="mx-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                                OR
                            </span>
                            <hr className="flex-1 border-gray-300 dark:border-gray-600" />
                        </div>

                        {/* Guest or Ananymous users */}
                        <motion.button
                            whileHover={{ scale: 1.004 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-xl border-2 border-[#1F8A70] px-4 py-3 font-semibold text-[#1F8A70] shadow-sm transition-all duration-200 hover:bg-[#1F8A70] hover:text-white hover:shadow-md"
                            onClick={() => navigate("/")}
                        >
                            Continue as Guest
                        </motion.button>

                    </form>

                    {/* Footer */}
                    <div className="mt-8 border-t border-gray-200 pt-6 text-center dark:border-gray-700">
                        <span className="text-[#13627D] dark:text-[#bdbdbd] text-sm">
                            Don't have an account?
                        </span>

                        <Link
                            to="/signup"
                            className="ml-2 font-semibold text-[#1F8A70] hover:underline"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default LoginPage;