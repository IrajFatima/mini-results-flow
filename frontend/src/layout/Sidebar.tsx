import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
    FaClipboardList,
    FaRobot,
    FaSignInAlt,
    FaUserPlus,
    FaTachometerAlt,
    FaSignOutAlt,
} from "react-icons/fa";

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};

export default function Sidebar({
    open,
    onClose,
}: SidebarProps) {
    const navigate = useNavigate();

    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
        onClose();
    };
    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* successfully switches to dark theme and light theme */}
            <aside
                className={`
fixed top-0 left-0 z-50
h-screen w-72
border-r border-gray-300 dark:border-gray-700
bg-white dark:bg-[#232627]
px-5 py-8
shadow-lg
transform transition-transform duration-300

${open ? "translate-x-0" : "-translate-x-full"}

md:translate-x-0
`}
            >
                <div className="mb-10 border-b border-gray-200 pb-6 dark:border-gray-700">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1F8A70] shadow-lg shadow-[#1F8A70]/20">

                        <FaRobot className="text-3xl text-white" />

                    </div>

                    <h2 className="text-center text-2xl font-bold tracking-tight text-[#183B49] dark:text-white">
                        Mini Results
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        Personalized Fitness Assistant
                    </p>

                </div>
                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/"
                        end
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                ? "bg-[#1F8A70] text-white shadow-sm ring-1 ring-[#1F8A70]/20"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031]"
                            }`
                        }
                    >
                        <FaClipboardList />
                        <span>Form</span>
                    </NavLink>

                    <NavLink
                        to="/recommendations"
                        end
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                ? "bg-[#1F8A70] text-white shadow-sm ring-1 ring-[#1F8A70]/20"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031]"
                            }`
                        }
                    >
                        <FaRobot />
                        <span>AI Recommendations</span>
                    </NavLink>
                    {!isAuthenticated ? (
                        <>
                            <NavLink
                                to="/login"
                                end
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                        ? "bg-[#1F8A70] text-white shadow-sm ring-1 ring-[#1F8A70]/20"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031]"
                                    }`
                                }
                            >
                                <FaSignInAlt />
                                <span>Login</span>
                            </NavLink>

                            <NavLink
                                to="/signup"
                                end
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                        ? "bg-[#1F8A70] text-white shadow-sm ring-1 ring-[#1F8A70]/20"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031]"
                                    }`
                                }
                            >
                                <FaUserPlus />
                                <span>Signup</span>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {/* Dashboard is a shared, role-aware route. Admin and regular users
                                receive different content based on their authenticated role, so
                                separate admin navigation is intentionally omitted. */}
                            <NavLink
                                to="/dashboard"
                                end
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                        ? "bg-[#1F8A70] text-white shadow-sm ring-1 ring-[#1F8A70]/20"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031]"
                                    }`
                                }
                            >
                                <FaTachometerAlt />
                                <span>Dashboard</span>
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 font-medium text-left text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2f3335]"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
}