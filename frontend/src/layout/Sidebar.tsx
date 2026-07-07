import { NavLink,useNavigate } from "react-router-dom";
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

            <aside
                className={`
           fixed top-0 left-0 z-50
    h-screen w-64
    bg-white dark:bg-[#232627]
    border-r border-gray-200 dark:border-gray-700
    p-6
    transform transition-transform duration-300

    ${open ? "translate-x-0" : "-translate-x-full"}

    md:translate-x-0
        `}
            >
                <h2 className="text-2xl font-bold text-[#36BC9F] mb-8 mt-4 text-center">
                    Mini Results
                </h2>


                <hr />
                <br />
                <br />
                <nav className="flex flex-col gap-3">
                    <NavLink
                        to="/"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                ? "bg-[#36BC9F] text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031]"
                            }`
                        }
                    >
                        <FaClipboardList />
                        <span>Form</span>
                    </NavLink>

                    <NavLink
                        to="/recommendations"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                ? "bg-[#36BC9F] text-white"
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
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                        ? "bg-[#36BC9F] text-white"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031]"
                                    }`
                                }
                            >
                                <FaSignInAlt />
                                <span>Login</span>
                            </NavLink>

                            <NavLink
                                to="/signup"
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                        ? "bg-[#36BC9F] text-white"
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
                            <NavLink
                                to="/dashboard"
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                        ? "bg-[#36BC9F] text-white"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031]"
                                    }`
                                }
                            >
                                <FaTachometerAlt />
                                <span>Dashboard</span>
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d3031] transition w-full text-left"
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