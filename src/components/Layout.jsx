import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDarkMode={setDarkMode} />
      <main className="max-w-7xl mx-auto p-4">{children}</main>

    </div>
  );
}
