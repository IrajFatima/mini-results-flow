import { setTheme } from "../utils/theme";
import { useState } from "react";

function Header() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    setTheme(nextTheme);
    setIsDark(!isDark);
  }
  return (
    <header className="text-right px-4 pt-4 text-bold">
      <button
        onClick={toggleTheme}
        className="fixed z-50 top-5 right-10 md:top-4 md:right-4 px-4 py-2 bg-white text-lg dark:bg-[#2D3133] border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white hover:bg-[#36BC9F] transition-colors duration-200"
      >
        {(!isDark) ?
          "Dark Mode" : "Light Mode"
        }
      </button>
      <div className="flex justify-center items-center mt-[50px]">
        <img src={isDark ? "/logoDark.png" : "/logo.png"}
          alt="Logo" />
      </div>
    </header>
  )
}

export default Header;
