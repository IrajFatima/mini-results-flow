import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { setTheme } from "../utils/theme";
import { Link } from "react-router-dom";

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
      <div >
        <div className="flex items-center justify-between">
          <div className="w-10">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2D3133] transition-colors"
            >
              <HiMenu size={26} />
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="
      px-4 py-2
      bg-white dark:bg-[#2D3133]
      border border-gray-300 dark:border-gray-700
      rounded-lg
      text-black dark:text-white
      hover:bg-[#1F8A70]
      hover:text-white
      transition-all duration-200
      shadow-sm hover:shadow-md
    "
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex-1 flex justify-center pt-[76px]">
          <Link to="/" aria-label="Go to home page">
            {!isDark ?
              <img src="/logo.png" alt="" /> : <img src="/logoDark.png" alt="" />
            }
          </Link>
        </div>



      </div>
    </header>
  );
}

export default Header;