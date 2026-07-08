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
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-[470px]"
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
                            <FaUserShield
                                size={30}
                                color="white"
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-[#183B49] dark:text-white">
                            Welcome Back
                        </h2>

                        <p className="text-[#13627D] dark:text-[#bdbdbd] mt-2 text-sm">
                            Sign in to access your previous assessments
                        </p>
                    </div>

                    {/* Form */}
                    {/* disabled the autofilling of credentials */}
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">

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
                                    className="h-12 flex-1 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg px-3 py-2.5 bg-white dark:bg-[#2f3335] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70] focus:border-transparent"
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
                        <div className="mb-2">
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
                                    className="h-12 flex-1 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg px-3 py-2.5 bg-white dark:bg-[#2f3335] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F8A70] focus:border-transparent"
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

                        <div className="text-end mb-5">
                            <button
                                type="button"
                                className="text-[#1F8A70] hover:underline bg-transparent border-0 p-0 text-sm font-medium cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1F8A70] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#2da088] transition-colors relative disabled:opacity-70 disabled:cursor-not-allowed"
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
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-5">
                            <hr className="flex-1 border-gray-300 dark:border-gray-600" />
                            <span className="mx-3 text-gray-500 text-sm">
                                OR
                            </span>
                            <hr className="flex-1 border-gray-300 dark:border-gray-600" />
                        </div>

                        {/* Guest or Ananymous users */}
                        <button
                            type="button"
                            className="w-full py-3 px-4 font-semibold rounded-xl border-2 border-[#1F8A70] text-[#1F8A70] hover:bg-[#1F8A70] hover:text-white transition-colors"
                            onClick={() => navigate("/")}
                        >
                            Continue as Guest
                        </button>

                    </form>

                    {/* Footer */}
                    <div className="text-center mt-5">
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