import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { setTheme } from "../utils/theme";

type HeaderProps = {
  onMenuClick: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    setIsDark(!isDark);
  };

  return (
    <header className="px-4 pt-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2D3133]"
        >
          <HiMenu size={26} />
        </button>

        <div className="flex-1 flex justify-center pt-[76px]">
          <img
            src={isDark ? "/logoDark.png" : "/logo.png"}
            alt="Logo"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="
            fixed
            top-6
            right-8
            z-50
            px-4 py-2
            bg-white dark:bg-[#2D3133]
            border border-gray-300 dark:border-gray-700
            rounded-lg
            text-black dark:text-white
            hover:bg-[#36BC9F]
            transition
          "
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;